import { NewsCard } from "@/components/Cards/NewsCard";
import { Layout } from "@/components/Layout/Layout";
import { HeadingTypographyTwo } from "@/components/Typographies/HeadingTypographyTwo";
import { API_URL, INIT_URI } from "@/constant";
import { Button, CircularProgress, Container } from "@mui/material";
import { Box, Grid } from "@mui/system";
import axios from "axios";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

const Category = ({ posts, rssItems, category }) => {
  const [paginatedPosts, setPaginatesPosts] = useState();
  const [size, setSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const categoryName = posts?.category?.name || category;
  const categorySlug = posts?.category?.slug || category;
  const siteName = "CSR Voice";
  const categoryUrl = `${INIT_URI}/category/${categorySlug}`;
  const logoUrl = "/images/logo.jpg";

  // Generate category-specific description
  const generateCategoryDescription = (catName) => {
    const descriptions = {
      sustainability:
        "Latest sustainability news, environmental initiatives, and green business practices. Stay updated with sustainable development goals and eco-friendly corporate strategies.",
      esg: "ESG (Environmental, Social, and Governance) news and reports. Latest trends in ESG investing, reporting standards, and corporate governance best practices.",
      "social-impact":
        "Social impact stories, community development initiatives, and corporate philanthropy news. Discover how businesses are making a positive difference in society.",
      environmental:
        "Environmental news, climate change initiatives, and corporate environmental responsibility. Latest updates on green technologies and environmental compliance.",
      governance:
        "Corporate governance news, board diversity, transparency initiatives, and ethical business practices. Stay informed about governance reforms and regulations.",
      education:
        "Corporate education initiatives, skill development programs, and educational CSR projects. Discover how businesses are investing in human capital development.",
      healthcare:
        "Healthcare CSR initiatives, medical outreach programs, and corporate health responsibility. Latest news on healthcare accessibility and corporate medical contributions.",
      "rural-development":
        "Rural development projects, agricultural initiatives, and corporate rural engagement. News about businesses empowering rural communities and sustainable agriculture.",
    };

    return (
      descriptions[catName?.toLowerCase()] ||
      `Latest ${catName} news and insights from CSR Voice. Stay updated with corporate social responsibility developments in ${catName} sector.`
    );
  };

  // Generate category-specific keywords
  const generateCategoryKeywords = (catName) => {
    const baseKeywords = [
      "CSR Voice",
      "corporate social responsibility",
      "CSR news",
      "business ethics",
      "social impact",
    ];
    const categorySpecific = {
      sustainability: [
        "sustainability news",
        "sustainable development",
        "green business",
        "environmental sustainability",
        "SDG",
      ],
      esg: [
        "ESG reporting",
        "ESG investing",
        "environmental social governance",
        "ESG news",
        "ESG standards",
      ],
      "social-impact": [
        "social impact",
        "community development",
        "corporate philanthropy",
        "social responsibility",
      ],
      environmental: [
        "environmental news",
        "climate change",
        "environmental responsibility",
        "green initiatives",
      ],
      governance: [
        "corporate governance",
        "board diversity",
        "business ethics",
        "transparency",
      ],
    };

    const specific = categorySpecific[catName?.toLowerCase()] || [
      catName?.toLowerCase(),
    ];
    return [
      ...baseKeywords,
      ...specific,
      `${catName} India`,
      `${catName} CSR`,
    ].join(", ");
  };

  const categoryDescription = generateCategoryDescription(categoryName);
  const categoryKeywords = generateCategoryKeywords(categoryName);

  // Reset state when category changes
  useEffect(() => {
    setPaginatesPosts(undefined);
    setSize(16);
    setHasMore(true);
  }, [category]);

  const getPaginatedPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/wp-json/custom/v1/posts/category/${category}/format/standard?page=1&per_page=${size}`
      );
      setPaginatesPosts(response?.data?.data);
      if (!response?.data?.pagination?.has_next) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 1200 &&
      !loading &&
      hasMore
    ) {
      setSize((prevSize) => prevSize + 8);
    }
  };

  useEffect(() => {
    if (size > 16) {
      getPaginatedPosts();
    }
  }, [size]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{`${categoryName} News & Insights | CSR Voice - Corporate Social Responsibility Platform`}</title>
        <meta name="description" content={categoryDescription} />
        <meta name="keywords" content={categoryKeywords} />
        <meta name="author" content="CSR Voice Editorial Team" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large"
        />
        <meta name="googlebot" content="index, follow" />

        {/* Viewport and Charset */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Canonical URL */}
        <link rel="canonical" href={categoryUrl} />

        {/* Favicon and Icons */}
        <link rel="icon" href={logoUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta
          property="og:title"
          content={`${categoryName} News & Insights | CSR Voice`}
        />
        <meta property="og:description" content={categoryDescription} />
        <meta property="og:url" content={categoryUrl} />
        <meta property="og:image" content={`${INIT_URI}${logoUrl}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={`${categoryName} News on CSR Voice`}
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@csrvoice" />
        <meta
          name="twitter:title"
          content={`${categoryName} News | CSR Voice`}
        />
        <meta name="twitter:description" content={categoryDescription} />
        <meta name="twitter:image" content={`${INIT_URI}${logoUrl}`} />
        <meta name="twitter:image:alt" content={`${categoryName} CSR News`} />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="format-detection" content="telephone=no" />

        {/* Category Page Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `${categoryName} News`,
              description: categoryDescription,
              url: categoryUrl,
              inLanguage: "en-IN",
              isPartOf: {
                "@type": "WebSite",
                name: siteName,
                url: INIT_URI,
              },
              about: {
                "@type": "Thing",
                name: categoryName,
                description: categoryDescription,
              },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: posts?.data?.length || 0,
                itemListElement:
                  posts?.data?.slice(0, 5)?.map((post, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@type": "NewsArticle",
                      headline: post.title,
                      url: `${INIT_URI}/post/${post.categories?.[0]?.slug}/${post.slug}/${post.id}`,
                      datePublished: post.date_gmt,
                      author: {
                        "@type": "Person",
                        name: post.author?.display_name || "CSR Voice Team",
                      },
                      publisher: {
                        "@type": "Organization",
                        name: siteName,
                        logo: {
                          "@type": "ImageObject",
                          url: `${INIT_URI}${logoUrl}`,
                        },
                      },
                    },
                  })) || [],
              },
              breadcrumb: {
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
                    name: categoryName,
                    item: categoryUrl,
                  },
                ],
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: INIT_URI,
              potentialAction: {
                "@type": "SearchAction",
                target: `${INIT_URI}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: INIT_URI,
              logo: `${INIT_URI}${logoUrl}`,
              sameAs: [
                "https://twitter.com/csrvoice",
                "https://www.linkedin.com/company/csrvoice",
                "https://www.facebook.com/csrvoice",
              ],
              areaServed: "IN",
              knowsAbout: [
                "Corporate Social Responsibility",
                "Sustainability",
                "ESG Reporting",
                categoryName,
              ],
            }),
          }}
        />

        {/* Article Series Schema for Category */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Series",
              name: `${categoryName} News Series`,
              description: `Latest news and insights about ${categoryName} in Corporate Social Responsibility`,
              publisher: {
                "@type": "Organization",
                name: siteName,
                url: INIT_URI,
              },
              about: {
                "@type": "Thing",
                name: categoryName,
              },
            }),
          }}
        />

        {/* Preload and DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* Alternate languages */}
        <link rel="alternate" hrefLang="en" href={categoryUrl} />
        <link rel="alternate" hrefLang="en-in" href={categoryUrl} />

        {/* RSS Feed for category */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${categoryName} RSS Feed - CSR Voice`}
          href={`${INIT_URI}/category/${categorySlug}/feed`}
        />

        {/* Pagination meta tags */}
        {posts?.pagination?.has_next && (
          <link rel="next" href={`${categoryUrl}?page=2`} />
        )}

        {/* Additional category-specific meta */}
        <meta name="news_keywords" content={categoryKeywords} />
        <meta property="article:section" content={categoryName} />
      </Head>

      <Layout marqueeData={rssItems}>
        <Box
          sx={{
            my: { xs: 2, md: 5 },
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                p: 2,
                borderRadius: "7px",
                border: "1.5px solid #e8e8e8",
              }}
            >
              {/* Category Heading */}
              <HeadingTypographyTwo title={posts?.category?.name} />
              <Grid container rowGap={{ xs: 1, md: 5 }}>
                {posts?.data?.map((item, key) => (
                  <Grid item size={{ xs: 12, md: 3 }} key={key}>
                    <NewsCard news={item} />
                  </Grid>
                ))}
                {paginatedPosts?.slice(8)?.map((item, key) => (
                  <Grid item size={{ xs: 12, md: 3 }} key={key}>
                    <NewsCard news={item} />
                  </Grid>
                ))}
              </Grid>
              {!hasMore ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      bgcolor: "#1877f2",
                      border: "0.5px solid #1877f2",
                      textTransform: "none",
                      borderRadius: "100px",
                      px: 5,
                      "&:hover": {
                        bgcolor: "white",
                        color: "#1877f2",
                        border: "0.5px solid #1877f2",
                      },
                    }}
                    onClick={scrollToTop}
                    className="font-text-bold"
                  >
                    Back to top
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  <CircularProgress sx={{ color: "#1877f2" }} />
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default Category;

export async function getServerSideProps({ query }) {
  try {
    const response = await axios.get(
      `${API_URL}/wp-json/custom/v1/posts/category/${query?.slug}/format/standard?page=1&per_page=8`
    );

    const rssResponse = await axios.get(
      "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
    );

    const parsedRSS = await parseStringPromise(rssResponse.data, {
      explicitArray: false,
    });

    const rssItems = parsedRSS?.rss?.channel?.item?.slice(0, 5) || [];

    return {
      props: {
        posts: response.data,
        rssItems,
        error: null,
        category: query?.slug,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        posts: [],
        rssItems: [],
        error: "Failed to fetch data",
        category: "",
      },
    };
  }
}
