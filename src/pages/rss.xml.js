import { API_URL, INIT_URI } from "@/constant";
import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { useFilteredCategories } from "@/hooks/useFilteredCategories";
import axios from "axios";
import RSS from "rss";

export async function getServerSideProps({ res }) {
  // Fetch posts from your WordPress API
  const apiUrl = `${API_URL}/wp-json/custom/v1/posts/format/standard?page=1&per_page=20`;
  const response = await axios.get(apiUrl);

  // Create feed
  const feed = new RSS({
    title: "CSR Voice",
    description: "Latest news and updates from CSR Voice",
    site_url: "https://www.csrvoice.com",
    feed_url: "https://www.csrvoice.com/rss.xml",
    language: "en",
  });

  // Add posts to feed
  response?.data?.data?.map((post) => {
    feed?.item({
      title: useDecodeHtml(post?.title),
      description: useDecodeHtml(post?.excerpt),
      url: `${INIT_URI}${useFilteredCategories(post.categories)[0]?.slug}/${
        post.slug
      }/${post.id}`,
      date: post?.date,
    });
  });

  // Send feed as XML
  res.setHeader("Content-Type", "text/xml");
  res.write(feed.xml({ indent: true }));
  res.end();

  return { props: {} };
}

export default function RSSFeed() {
  return null; // This page doesn’t render anything
}
