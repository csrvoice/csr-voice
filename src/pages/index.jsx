import { AdvertRect } from "@/components/Advertisements/AdvertRect";
import { Interviews } from "@/components/Home/Interview";
import { Laws } from "@/components/Home/Laws";
import { Sectors } from "@/components/Home/Sectors";
import { ThirdContainer } from "@/components/Home/ThirdContainer";
import { TopContainer } from "@/components/Home/TopContainer";
import { Layout } from "@/components/Layout/Layout";
import { API_URL } from "@/constant";
import axios from "axios";
import Head from "next/head";
import { parseStringPromise } from "xml2js";

export default function Home({ posts, rssItems }) {
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>
          CSR Voice - Corporate Social Responsibility News & Insights
        </title>
        <meta
          name="description"
          content="Stay updated with the latest CSR news, sustainability insights, and corporate social responsibility trends. Your trusted source for responsible business practices and social impact stories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="CSR, Corporate Social Responsibility, Sustainability, ESG, Social Impact, Business Ethics, Responsible Business, Environmental News, Social Initiatives"
        />
        <meta name="author" content="CSR Voice" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />

        {/* Favicon */}
        <link rel="icon" href="/images/logo.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.jpg" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/logo.jpg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/logo.jpg"
        />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CSR Voice - Corporate Social Responsibility News & Insights"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest CSR news, sustainability insights, and corporate social responsibility trends."
        />
        <meta property="og:url" content="https://csrvoice.com" />
        <meta property="og:site_name" content="CSR Voice" />
        <meta
          property="og:image"
          content="https://csrvoice.com/images/logo.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="CSR Voice - Corporate Social Responsibility Platform"
        />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@csrvoice" />
        <meta name="twitter:creator" content="@csrvoice" />
        <meta
          name="twitter:title"
          content="CSR Voice - Corporate Social Responsibility News & Insights"
        />
        <meta
          name="twitter:description"
          content="Stay updated with the latest CSR news, sustainability insights, and corporate social responsibility trends."
        />
        <meta
          name="twitter:image"
          content="https://csrvoice.com/twitter-image.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="CSR Voice - Corporate Social Responsibility Platform"
        />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="msapplication-TileColor" content="#2E7D32" />
        <meta name="application-name" content="CSR Voice" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://csrvoice.com" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CSR Voice",
              description:
                "Corporate Social Responsibility News & Insights Platform",
              url: "https://csrvoice.com",
              publisher: {
                "@type": "Organization",
                name: "CSR Voice",
                url: "https://csrvoice.com",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://csrvoice.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <Layout marqueeData={rssItems}>
        <TopContainer posts={posts?.data} />
        <AdvertRect img={"/images/ads/4.png"} />
        <Sectors />
        <AdvertRect img={"/images/ads/5.png"} />
        <ThirdContainer />
        <AdvertRect img={"/images/ads/adTwo.png"} />
        <Interviews />
        <AdvertRect img={"/images/ads/4.png"} />
        <Laws />
        <AdvertRect img={"/images/ads/5.png"} />
        {/* <VideoCont /> */}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const page = 1;
    const format = "Standard";

    // Fetch custom posts from your CMS
    const postsResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/format/${format}?page=${page}&per_page=10`
    );

    // Fetch RSS feed from TOI
    const rssResponse = await axios.get(
      "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
    );

    const parsedRSS = await parseStringPromise(rssResponse.data, {
      explicitArray: false,
    });

    const rssItems = parsedRSS?.rss?.channel?.item?.slice(0, 5) || [];

    return {
      props: {
        posts: postsResponse.data,
        rssItems,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        posts: [],
        rssItems: [],
        error: "Failed to fetch data",
      },
    };
  }
}

// Developed by 4d616e616e
