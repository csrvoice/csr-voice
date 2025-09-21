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
import { parseStringPromise } from "xml2js";
import { API_URL } from "@/constant";

const Search = ({ posts, rssItems, searchtext }) => {
  const [paginatedPosts, setPaginatesPosts] = useState();
  const [size, setSize] = useState(16);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset state when category changes
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
