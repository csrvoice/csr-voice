import { Layout } from "@/components/Layout/Layout";
import { PostPage } from "@/components/Post/PostPage";
import { RelatedNews } from "@/components/Post/RelatedNews";
import { API_URL, INIT_URI } from "@/constant";
import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import NotFound from "@/pages/404Page";
import axios from "axios";
import Head from "next/head";
import React from "react";

const Index = ({ post, marqueeData, categroy }) => {
  if (!post) {
    return <NotFound />;
  }

  const title = useDecodeHtml(post?.data?.title);
  const excerpt = useDecodeHtml(post?.data?.excerpt);
  const category = post?.data?.categories?.[0];
  const postUrl = `${INIT_URI}/post/${category?.slug}/${post?.data?.slug}/${post?.data?.id}`;
  const imageUrl = post?.data?.featured_image || "/images/fallbackTwo.png";
  const logoUrl = "/images/logo.jpg";
  const siteName = "CSR Voice";
  const author = post?.data?.author?.display_name || "CSR Voice Editorial Team";

  // Generate CSR-focused keywords
  const generateKeywords = () => {
    const titleWords =
      title
        ?.toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3) || [];
    const categoryName = category?.name?.toLowerCase() || "";
    const baseKeywords = [
      "CSR Voice",
      "CSR news",
      "corporate social responsibility",
      "sustainability",
      "ESG",
      "social impact",
      "business ethics",
      "responsible business",
      "CSR India",
    ];

    return [
      ...new Set([...baseKeywords, categoryName, ...titleWords.slice(0, 6)]),
    ].join(", ");
  };

  const keywords = generateKeywords();
  const publishedDate = post?.data?.date_gmt;
  const modifiedDate = post?.data?.modified_gmt;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>
          {title
            ? `${title} | CSR Voice - Corporate Social Responsibility News`
            : "CSR Voice"}
        </title>
        <meta
          name="description"
          content={
            excerpt ||
            `Read ${title} on CSR Voice. Latest insights on Corporate Social Responsibility, sustainability, and ESG practices in India.`
          }
        />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow" />

        {/* Viewport and Charset */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Canonical URL */}
        <link rel="canonical" href={postUrl} />

        {/* Favicon and Icons */}
        <link rel="icon" href={logoUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="32x32" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={logoUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={excerpt || `Latest CSR news: ${title}`}
        />
        <meta
          property="og:image"
          content={
            imageUrl.startsWith("http") ? imageUrl : `${INIT_URI}${imageUrl}`
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />

        {/* Article specific Open Graph */}
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta property="article:author" content={author} />
        <meta
          property="article:section"
          content={category?.name || "CSR News"}
        />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/csrvoice"
        />
        {post?.data?.tags?.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag.name} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@csrvoice" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={excerpt || `Read about ${title} on CSR Voice`}
        />
        <meta
          name="twitter:image"
          content={
            imageUrl.startsWith("http") ? imageUrl : `${INIT_URI}${imageUrl}`
          }
        />
        <meta name="twitter:image:alt" content={title} />
        <meta name="twitter:creator" content="@csrvoice" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="msapplication-TileColor" content="#2E7D32" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href={
            imageUrl.startsWith("http") ? imageUrl : `${INIT_URI}${imageUrl}`
          }
          as="image"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* NewsArticle Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: title,
              description: excerpt,
              image: {
                "@type": "ImageObject",
                url: imageUrl.startsWith("http")
                  ? imageUrl
                  : `${INIT_URI}${imageUrl}`,
                width: 1200,
                height: 675,
              },
              datePublished: publishedDate,
              dateModified: modifiedDate,
              author: {
                "@type": "Person",
                name: author,
                url: `${INIT_URI}/author/${
                  post?.data?.author?.slug || "csr-voice"
                }`,
              },
              publisher: {
                "@type": "Organization",
                name: siteName,
                url: INIT_URI,
                logo: {
                  "@type": "ImageObject",
                  url: `${INIT_URI}${logoUrl}`,
                  width: 200,
                  height: 60,
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": postUrl,
              },
              articleSection: category?.name || "CSR News",
              keywords: keywords,
              url: postUrl,
              inLanguage: "en-IN",
              about: {
                "@type": "Thing",
                name: "Corporate Social Responsibility",
                sameAs:
                  "https://en.wikipedia.org/wiki/Corporate_social_responsibility",
              },
              mentions: [
                {
                  "@type": "Thing",
                  name: "CSR",
                  sameAs:
                    "https://en.wikipedia.org/wiki/Corporate_social_responsibility",
                },
                {
                  "@type": "Thing",
                  name: "Sustainability",
                  sameAs: "https://en.wikipedia.org/wiki/Sustainability",
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb Schema */}
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
                  item: INIT_URI,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: category?.name || "News",
                  item: `${INIT_URI}/category/${category?.slug || "news"}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: title,
                  item: postUrl,
                },
              ],
            }),
          }}
        />

        {/* Organization Schema for Publisher */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: INIT_URI,
              logo: {
                "@type": "ImageObject",
                url: `${INIT_URI}${logoUrl}`,
              },
              sameAs: [
                "https://twitter.com/csrvoice",
                "https://www.linkedin.com/company/csrvoice",
                "https://www.facebook.com/csrvoice",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "editorial",
                availableLanguage: ["English"],
              },
              areaServed: "IN",
              knowsAbout: [
                "Corporate Social Responsibility",
                "Sustainability",
                "ESG Reporting",
                "Social Impact",
                "Business Ethics",
              ],
            }),
          }}
        />

        {/* FAQ Schema if applicable */}
        {category?.name === "FAQ" && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: {
                  "@type": "Question",
                  name: title,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: excerpt,
                  },
                },
              }),
            }}
          />
        )}

        {/* Alternate languages */}
        <link rel="alternate" hrefLang="en" href={postUrl} />
        <link rel="alternate" hrefLang="en-in" href={postUrl} />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteName} RSS Feed`}
          href={`${INIT_URI}/feed`}
        />

        {/* Reading Time and Word Count (if available) */}
        {post?.data?.reading_time && (
          <meta name="twitter:label1" content="Reading time" />
        )}
        {post?.data?.reading_time && (
          <meta
            name="twitter:data1"
            content={`${post.data.reading_time} min read`}
          />
        )}

        {/* Category specific meta */}
        <meta name="news_keywords" content={keywords} />
        <meta name="standout" content={postUrl} />
      </Head>

      <Layout marqueeData={marqueeData}>
        <PostPage post={post?.data} />
        <RelatedNews catName={categroy} />
      </Layout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    // Fetch custom posts from your CMS
    const postsResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/${query?.slug}`
    );

    const topMarquee = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/format/standard?page=1&per_page=10`
    );

    return {
      props: {
        post: postsResponse.data,
        marqueeData: topMarquee.data,
        error: null,
        categroy: query?.category,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
        marqueeData: [],
        error: "Failed to fetch data",
        categroy: "",
      },
    };
  }
}

export default Index;
