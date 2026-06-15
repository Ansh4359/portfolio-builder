import { Router, Request, Response } from "express";
import { templates } from "../templates/index.js";
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

router.get("/:id/preview", (req: Request, res: Response) => {
  const template = templates.find((t) => t.id === req.params.id);
  if (!template) {
    res.status(404).json({ error: "Template not found" });
    return;
  }
  const html = template.generate(samplePortfolio);
  res.json({ html });
});

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
