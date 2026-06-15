import { Router, Request, Response } from "express";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { getTemplate } from "../templates/index.js";
import {
  deployToVercel,
  sanitizeProjectName,
  checkProjectExists,
} from "../lib/vercel.js";

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

      const template = getTemplate(templateId);
      if (!template) {
        res
          .status(400)
          .json({ error: `Template "${templateId}" not found` });
        return;
      }

      const html = template.generate(data);
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

      const template = getTemplate(templateId);
      if (!template) {
        res
          .status(400)
          .json({ error: `Template "${templateId}" not found` });
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

      const exists = await checkProjectExists(projectName);
      if (exists) {
        res.status(409).json({
          error: `Subdomain "${projectName}" is already taken. Please choose a different name.`,
          suggestion: `${projectName}-${Date.now().toString(36)}`,
        });
        return;
      }

      const html = template.generate(data);
      console.log(`[deploy] HTML generated: ${html.length} chars`);

      const result = await deployToVercel(
        projectName,
        { "index.html": html },
        subdomain
      );

      res.json({
        success: true,
        url: result.url,
        deploymentId: result.deploymentId,
        projectName,
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
