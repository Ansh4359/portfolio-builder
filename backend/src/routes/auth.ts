import { Router, Request, Response } from "express";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { getAuthInstance } from "../config/firebase.js";
import { User } from "../models/User.js";
import { sendMagicLinkEmail } from "../lib/email.js";

const router = Router();

router.post("/send-magic-link", async (req: Request, res: Response) => {
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
    const { displayName, photoURL, tier } = req.body;

    const updateData: Record<string, any> = {};
    if (displayName) updateData.displayName = displayName;
    if (photoURL) updateData.photoURL = photoURL;
    if (tier && ["free", "pro"].includes(tier)) {
      updateData.tier = tier;
      updateData.tierUpdatedAt = new Date();
    }

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

export default router;
