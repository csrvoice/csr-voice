import { AdvertRect } from "@/components/Advertisements/AdvertRect";
import { FifthContainer } from "@/components/Home/FifthContainer";
import { Interviews } from "@/components/Home/Interview";
import { Sectors } from "@/components/Home/Sectors";
import { ThirdContainer } from "@/components/Home/ThirdContainer";
import { TopContainer } from "@/components/Home/TopContainer";
import { Layout } from "@/components/Layout/Layout";
import { API_URL } from "@/constant";
import axios from "axios";
import Head from "next/head";
import { parseStringPromise } from "xml2js";

export default function Home({ posts, rssItems }) {
  const siteName = "CSR Voice";
  const siteUrl = "https://csrvoice.com";
  const logoUrl = "/images/logo.jpg";

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>
          CSR Voice - Corporate Social Responsibility News & Insights | Leading
          CSR Platform
        </title>
        <meta
          name="description"
          content="CSR Voice is India's leading platform for Corporate Social Responsibility news, sustainability insights, and ESG reporting. Stay updated with latest CSR trends, policies, and best practices from top corporations."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="CSR Voice, Corporate Social Responsibility, CSR news India, sustainability news, ESG reporting, social impact, business ethics, responsible business, environmental initiatives, CSR policies, CSR compliance, sustainable development, corporate governance, social responsibility India"
        />
        <meta name="author" content="CSR Voice Editorial Team" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="en" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />

        {/* Favicon and Icons */}
        <link rel="icon" href={logoUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="32x32" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={logoUrl} />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:title"
          content="CSR Voice - Corporate Social Responsibility News & Insights"
        />
        <meta
          property="og:description"
          content="India's leading platform for Corporate Social Responsibility news, sustainability insights, and ESG reporting. Connect with CSR professionals and stay updated with latest trends."
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}${logoUrl}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="CSR Voice - Corporate Social Responsibility Platform"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />

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
          content="India's leading CSR platform. Get latest news on Corporate Social Responsibility, sustainability, and ESG reporting."
        />
        <meta name="twitter:image" content={`${siteUrl}${logoUrl}`} />
        <meta name="twitter:image:alt" content="CSR Voice Logo" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="msapplication-TileColor" content="#2E7D32" />
        <meta name="application-name" content={siteName} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteName} />

        {/* Preconnect and DNS Prefetch for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="CSR Voice RSS Feed"
          href={`${siteUrl}/rss`}
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="CSR Voice Atom Feed"
          href={`${siteUrl}/atom`}
        />

        {/* Sitemap */}
        <link
          rel="sitemap"
          type="application/xml"
          href={`${siteUrl}/sitemap.xml`}
        />

        {/* Organization JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              alternateName: "CSR Voice India",
              description:
                "India's leading Corporate Social Responsibility news and insights platform",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}${logoUrl}`,
                width: 200,
                height: 60,
              },
              sameAs: [
                "https://twitter.com/csrvoice",
                "https://www.linkedin.com/company/csrvoice",
                "https://www.facebook.com/csrvoice",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
              },
              areaServed: "India",
              knowsAbout: [
                "Corporate Social Responsibility",
                "Sustainability",
                "ESG Reporting",
                "Business Ethics",
                "Social Impact",
              ],
            }),
          }}
        />

        {/* Website JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              description:
                "Corporate Social Responsibility News & Insights Platform for India",
              url: siteUrl,
              inLanguage: "en-IN",
              copyrightYear: new Date().getFullYear(),
              publisher: {
                "@type": "Organization",
                name: siteName,
                url: siteUrl,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}${logoUrl}`,
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "ItemList",
                name: "Latest CSR News",
                description:
                  "Latest Corporate Social Responsibility news and insights",
              },
            }),
          }}
        />

        {/* NewsMediaOrganization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: siteName,
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${siteUrl}${logoUrl}`,
              },
              sameAs: [
                "https://twitter.com/csrvoice",
                "https://www.linkedin.com/company/csrvoice",
              ],
              description:
                "India's premier source for Corporate Social Responsibility news and insights",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              diversityPolicy: `${siteUrl}/diversity-policy`,
              ethicsPolicy: `${siteUrl}/ethics-policy`,
              masthead: `${siteUrl}/about`,
              missionCoveragePrioritiesPolicy: `${siteUrl}/mission-coverage`,
              noBylinesPolicy: `${siteUrl}/bylines-policy`,
              ownershipFundingInfo: `${siteUrl}/funding-info`,
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteUrl,
                },
              ],
            }),
          }}
        />

        {/* FAQ Schema for CSR */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Corporate Social Responsibility (CSR)?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Corporate Social Responsibility (CSR) is a business approach that contributes to sustainable development by delivering economic, social and environmental benefits for all stakeholders.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are CSR activities in India?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CSR activities in India include education, healthcare, environmental sustainability, rural development, disaster relief, and promoting art and culture as mandated by the Companies Act 2013.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <Layout marqueeData={rssItems}>
        <TopContainer posts={posts?.data} />
        <AdvertRect
          img={"/images/ads/4.png"}
          link="https://www.airbus.com/en"
        />
        <Sectors />
        <AdvertRect img={"/images/ads/5.png"} link="https://amzn.to/46RuYmy" />
        <ThirdContainer />
        <AdvertRect
          img={"/images/ads/adTwo.png"}
          link="https://shop.snowchildstudio.com"
        />
        <Interviews />
        <AdvertRect
          img={"/images/ads/4.png"}
          link="https://www.airbus.com/en"
        />
        <FifthContainer />
        <AdvertRect img={"/images/ads/5.png"} link="https://amzn.to/46RuYmy" />
        {/* <VideoCont /> */}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const page = 1;
    const format = "standard";
    const category = "home-lead-story";

    // Fetch custom posts from your CMS
    const postsResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/category/${category}/format/${format}?page=${page}&per_page=8`
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
