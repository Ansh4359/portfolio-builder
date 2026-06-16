import { Request, Response, NextFunction } from "express";

const ADMIN_EMAIL = "anshsingh4359@gmail.com";

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  if (req.user.email !== ADMIN_EMAIL) {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  next();
}
