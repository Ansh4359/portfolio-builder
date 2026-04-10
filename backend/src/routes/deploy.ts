import { Hono } from "hono";
import type { DeployRequest } from "../types";
import { getTemplate } from "../templates";
import { deployToVercel, sanitizeProjectName, checkProjectExists } from "../lib/vercel";

const app = new Hono();

/**
 * GET /api/deploy/check/:subdomain
 * Check if a subdomain is available.
 */
app.get("/check/:subdomain", async (c) => {
  const subdomain = c.req.param("subdomain");
  const sanitized = sanitizeProjectName(subdomain);

  if (sanitized.length < 3) {
    return c.json({ available: false, error: "Subdomain too short" }, 400);
  }

  const exists = await checkProjectExists(sanitized);
  return c.json({ available: !exists, subdomain: sanitized });
});

/**
 * POST /api/deploy/preview
 * Returns generated HTML — no deployment.
 */
app.post("/preview", async (c) => {
  try {
    const body = (await c.req.json()) as DeployRequest;
    const { data, templateId } = body;

    if (!data?.name || !templateId) {
      return c.json(
        { error: "Missing required fields: data.name, templateId" },
        400
      );
    }

    const template = getTemplate(templateId);
    if (!template) {
      return c.json({ error: `Template "${templateId}" not found` }, 400);
    }

    const html = template.generate(data);
    console.log(
      `[preview] template=${templateId}  html=${html.length} chars`
    );
    return c.json({ html });
  } catch (err: any) {
    console.error("[preview] error:", err);
    return c.json({ error: err.message || "Preview generation failed" }, 500);
  }
});

/**
 * POST /api/deploy
 * Generate HTML + deploy to Vercel + return live URL.
 */
app.post("/", async (c) => {
  try {
    // ── Token check ──
    if (!process.env.VERCEL_TOKEN) {
      return c.json(
        {
          error:
            "VERCEL_TOKEN is not set. " +
            "Create a token at https://vercel.com/account/tokens " +
            "and add it to backend/.env",
        },
        500
      );
    }

    // ── Parse body ──
    const body = (await c.req.json()) as DeployRequest;
    const { data, templateId, subdomain } = body;

    console.log(`\n${"═".repeat(50)}`);
    console.log(
      `[deploy] template=${templateId}  subdomain=${subdomain ?? "(auto)"}`
    );
    console.log(`${"═".repeat(50)}`);

    // ── Validate required fields ──
    if (!data?.name || !data?.email || !data?.title || !templateId) {
      return c.json(
        {
          error:
            "Missing required fields: data.name, data.email, data.title, templateId",
        },
        400
      );
    }

    // ── Validate template ──
    const template = getTemplate(templateId);
    if (!template) {
      return c.json({ error: `Template "${templateId}" not found` }, 400);
    }

    // ── Validate subdomain ──
    let projectName: string;

    if (subdomain) {
      const sanitized = sanitizeProjectName(subdomain);
      if (sanitized.length < 3) {
        return c.json(
          {
            error:
              "Subdomain must be at least 3 characters after sanitization",
          },
          400
        );
      }
      if (sanitized !== subdomain.toLowerCase()) {
        return c.json(
          {
            error:
              "Subdomain contains invalid characters. " +
              "Use only lowercase letters, numbers, and hyphens.",
            suggestion: sanitized,
          },
          400
        );
      }
      projectName = sanitized;
    } else {
      projectName = sanitizeProjectName(`${data.name}-portfolio`);
    }

    // ── Check if subdomain already taken ──
    const exists = await checkProjectExists(projectName);
    if (exists) {
      return c.json(
        {
          error: `Subdomain "${projectName}" is already taken. Please choose a different name.`,
          suggestion: `${projectName}-${Date.now().toString(36)}`,
        },
        409
      );
    }

    // ── Generate HTML ──
    const html = template.generate(data);
    console.log(`[deploy] HTML generated: ${html.length} chars`);

    // ── Deploy ──
    const result = await deployToVercel(
      projectName,
      { "index.html": html },
      subdomain
    );

    return c.json({
      success: true,
      url: result.url,
      deploymentId: result.deploymentId,
      projectName,
    });
  } catch (err: any) {
    console.error("[deploy] error:", err);
    return c.json(
      { error: err.message || "Deployment failed. Please try again." },
      500
    );
  }
});

export default app;
