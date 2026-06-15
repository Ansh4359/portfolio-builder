import { Router, Request, Response } from "express";
import { templates } from "../templates/index.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const templateList = templates.map(
    ({ id, name, description, thumbnail }) => ({
      id,
      name,
      description,
      thumbnail,
    })
  );
  res.json(templateList);
});

router.get("/:id", (req: Request, res: Response) => {
  const template = templates.find((t) => t.id === req.params.id);
  if (!template) {
    res.status(404).json({ error: "Template not found" });
    return;
  }
  res.json({
    id: template.id,
    name: template.name,
    description: template.description,
    thumbnail: template.thumbnail,
  });
});

export default router;
