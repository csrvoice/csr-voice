import React, { useCallback, useEffect, useState } from "react";
import { NewsCard } from "@/components/Cards/NewsCard";
import { Layout } from "@/components/Layout/Layout";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { parseStringPromise } from "xml2js";
import { API_URL, INIT_URI } from "@/constant";

const Search = ({ posts, rssItems, searchtext }) => {
  const [paginatedPosts, setPaginatesPosts] = useState();
  const [size, setSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const siteName = "CSR Voice";
  const searchUrl = `${INIT_URI}/search?text=${encodeURIComponent(searchtext)}`;
  const logoUrl = "/images/logo.jpg";
  const resultsCount = posts?.data?.length || 0;
  const hasResults = resultsCount > 0;

  // Generate search-specific meta content
  const generateSearchTitle = () => {
    if (!searchtext) return `Search | ${siteName}`;
    if (!hasResults) return `No results for "${searchtext}" | ${siteName}`;
    return `"${searchtext}" Search Results | ${siteName} - CSR News`;
  };

  const generateSearchDescription = () => {
    if (!searchtext)
      return `Search CSR Voice for latest Corporate Social Responsibility news, sustainability insights, and ESG reporting.`;
    if (!hasResults)
      return `No results found for "${searchtext}". Try searching for CSR news, sustainability, ESG, or social impact topics on CSR Voice.`;
    return `Search results for "${searchtext}" on CSR Voice. Found ${resultsCount} articles about Corporate Social Responsibility, sustainability, and ESG topics.`;
  };

  const generateSearchKeywords = () => {
    const baseKeywords = [
      "CSR Voice search",
      "CSR news search",
      "sustainability search",
      "ESG search",
    ];
    if (searchtext) {
      baseKeywords.push(
        `${searchtext} CSR`,
        `${searchtext} sustainability`,
        `${searchtext} news`
      );
    }
    return baseKeywords.join(", ");
  };

  // Reset state when search text changes
  useEffect(() => {
    setPaginatesPosts(undefined);
    setSize(16);
    setHasMore(true);
  }, [searchtext]);

  const getPaginatedPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/wp-json/custom/v1/search?keyword=${searchtext}&page=1&per_page=${size}`
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
        <title>{generateSearchTitle()}</title>
        <meta name="description" content={generateSearchDescription()} />
        <meta name="keywords" content={generateSearchKeywords()} />
        <meta name="author" content="CSR Voice" />

        {/* Important: Control indexing for search pages */}
        {!hasResults || !searchtext ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <meta name="robots" content="index, nofollow, max-snippet:-1" />
        )}
        <meta
          name="googlebot"
          content={
            !hasResults || !searchtext ? "noindex, nofollow" : "index, nofollow"
          }
        />

        {/* Viewport and Charset */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Canonical URL - Important for search pages */}
        {searchtext && hasResults ? (
          <link rel="canonical" href={searchUrl} />
        ) : (
          <link rel="canonical" href={`${INIT_URI}/search`} />
        )}

        {/* Favicon */}
        <link rel="icon" href={logoUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />

        {/* Open Graph / Facebook - Limited for search pages */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={generateSearchTitle()} />
        <meta property="og:description" content={generateSearchDescription()} />
        <meta property="og:url" content={searchUrl} />
        <meta property="og:image" content={`${INIT_URI}${logoUrl}`} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card - Limited for search pages */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@csrvoice" />
        <meta name="twitter:title" content={generateSearchTitle()} />
        <meta
          name="twitter:description"
          content={generateSearchDescription()}
        />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2E7D32" />
        <meta name="format-detection" content="telephone=no" />

        {/* Search Results Schema - Only if there are results */}
        {hasResults && searchtext && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SearchResultsPage",
                name: `Search results for "${searchtext}"`,
                description: generateSearchDescription(),
                url: searchUrl,
                inLanguage: "en-IN",
                isPartOf: {
                  "@type": "WebSite",
                  name: siteName,
                  url: INIT_URI,
                },
                about: {
                  "@type": "Thing",
                  name: searchtext,
                  description: `Search results for ${searchtext} related to Corporate Social Responsibility`,
                },
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: resultsCount,
                  itemListElement:
                    posts?.data?.slice(0, 10)?.map((post, index) => ({
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
                      name: "Search",
                      item: `${INIT_URI}/search`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: searchtext,
                      item: searchUrl,
                    },
                  ],
                },
              }),
            }}
          />
        )}

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
                target: `${INIT_URI}/search?text={search_term_string}`,
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
              ],
            }),
          }}
        />

        {/* No Results Schema - When no search results */}
        {!hasResults && searchtext && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SearchResultsPage",
                name: `No results for "${searchtext}"`,
                description: `No search results found for "${searchtext}" on CSR Voice`,
                url: searchUrl,
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: 0,
                  itemListElement: [],
                },
              }),
            }}
          />
        )}

        {/* Preload and DNS prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

        {/* Search-specific meta */}
        {searchtext && <meta name="search-query" content={searchtext} />}
        <meta name="search-results-count" content={resultsCount.toString()} />

        {/* Pagination for search results */}
        {posts?.pagination?.has_next && hasResults && (
          <link rel="next" href={`${searchUrl}&page=2`} />
        )}

        {/* Suggest alternative searches via meta */}
        {!hasResults && searchtext && (
          <>
            <meta
              name="suggested-searches"
              content="CSR news, sustainability, ESG reporting, social impact, corporate responsibility"
            />
          </>
        )}
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
              <Typography
                fontSize={{ xs: "28px", md: "38px" }}
                className="font-text-bold"
                sx={{
                  color: "#080808",
                  borderBottom: "3px solid #1877F2",
                  pb: -2,
                  mb: 2,
                }}
              >
                Showing results for :{" "}
                <span style={{ color: "#1877F2" }}>{searchtext}</span>
              </Typography>
              {posts?.data?.length === 0 ? (
                <Box
                  sx={{
                    height: { xs: "20vh", md: "40vh" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    fontSize={{ xs: "20px", md: "22px" }}
                    className="font-text-bold"
                  >
                    No Result Found!
                  </Typography>
                </Box>
              ) : (
                <Box>
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
              )}
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const searchText = query.text || "";
  try {
    // ✅ WP Native Search API
    const postsResponse = await axios.get(
      `${API_URL}/wp-json/custom/v1/search?keyword=${searchText}&page=1&per_page=8`
    );
    // ✅ RSS API
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
        searchtext: searchText,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
        rssItems: [],
        searchtext: searchText,
        error: "Failed to fetch data",
      },
    };
  }
}

export default Search;
