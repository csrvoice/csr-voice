import { INIT_URI } from "@/constant";

async function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${INIT_URI}pages-sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>${INIT_URI}latest-news-sitemap.xml</loc>
    </sitemap>
  </sitemapindex>`;
}

export default async function SiteMap(req, res) {
  const sitemap = await generateSiteMap();
  res.setHeader("Content-Type", "application/xml");
  res.write(sitemap);
  res.end();
}
