import { Hono } from "hono";
import { templates } from "../templates";

const app = new Hono();

app.get("/", (c) => {
  return c.json(
    templates.map(({ id, name, description, thumbnail }) => ({
      id,
      name,
      description,
      thumbnail,
    }))
  );
});

app.get("/:id", (c) => {
  const template = templates.find((t) => t.id === c.req.param("id"));
  if (!template) return c.json({ error: "Template not found" }, 404);
  return c.json({
    id: template.id,
    name: template.name,
    description: template.description,
    thumbnail: template.thumbnail,
  });
});

export default app;
