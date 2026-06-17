import { Router, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { getAuthInstance } from "../config/firebase.js";
import { User } from "../models/User.js";
import { Profile } from "../models/Profile.js";
import { Portfolio } from "../models/Portfolio.js";
import { AITemplate } from "../models/AITemplate.js";
import { sendMagicLinkEmail } from "../lib/email.js";

const router = Router();

const magicLinkLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: { error: "Too many requests. Please try again in a minute." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/check-user", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "Valid email is required" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    res.json({ exists: !!user });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ error: "Failed to check user" });
  }
});

router.post("/send-magic-link", magicLinkLimiter, async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "Valid email is required" });
      return;
    }

    const auth = getAuthInstance();
    const actionCodeSettings = {
      url: process.env.MAGIC_LINK_REDIRECT_URL || "https://myfolio.codes/finish-sign-in",
      handleCodeInApp: true,
    };

    const link = await auth.generateSignInWithEmailLink(email, actionCodeSettings);
    await sendMagicLinkEmail(email, link);

    res.json({ success: true });
  } catch (error: any) {
    console.error("Send magic link error:", error);
    res.status(500).json({ error: error.message || "Failed to send magic link" });
  }
});

router.get("/me", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user?.firebaseUid });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({
      id: user._id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      tier: user.tier,
      tierUpdatedAt: user.tierUpdatedAt,
      portfoliosLimit: user.portfoliosLimit,
      deploymentsLimit: user.deploymentsLimit,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

router.put("/me", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { displayName, photoURL } = req.body;

    const updateData: Record<string, any> = {};
    if (displayName) updateData.displayName = displayName;
    if (photoURL) updateData.photoURL = photoURL;

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user?.firebaseUid },
      updateData,
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      id: user._id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      tier: user.tier,
      tierUpdatedAt: user.tierUpdatedAt,
      portfoliosLimit: user.portfoliosLimit,
      deploymentsLimit: user.deploymentsLimit,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.get("/me/export", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user?.firebaseUid });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const [profile, portfolios, aiTemplates] = await Promise.all([
      Profile.findOne({ userId: user._id }),
      Portfolio.find({ userId: user._id }),
      AITemplate.find({ userId: user._id }).select("-html"),
    ]);

    res.json({
      exportedAt: new Date().toISOString(),
      user: {
        email: user.email,
        displayName: user.displayName,
        tier: user.tier,
        createdAt: user.createdAt,
      },
      profile: profile || null,
      portfolios: portfolios.map((p) => ({
        name: p.name,
        title: p.title,
        subdomain: p.subdomain,
        templateId: p.templateId,
        views: p.views,
        createdAt: p.createdAt,
      })),
      aiTemplates: aiTemplates.map((t) => ({
        name: t.name,
        prompt: t.prompt,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error("Data export error:", error);
    res.status(500).json({ error: "Failed to export data" });
  }
});

router.delete("/me", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user?.firebaseUid });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await Promise.all([
      Profile.deleteMany({ userId: user._id }),
      Portfolio.deleteMany({ userId: user._id }),
      AITemplate.deleteMany({ userId: user._id }),
    ]);

    await User.deleteOne({ _id: user._id });

    try {
      const auth = getAuthInstance();
      await auth.deleteUser(user.firebaseUid);
    } catch (fbErr) {
      console.error("Failed to delete Firebase user:", fbErr);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
});

router.post("/unsubscribe", authenticateToken, async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const user = await User.findOne({ firebaseUid: req.user?.firebaseUid });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (type === "all") {
      user.emailPreferences = { milestones: false, marketing: false };
    } else if (type === "milestones") {
      user.emailPreferences = { ...user.emailPreferences, milestones: false };
    } else if (type === "marketing") {
      user.emailPreferences = { ...user.emailPreferences, marketing: false };
    }

    await user.save();
    res.json({ success: true, emailPreferences: user.emailPreferences });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ error: "Failed to update preferences" });
  }
});

export default router;
