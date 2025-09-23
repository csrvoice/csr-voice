import { API_URL, INIT_URI } from "@/constant";
import { convertToIST } from "@/hooks/convertToIst";
import axios from "axios";

export default async function handler(req, res) {
  const format = "Standard";
  try {
    const postResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/format/${format}`,
      {
        params: {
          page: 1,
          per_page: 100,
        },
        timeout: 10000,
      }
    );

    const posts = postResponse?.data?.data || [];

    const items = posts
      .map(
        (post) => `
        <url>
          <loc>${INIT_URI}post/${post?.categories?.[0]?.slug}/${post?.slug}/${
          post?.id
        }</loc>
          <lastmod>${convertToIST(post?.date_gmt)}</lastmod>
        </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${items}
      </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error.message);
    res.status(500).send("Error generating sitemap");
  }
}
