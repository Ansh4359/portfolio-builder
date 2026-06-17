import { Router, Request, Response } from "express";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { getTemplate } from "../templates/index.js";
import { Portfolio } from "../models/Portfolio.js";
import { AITemplate } from "../models/AITemplate.js";
import { User } from "../models/User.js";
import {
  deployToVercel,
  sanitizeProjectName,
  checkProjectExists,
} from "../lib/vercel.js";
import { generateMetaTags, generateTrackingScript } from "../lib/seo.js";
import { sendDeploymentEmail } from "../lib/email.js";
import type { PortfolioData } from "../types/index.js";

const esc = (s: string) => (s ? String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;") : "");

function renderAITemplate(htmlTemplate: string, data: PortfolioData): string {
  try {
    const fn = new Function("data", "esc", "return `" + htmlTemplate + "`;");
    return fn(data, esc);
  } catch (err) {
    console.error("[renderAITemplate] Error:", err);
    return htmlTemplate;
  }
}

const API_BASE = process.env.API_URL || "http://localhost:3001";
const CUSTOM_DOMAIN = "myfolio.codes";

const router = Router();

router.get(
  "/check/:subdomain",
  async (req: Request, res: Response) => {
    try {
      const subdomain = req.params.subdomain as string;
      const sanitized = sanitizeProjectName(subdomain);

      if (sanitized.length < 3) {
        res.status(400).json({ available: false, error: "Subdomain too short" });
        return;
      }

      const existingPortfolio = await Portfolio.findOne({ subdomain: sanitized });
      if (existingPortfolio) {
        const token = req.headers.authorization?.replace("Bearer ", "");
        let currentUserId: string | undefined;
        if (token) {
          try {
            const { getAuth } = await import("firebase-admin/auth");
            const decoded = await getAuth().verifyIdToken(token);
            const { User } = await import("../models/User.js");
            const currentUser = await User.findOne({ firebaseUid: decoded.uid });
            if (currentUser && existingPortfolio.userId.equals(currentUser._id)) {
              res.json({ available: true, subdomain: sanitized, owned: true });
              return;
            }
          } catch {}
        }
        res.json({ available: false, subdomain: sanitized });
        return;
      }

      const exists = await checkProjectExists(sanitized);
      res.json({ available: !exists, subdomain: sanitized });
    } catch (error) {
      console.error("Check subdomain error:", error);
      res.status(500).json({ error: "Failed to check subdomain" });
    }
  }
);

router.post(
  "/preview",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { data, templateId } = req.body;

      if (!data?.name || !templateId) {
        res.status(400).json({
          error: "Missing required fields: data.name, templateId",
        });
        return;
      }

      let html: string;

      if (templateId.startsWith("ai-")) {
        const aiId = templateId.replace("ai-", "");
        const aiTemplate = await AITemplate.findOne({
          _id: aiId,
          userId: req.user?._id,
        });
        if (!aiTemplate) {
          res.status(404).json({ error: "AI template not found" });
          return;
        }
        html = renderAITemplate(aiTemplate.html, data);
      } else {
        const template = getTemplate(templateId);
        if (!template) {
          res
            .status(400)
            .json({ error: `Template "${templateId}" not found` });
          return;
        }
        html = template.generate(data, esc);
      }

      console.log(
        `[preview] template=${templateId}  html=${html.length} chars`
      );
      res.json({ html });
    } catch (err: any) {
      console.error("[preview] error:", err);
      res
        .status(500)
        .json({ error: err.message || "Preview generation failed" });
    }
  }
);

router.post(
  "/",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      if (!process.env.VERCEL_TOKEN) {
        res.status(500).json({
          error:
            "VERCEL_TOKEN is not set. " +
            "Create a token at https://vercel.com/account/tokens " +
            "and add it to backend/.env",
        });
        return;
      }

      const { data, templateId, subdomain } = req.body;

      console.log(`\n${"═".repeat(50)}`);
      console.log(
        `[deploy] template=${templateId}  subdomain=${subdomain ?? "(auto)"}`
      );
      console.log(`${"═".repeat(50)}`);

      if (!data?.name || !data?.email || !data?.title || !templateId) {
        res.status(400).json({
          error:
            "Missing required fields: data.name, data.email, data.title, templateId",
        });
        return;
      }

      let projectName: string;

      if (subdomain) {
        const sanitized = sanitizeProjectName(subdomain);
        if (sanitized.length < 3) {
          res.status(400).json({
            error:
              "Subdomain must be at least 3 characters after sanitization",
          });
          return;
        }
        if (sanitized !== subdomain.toLowerCase()) {
          res.status(400).json({
            error:
              "Subdomain contains invalid characters. " +
              "Use only lowercase letters, numbers, and hyphens.",
            suggestion: sanitized,
          });
          return;
        }
        projectName = sanitized;
      } else {
        projectName = sanitizeProjectName(`${data.name}-portfolio`);
      }

      const existingPortfolio = await Portfolio.findOne({ subdomain: projectName });
      const isRedeploy = existingPortfolio && existingPortfolio.userId.equals(req.user?._id);

      if (existingPortfolio && !isRedeploy) {
        res.status(409).json({
          error: `Subdomain "${projectName}" is already taken. Please choose a different name.`,
          suggestion: `${projectName}-${Date.now().toString(36)}`,
        });
        return;
      }

      if (!isRedeploy) {
        const exists = await checkProjectExists(projectName);
        if (exists) {
          res.status(409).json({
            error: `Subdomain "${projectName}" is already taken. Please choose a different name.`,
            suggestion: `${projectName}-${Date.now().toString(36)}`,
          });
          return;
        }
      }

      let html: string;

      if (templateId.startsWith("ai-")) {
        const aiId = templateId.replace("ai-", "");
        const aiTemplate = await AITemplate.findOne({
          _id: aiId,
          userId: req.user?._id,
        });
        if (!aiTemplate) {
          res.status(404).json({ error: "AI template not found" });
          return;
        }
        html = renderAITemplate(aiTemplate.html, data);
      } else {
        const template = getTemplate(templateId);
        if (!template) {
          res
            .status(400)
            .json({ error: `Template "${templateId}" not found` });
          return;
        }
        html = template.generate(data, esc);
      }

      const deployedUrl = `https://${projectName}.${CUSTOM_DOMAIN}`;
      const seoTags = generateMetaTags(data, deployedUrl);
      html = html.replace("</head>", `${seoTags}\n</head>`);

      let portfolio;
      if (isRedeploy) {
        portfolio = await Portfolio.findOneAndUpdate(
          { _id: existingPortfolio._id },
          {
            name: data.name,
            title: data.title,
            email: data.email,
            phone: data.phone,
            location: data.location,
            about: data.about,
            skills: data.skills || [],
            experience: data.experience || [],
            education: data.education || [],
            projects: data.projects || [],
            socials: data.socials || {},
            templateId,
            deploymentUrl: deployedUrl,
          },
          { new: true }
        );
        if (!portfolio) {
          res.status(404).json({ error: "Portfolio not found" });
          return;
        }
        console.log(`[deploy] Portfolio updated in DB: ${portfolio._id}`);
      } else {
        portfolio = await Portfolio.create({
          userId: req.user?._id,
          name: data.name,
          title: data.title,
          email: data.email,
          phone: data.phone,
          location: data.location,
          about: data.about,
          skills: data.skills || [],
          experience: data.experience || [],
          education: data.education || [],
          projects: data.projects || [],
          socials: data.socials || {},
          templateId,
          subdomain: projectName,
          deploymentUrl: deployedUrl,
        });
        console.log(`[deploy] Portfolio saved to DB: ${portfolio._id}`);
      }

      const trackingScript = generateTrackingScript(
        portfolio._id.toString(),
        API_BASE
      );
      html = html.replace("</body>", `${trackingScript}\n</body>`);

      console.log(`[deploy] HTML ready: ${html.length} chars`);

      const result = await deployToVercel(
        projectName,
        { "index.html": html },
        subdomain
      );

      console.log(`[deploy] Deployed to: ${result.url}`);

      const user = await User.findById(req.user?._id).select("email displayName");
      if (user?.email) {
        sendDeploymentEmail(
          user.email,
          data.name,
          result.url
        ).catch(console.error);
      }

      res.json({
        success: true,
        url: result.url,
        deploymentId: result.deploymentId,
        projectName,
        portfolioId: portfolio._id,
        redeployed: isRedeploy,
      });
    } catch (err: any) {
      console.error("[deploy] error:", err);
      res
        .status(500)
        .json({
          error: err.message || "Deployment failed. Please try again.",
        });
    }
  }
);

export default router;
