import { NewsCard } from "@/components/Cards/NewsCard";
import { Layout } from "@/components/Layout/Layout";
import { HeadingTypographyTwo } from "@/components/Typographies/HeadingTypographyTwo";
import { API_URL } from "@/constant";
import { Button, CircularProgress, Container } from "@mui/material";
import { Box, Grid } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { parseStringPromise } from "xml2js";

const Category = ({ posts, rssItems, category }) => {
  const [paginatedPosts, setPaginatesPosts] = useState();
  const [size, setSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
    // Checks if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 1200 &&
      !loading &&
      hasMore
    ) {
      setSize((prevSize) => prevSize + 8);
    }
  };

  // Trigger getPaginatedPosts when size changes (for pagination)
  useEffect(() => {
    if (size > 16) {
      // Only call when size increases beyond initial value
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
