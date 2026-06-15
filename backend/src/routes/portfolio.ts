import { Router, Request, Response } from "express";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { Portfolio } from "../models/Portfolio.js";

const router = Router();

router.get(
  "/",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const portfolios = await Portfolio.find({ userId: req.user?._id }).sort({
        updatedAt: -1,
      });
      res.json(portfolios);
    } catch (error) {
      console.error("Get portfolios error:", error);
      res.status(500).json({ error: "Failed to get portfolios" });
    }
  }
);

router.post(
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
        templateId,
        subdomain,
        deploymentUrl,
      } = req.body;

      if (!name || !title || !email || !templateId) {
        res.status(400).json({
          error: "Missing required fields: name, title, email, templateId",
        });
        return;
      }

      const portfolio = await Portfolio.create({
        userId: req.user?._id,
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
        templateId,
        subdomain,
        deploymentUrl,
      });

      res.status(201).json(portfolio);
    } catch (error) {
      console.error("Create portfolio error:", error);
      res.status(500).json({ error: "Failed to create portfolio" });
    }
  }
);

router.get(
  "/:id",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const portfolio = await Portfolio.findOne({
        _id: req.params.id,
        userId: req.user?._id,
      });

      if (!portfolio) {
        res.status(404).json({ error: "Portfolio not found" });
        return;
      }

      res.json(portfolio);
    } catch (error) {
      console.error("Get portfolio error:", error);
      res.status(500).json({ error: "Failed to get portfolio" });
    }
  }
);

router.put(
  "/:id",
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
        templateId,
        subdomain,
        deploymentUrl,
      } = req.body;

      const portfolio = await Portfolio.findOneAndUpdate(
        { _id: req.params.id, userId: req.user?._id },
        {
          ...(name && { name }),
          ...(title && { title }),
          ...(email && { email }),
          ...(phone !== undefined && { phone }),
          ...(location !== undefined && { location }),
          ...(about !== undefined && { about }),
          ...(skills && { skills }),
          ...(experience && { experience }),
          ...(education && { education }),
          ...(projects && { projects }),
          ...(socials && { socials }),
          ...(templateId && { templateId }),
          ...(subdomain !== undefined && { subdomain }),
          ...(deploymentUrl !== undefined && { deploymentUrl }),
        },
        { new: true }
      );

      if (!portfolio) {
        res.status(404).json({ error: "Portfolio not found" });
        return;
      }

      res.json(portfolio);
    } catch (error) {
      console.error("Update portfolio error:", error);
      res.status(500).json({ error: "Failed to update portfolio" });
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const portfolio = await Portfolio.findOneAndDelete({
        _id: req.params.id,
        userId: req.user?._id,
      });

      if (!portfolio) {
        res.status(404).json({ error: "Portfolio not found" });
        return;
      }

      res.json({ message: "Portfolio deleted" });
    } catch (error) {
      console.error("Delete portfolio error:", error);
      res.status(500).json({ error: "Failed to delete portfolio" });
    }
  }
);

export default router;
