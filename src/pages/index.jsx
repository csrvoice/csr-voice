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

export default function Home({ posts, homeLatestStories, marqueeData }) {
  const siteName = "CSR Voice";
  const siteUrl = "https://www.csrvoice.com";
  const logoUrl = "https://www.csrvoice.com/images/logo.jpg";
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>
          CSR Voice - India's Leading Corporate Social Responsibility News & ESG
          Insights Platform
        </title>
        <meta
          name="description"
          content="CSR Voice is India's premier platform for Corporate Social Responsibility news, ESG reporting, sustainability insights, and governance updates. Stay informed with latest CSR policies, compliance guidelines, and best practices from leading corporations across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="CSR Voice, CSR news India, Corporate Social Responsibility, ESG reporting, sustainability news, CSR compliance, CSR policies India, social impact initiatives, environmental governance, business ethics, responsible business practices, CSR activities, sustainable development goals, corporate governance India, social responsibility, CSR laws India, Companies Act 2013 CSR, CSR funding, NGO partnerships, impact measurement"
        />
        <meta name="author" content="CSR Voice Editorial Team" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="language" content="en-IN" />
        <meta httpEquiv="Content-Language" content="en-IN" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />

        {/* Geographic Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />

        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en-in" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />

        {/* Favicon and Icons */}
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
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/images/logo.jpg" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:title"
          content="CSR Voice - India's Leading Corporate Social Responsibility News & ESG Platform"
        />
        <meta
          property="og:description"
          content="Your trusted source for CSR news, ESG reporting, sustainability insights, and governance updates in India. Connect with CSR professionals and stay updated with latest trends, policies, and best practices."
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:image:secure_url" content={logoUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta
          property="og:image:alt"
          content="CSR Voice - Corporate Social Responsibility Platform India"
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />

        {/* Facebook Specific Tags */}
        <meta property="fb:app_id" content="YOUR_FB_APP_ID" />
        <meta property="fb:pages" content="YOUR_FB_PAGE_ID" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CsrVoice" />
        <meta name="twitter:creator" content="@CsrVoice" />
        <meta
          name="twitter:title"
          content="CSR Voice - India's Leading Corporate Social Responsibility News & ESG Platform"
        />
        <meta
          name="twitter:description"
          content="India's premier CSR platform. Get latest news on Corporate Social Responsibility, ESG reporting, sustainability, and governance updates."
        />
        <meta name="twitter:image" content={logoUrl} />
        <meta name="twitter:image:alt" content="CSR Voice Logo" />
        <meta name="twitter:domain" content="csrvoice.com" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="msapplication-TileColor" content="#2E7D32" />
        <meta name="msapplication-TileImage" content="/images/logo.jpg" />
        <meta name="application-name" content={siteName} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteName} />

        {/* Publisher Information */}
        <link rel="publisher" href="https://www.csrvoice.com" />
        <meta name="publisher" content="CSR Voice" />

        {/* Preconnect and DNS Prefetch for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* RSS and Atom Feeds */}
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
          title="Sitemap"
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
              alternateName: [
                "CSR Voice India",
                "Corporate Social Responsibility Voice",
              ],
              description:
                "India's leading Corporate Social Responsibility news and insights platform, covering CSR policies, ESG reporting, sustainability, and governance.",
              url: siteUrl,
              logo: {
                "@type": "ImageObject",
                url: logoUrl,
                width: 200,
                height: 60,
              },
              image: logoUrl,
              sameAs: [
                "https://twitter.com/CsrVoice",
                "https://www.linkedin.com/in/csr-voice-049410232",
                "https://ne-np.facebook.com/mycsrvoice",
                "https://www.youtube.com/channel/UCAy0c5dC5yy-wcTxqgujMhA",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Hindi"],
                areaServed: "IN",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              knowsAbout: [
                "Corporate Social Responsibility",
                "Sustainability",
                "ESG Reporting",
                "Business Ethics",
                "Social Impact",
                "Environmental Governance",
                "CSR Compliance",
                "Sustainable Development",
              ],
              founder: {
                "@type": "Organization",
                name: "CSR Voice",
              },
              foundingDate: "2020",
              slogan: "Amplifying Corporate Social Responsibility",
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
              alternateName: "CSR Voice India",
              description:
                "Corporate Social Responsibility News, ESG Insights, Sustainability & Governance Platform for India",
              url: siteUrl,
              inLanguage: "en-IN",
              copyrightYear: currentYear,
              copyrightHolder: {
                "@type": "Organization",
                name: siteName,
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
                url: siteUrl,
                logo: {
                  "@type": "ImageObject",
                  url: logoUrl,
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
                  "Latest Corporate Social Responsibility news and insights from India",
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
                url: logoUrl,
              },
              sameAs: [
                "https://twitter.com/CsrVoice",
                "https://www.linkedin.com/in/csr-voice-049410232",
                "https://ne-np.facebook.com/mycsrvoice",
                "https://www.youtube.com/channel/UCAy0c5dC5yy-wcTxqgujMhA",
              ],
              description:
                "India's premier source for Corporate Social Responsibility news, ESG reporting, and sustainability insights",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              publishingPrinciples: `${siteUrl}/editorial-guidelines`,
              diversityPolicy: `${siteUrl}/diversity-policy`,
              ethicsPolicy: `${siteUrl}/ethics-policy`,
              masthead: `${siteUrl}/about`,
              missionCoveragePrioritiesPolicy: `${siteUrl}/mission-coverage`,
              actionableFeedbackPolicy: `${siteUrl}/feedback-policy`,
            }),
          }}
        />

        {/* Enhanced BreadcrumbList Schema with Main Categories */}
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
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "News",
                  item: `${siteUrl}/category/news`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Governance",
                  item: `${siteUrl}/category/governance`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Sustainable World",
                  item: `${siteUrl}/category/sustainable-world`,
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Laws",
                  item: `${siteUrl}/category/laws`,
                },
              ],
            }),
          }}
        />

        {/* CollectionPage Schema for Categories */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "CSR Voice Categories",
              description:
                "Browse CSR news by category: News, Governance, Sustainable World, and Laws",
              url: siteUrl,
              hasPart: [
                {
                  "@type": "WebPage",
                  name: "CSR News",
                  url: `${siteUrl}/category/news`,
                  description:
                    "Latest news on Corporate Social Responsibility in India",
                },
                {
                  "@type": "WebPage",
                  name: "Governance",
                  url: `${siteUrl}/category/governance`,
                  description:
                    "Corporate governance and ESG reporting insights",
                },
                {
                  "@type": "WebPage",
                  name: "Sustainable World",
                  url: `${siteUrl}/category/sustainable-world`,
                  description:
                    "Sustainability initiatives and environmental news",
                },
                {
                  "@type": "WebPage",
                  name: "CSR Laws",
                  url: `${siteUrl}/category/laws`,
                  description:
                    "CSR laws, compliance, and regulatory updates in India",
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
                    text: "Corporate Social Responsibility (CSR) is a business approach that contributes to sustainable development by delivering economic, social, and environmental benefits for all stakeholders. In India, CSR is mandated under Section 135 of the Companies Act 2013, requiring eligible companies to spend at least 2% of their average net profits on CSR activities.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are CSR activities in India?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "CSR activities in India include education, healthcare, environmental sustainability, rural development, disaster relief, promoting art and culture, women empowerment, skill development, poverty alleviation, and promoting sports, as mandated by the Companies Act 2013 and Schedule VII.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which companies must follow CSR rules in India?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Companies with a net worth of Rs 500 crore or more, or turnover of Rs 1,000 crore or more, or net profit of Rs 5 crore or more during the immediately preceding financial year must comply with CSR provisions under the Companies Act 2013.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is ESG reporting?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ESG (Environmental, Social, and Governance) reporting is the disclosure of data covering a company's operations in those three areas. It helps investors and stakeholders understand how companies manage risks and opportunities related to environmental impact, social responsibility, and corporate governance.",
                  },
                },
              ],
            }),
          }}
        />

        {/* VideoObject Schema if you have video content */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "CSR Voice Video Content",
              description:
                "Corporate Social Responsibility insights and interviews",
              thumbnailUrl: logoUrl,
              uploadDate: new Date().toISOString(),
              contentUrl:
                "https://www.youtube.com/channel/UCAy0c5dC5yy-wcTxqgujMhA",
              embedUrl:
                "https://www.youtube.com/channel/UCAy0c5dC5yy-wcTxqgujMhA",
            }),
          }}
        />
      </Head>

      <Layout marqueeData={marqueeData}>
        <TopContainer
          posts={posts?.data}
          homeLatestStories={homeLatestStories?.data}
        />
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
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const page = 1;
    const format = "standard";
    const category = "home-lead-story";

    const postsResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/category/${category}/format/${format}?page=${page}&per_page=1`
    );

    const latestStoriesResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/category/home-latest-stories/format/${format}?page=${page}&per_page=8`
    );

    const topMarquee = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/format/standard?page=1&per_page=10`
    );

    return {
      props: {
        posts: postsResponse.data,
        homeLatestStories: latestStoriesResponse.data,
        marqueeData: topMarquee.data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        posts: [],
        homeLatestStories: [],
        marqueeData: [],
        error: "Failed to fetch data",
      },
    };
  }
}
