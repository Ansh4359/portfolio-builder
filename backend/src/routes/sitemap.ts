import { Router, Request, Response } from "express";
import { Portfolio } from "../models/Portfolio.js";

const router = Router();

// GET /sitemap.xml — Generate XML sitemap
router.get("/sitemap.xml", async (_req: Request, res: Response) => {
  try {
    const portfolios = await Portfolio.find({
      deploymentUrl: { $exists: true, $ne: "" },
    })
      .select("subdomain updatedAt")
      .sort({ updatedAt: -1 });

    const urls = portfolios
      .map(
        (p) => `  <url>
    <loc>https://${p.subdomain}.myfolio.codes</loc>
    <lastmod>${p.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("\n");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://myfolio.codes</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${urls}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("[sitemap] Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
