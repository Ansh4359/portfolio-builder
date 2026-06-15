import { Router, Request, Response } from "express";
import multer from "multer";
import  {PDFParse}  from "pdf-parse";
import mammoth from "mammoth";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { Profile } from "../models/Profile.js";
import { parseResumeWithAI } from "../services/mimo.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOCX, and TXT files are allowed"));
    }
  },
});

router.get(
  "/",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const profile = await Profile.findOne({ userId: req.user?._id });
      if (!profile) {
        res.json(null);
        return;
      }
      res.json(profile);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Failed to get profile" });
    }
  }
);

router.put(
  "/",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        title,
        email,
        phone,
        location,
        about,
        skills,
        experience,
        education,
        projects,
        socials,
      } = req.body;

      const profile = await Profile.findOneAndUpdate(
        { userId: req.user?._id },
        {
          name: name || "",
          title: title || "",
          email: email || "",
          phone: phone || undefined,
          location: location || undefined,
          about: about || "",
          skills: skills || [],
          experience: experience || [],
          education: education || [],
          projects: projects || [],
          socials: socials || {},
        },
        { new: true, upsert: true }
      );

      res.json(profile);
    } catch (error) {
      console.error("Save profile error:", error);
      res.status(500).json({ error: "Failed to save profile" });
    }
  }
);

router.post(
  "/resume",
  authenticateToken,
  requireAuth,
  upload.single("resume"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      let text = "";

      if (req.file.mimetype === "application/pdf") {
        const parser = new PDFParse({ data: req.file.buffer });
        const result = await parser.getText();
        text = result.text;
        await parser.destroy();
      } else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });
        text = result.value;
      } else {
        text = req.file.buffer.toString("utf-8");
      }

      if (!text.trim()) {
        res.status(400).json({ error: "Could not extract text from file" });
        return;
      }

      console.log(
        `[resume] Parsed file: ${req.file.originalname} (${text.length} chars)`
      );

      const profileData = await parseResumeWithAI(text);

      await Profile.findOneAndUpdate(
        { userId: req.user?._id },
        {
          ...profileData,
          resumeFileName: req.file.originalname,
          resumeParsedAt: new Date(),
        },
        { upsert: true }
      );

      res.json(profileData);
    } catch (error: any) {
      console.error("Resume parse error:", error);
      res.status(500).json({
        error: error.message || "Failed to parse resume",
      });
    }
  }
);

export default router;
