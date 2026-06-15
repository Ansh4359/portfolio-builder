import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

import { connectDatabase } from "./config/database.js";
import templateRoutes from "./routes/template.js";
import deployRoutes from "./routes/deploy.js";
import authRoutes from "./routes/auth.js";
import portfolioRoutes from "./routes/portfolio.js";
import profileRoutes from "./routes/profile.js";
import analyticsRoutes from "./routes/analytics.js";
import sitemapRoutes from "./routes/sitemap.js";

const app = express();
const port = parseInt(process.env.PORT || "3001", 10);

app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rate limiting - more permissive for development
if (process.env.NODE_ENV === "production") {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );
}

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio Builder API",
    endpoints: {
      "GET  /api/templates": "List available templates",
      "GET  /api/templates/:id": "Get template metadata",
      "POST /api/deploy/preview": "Generate HTML preview (authenticated)",
      "POST /api/deploy": "Generate HTML + deploy to Vercel (authenticated)",
      "GET  /api/auth/me": "Get current user profile",
      "PUT  /api/auth/me": "Update user profile",
      "GET  /api/portfolios": "List user portfolios",
      "POST /api/portfolios": "Create new portfolio",
      "GET  /api/portfolios/:id": "Get portfolio by ID",
      "PUT  /api/portfolios/:id": "Update portfolio",
      "DELETE /api/portfolios/:id": "Delete portfolio",
    },
  });
});

app.use("/api/templates", templateRoutes);
app.use("/api/deploy", deployRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/", sitemapRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

async function start() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`
  ┌─────────────────────────────────────────┐
  │  Portfolio Builder API                  │
  │  http://localhost:${port}                   │
  │                                         │
  │  GET  /api/templates                    │
  │  POST /api/deploy/preview               │
  │  POST /api/deploy                       │
  │  GET  /api/auth/me                      │
  │  GET  /api/portfolios                   │
  └─────────────────────────────────────────┘
      `);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start().catch((err) => {
  console.error("Unhandled start error:", err);
  process.exit(1);
});
