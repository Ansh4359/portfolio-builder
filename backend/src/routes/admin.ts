import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";
import { User } from "../models/User.js";
import { Portfolio } from "../models/Portfolio.js";
import { Profile } from "../models/Profile.js";
import { AITemplate } from "../models/AITemplate.js";

const router = Router();

router.get("/stats", authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalPortfolios, totalProfiles, totalAITemplates, tierCounts, recentUsers] = await Promise.all([
      User.countDocuments(),
      Portfolio.countDocuments(),
      Profile.countDocuments(),
      AITemplate.countDocuments(),
      User.aggregate([{ $group: { _id: "$tier", count: { $sum: 1 } } }]),
      User.find().sort({ createdAt: -1 }).limit(5).select("email displayName tier createdAt"),
    ]);

    const deployedPortfolios = await Portfolio.countDocuments({ deploymentUrl: { $ne: null } });

    res.json({
      totalUsers,
      totalPortfolios,
      deployedPortfolios,
      totalProfiles,
      totalAITemplates,
      tierCounts: Object.fromEntries(tierCounts.map((t: any) => [t._id, t.count])),
      recentUsers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/users", authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { search, page = "1", limit = "20" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = Math.min(parseInt(limit as string, 10), 100);
    const skip = (pageNum - 1) * limitNum;

    const query: Record<string, any> = {};
    if (search) {
      const s = search as string;
      query.$or = [
        { email: { $regex: s, $options: "i" } },
        { displayName: { $regex: s, $options: "i" } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .select("firebaseUid email displayName photoURL tier createdAt updatedAt"),
      User.countDocuments(query),
    ]);

    const userIds = users.map((u) => u._id);
    const [portfolioCounts, profileCounts] = await Promise.all([
      Portfolio.aggregate([{ $match: { userId: { $in: userIds } } }, { $group: { _id: "$userId", count: { $sum: 1 } } }]),
      Profile.aggregate([{ $match: { userId: { $in: userIds } } }, { $group: { _id: "$userId", count: { $sum: 1 } } }]),
    ]);

    const pCountMap = Object.fromEntries(portfolioCounts.map((p: any) => [p._id.toString(), p.count]));
    const prCountMap = Object.fromEntries(profileCounts.map((p: any) => [p._id.toString(), p.count]));

    const usersWithCounts = users.map((u) => ({
      ...u.toObject(),
      portfolioCount: pCountMap[u._id.toString()] || 0,
      hasProfile: !!prCountMap[u._id.toString()],
    }));

    res.json({
      users: usersWithCounts,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("Admin users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/users/:id", authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const [profile, portfolios, aiTemplates] = await Promise.all([
      Profile.findOne({ userId: user._id }),
      Portfolio.find({ userId: user._id }).sort({ updatedAt: -1 }),
      AITemplate.countDocuments({ userId: user._id }),
    ]);

    res.json({
      user,
      profile: profile || null,
      portfolios,
      aiTemplateCount: aiTemplates,
    });
  } catch (error) {
    console.error("Admin user detail error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.put("/users/:id/tier", authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { tier } = req.body;
    if (!tier || !["free", "pro"].includes(tier)) {
      res.status(400).json({ error: "Valid tier (free/pro) is required" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { tier, tierUpdatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error("Admin tier update error:", error);
    res.status(500).json({ error: "Failed to update tier" });
  }
});

export default router;
