import { Router, Request, Response } from "express";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { Portfolio } from "../models/Portfolio.js";
import { User } from "../models/User.js";
import { sendMilestoneEmail } from "../lib/email.js";

const router = Router();

const MILESTONES = [10, 50, 100, 500, 1000];

// POST /api/analytics/view — Increment view count (no auth required)
router.post("/view", async (req: Request, res: Response) => {
  try {
    const { portfolioId } = req.body;

    if (!portfolioId) {
      res.status(400).json({ error: "Missing portfolioId" });
      return;
    }

    const portfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { $inc: { views: 1 } },
      { new: true }
    ).select("views name deploymentUrl userId");

    if (!portfolio) {
      res.status(404).json({ error: "Portfolio not found" });
      return;
    }

    // Check for milestone
    if (MILESTONES.includes(portfolio.views)) {
      const user = await User.findById(portfolio.userId).select("email displayName");
      if (user?.email && portfolio.deploymentUrl) {
        sendMilestoneEmail(
          user.email,
          user.displayName || "there",
          portfolio.deploymentUrl,
          portfolio.views
        ).catch(console.error);
      }
    }

    res.json({ views: portfolio.views });
  } catch (error) {
    console.error("[analytics] View tracking error:", error);
    res.status(500).json({ error: "Failed to track view" });
  }
});

// GET /api/analytics/:portfolioId — Get view count (auth required)
router.get(
  "/:portfolioId",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const portfolio = await Portfolio.findOne({
        _id: req.params.portfolioId,
        userId: req.user?._id,
      }).select("views");

      if (!portfolio) {
        res.status(404).json({ error: "Portfolio not found" });
        return;
      }

      res.json({ views: portfolio.views });
    } catch (error) {
      console.error("[analytics] Get views error:", error);
      res.status(500).json({ error: "Failed to get views" });
    }
  }
);

export default router;
