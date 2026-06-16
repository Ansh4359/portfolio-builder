import { Router, Request, Response } from "express";
import { templates } from "../templates/index.js";
import { AITemplate } from "../models/AITemplate.js";
import { User } from "../models/User.js";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { generateTemplateWithAI } from "../services/mimo.js";
import type { PortfolioData } from "../types/index.js";

const router = Router();

const samplePortfolio: PortfolioData = {
  name: "Alex Chen",
  title: "Full Stack Developer",
  email: "alex@example.com",
  phone: "+1 555 123 4567",
  location: "San Francisco, CA",
  about:
    "Passionate full stack developer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions.",
  skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "GraphQL"],
  experience: [
    {
      company: "TechCorp",
      role: "Senior Software Engineer",
      period: "2022 — Present",
      description:
        "Led development of a real-time collaboration platform serving 50K+ users. Architected microservices backend and React frontend.",
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      period: "2020 — 2022",
      description:
        "Built the core product from scratch using Next.js and Node.js. Implemented CI/CD pipelines and automated testing.",
    },
  ],
  education: [
    {
      school: "UC Berkeley",
      degree: "B.S. Computer Science",
      period: "2016 — 2020",
    },
  ],
  projects: [
    {
      name: "TaskFlow",
      description: "A project management app with real-time updates, Kanban boards, and team collaboration features.",
      url: "https://github.com/alexchen/taskflow",
      tech: ["React", "TypeScript", "Socket.io", "MongoDB"],
    },
    {
      name: "DevBlog",
      description: "A technical blog platform with markdown support, syntax highlighting, and SEO optimization.",
      url: "https://github.com/alexchen/devblog",
      tech: ["Next.js", "MDX", "Tailwind CSS"],
    },
  ],
  socials: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen",
    website: "https://alexchen.dev",
  },
};

// GET / — List all templates
router.get("/", (req: Request, res: Response) => {
  const templateList = templates.map(
    ({ id, name, description, thumbnail }) => ({
      id,
      name,
      description,
      thumbnail,
    })
  );
  res.json(templateList);
});

// POST /generate — Generate AI template
router.post(
  "/generate",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
        res.status(400).json({
          error: "Please provide a valid prompt (at least 3 characters)",
        });
        return;
      }

      const wordCount = prompt.trim().split(/\s+/).length;
      if (wordCount > 40) {
        res.status(400).json({
          error: "Prompt must be 40 words or less",
        });
        return;
      }

      const user = await User.findById(req.user?._id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Rate limit check for free tier
      if (user.tier === "free") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const usedToday = await AITemplate.countDocuments({
          userId: user._id,
          createdAt: { $gte: today },
        });

        if (usedToday >= 2) {
          res.status(429).json({
            error:
              "Daily AI template limit reached (2 per day). Upgrade to Pro for unlimited generations.",
            remaining: 0,
            limit: 2,
          });
          return;
        }
      }

      console.log(
        `[ai-template] Generating for user ${user._id}: "${prompt.slice(0, 50)}..."`
      );

      const result = await generateTemplateWithAI(prompt.trim());

      const aiTemplate = await AITemplate.create({
        userId: user._id,
        prompt: prompt.trim(),
        name: result.name,
        html: result.html,
      });

      // Calculate remaining
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const usedToday = await AITemplate.countDocuments({
        userId: user._id,
        createdAt: { $gte: today },
      });
      const remaining = user.tier === "free" ? 2 - usedToday : null;

      console.log(`[ai-template] Generated: "${result.name}" (${aiTemplate._id})`);

      res.json({
        id: aiTemplate._id,
        name: result.name,
        html: result.html,
        remaining,
      });
    } catch (error: any) {
      console.error("[ai-template] Generate error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate template",
      });
    }
  }
);

// GET /ai-usage — Get AI usage stats for current user
router.get(
  "/ai-usage",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const user = req.user!;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const used = await AITemplate.countDocuments({
        userId: user._id,
        createdAt: { $gte: today },
      });

      const limit = user.tier === "pro" ? null : 2;
      const remaining = limit !== null ? Math.max(0, limit - used) : null;

      res.json({ used, limit, remaining });
    } catch (error) {
      console.error("[ai-template] Usage check error:", error);
      res.status(500).json({ error: "Failed to check usage" });
    }
  }
);

// GET /ai-history — Get user's AI template history
router.get(
  "/ai-history",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const aiTemplates = await AITemplate.find({ userId: req.user?._id })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("_id name prompt createdAt");

      res.json(aiTemplates);
    } catch (error) {
      console.error("[ai-template] History error:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  }
);

// GET /ai/:id — Get specific AI template
router.get(
  "/ai/:id",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const template = await AITemplate.findOne({
        _id: req.params.id,
        userId: req.user?._id,
      });

      if (!template) {
        res.status(404).json({ error: "AI template not found" });
        return;
      }

      res.json(template);
    } catch (error) {
      console.error("[ai-template] Get template error:", error);
      res.status(500).json({ error: "Failed to fetch template" });
    }
  }
);

// GET /:id/preview — Get template preview with sample data
router.get("/:id/preview", (req: Request, res: Response) => {
  const template = templates.find((t) => t.id === req.params.id);
  if (!template) {
    res.status(404).json({ error: "Template not found" });
    return;
  }
  const html = template.generate(samplePortfolio);
  res.json({ html });
});

// GET /:id — Get template metadata (catch-all, MUST be last)
router.get("/:id", (req: Request, res: Response) => {
  const template = templates.find((t) => t.id === req.params.id);
  if (!template) {
    res.status(404).json({ error: "Template not found" });
    return;
  }
  res.json({
    id: template.id,
    name: template.name,
    description: template.description,
    thumbnail: template.thumbnail,
  });
});

export default router;
