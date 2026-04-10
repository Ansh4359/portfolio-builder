import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import templateRoutes from "./src/routes/template.ts";
import deployRoutes from "./src/routes/deploy.ts";

const app = new Hono();

app.use("*", cors({ origin: "*" }));
app.use("*", logger());

app.get("/", (c) =>
  c.json({
    status: "ok",
    message: "Portfolio Builder API",
    endpoints: {
      "GET  /api/templates": "List available templates",
      "GET  /api/templates/:id": "Get template metadata",
      "POST /api/deploy/preview": "Generate HTML preview (no deploy)",
      "POST /api/deploy": "Generate HTML + deploy to Vercel",
    },
  })
);

app.route("/api/templates", templateRoutes);
app.route("/api/deploy", deployRoutes);

app.notFound((c) => c.json({ error: "Not found" }, 404));
app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = parseInt(process.env.PORT || "3001", 10);

console.log(`
  ┌─────────────────────────────────────────┐
  │  Portfolio Builder API                  │
  │  http://localhost:${port}                   │
  │                                         │
  │  GET  /api/templates                    │
  │  POST /api/deploy/preview               │
  │  POST /api/deploy                       │
  └─────────────────────────────────────────┘
`);

export default {
  port,
  fetch: app.fetch,
};
