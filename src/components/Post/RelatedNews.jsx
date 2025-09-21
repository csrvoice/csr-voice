import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { NewsCard } from "../Cards/NewsCard";
import axios from "axios";
import { API_URL } from "@/constant";

export const RelatedNews = ({ catName }) => {
  const [data, setData] = useState();
  const [size, setSize] = useState(8);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData(undefined);
    setSize(16);
    setHasMore(true);
  }, [catName]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/wp-json/custom/v1/posts/category/${catName}?page=1&per_page=${size}`
      );
      setData(response?.data?.data);
      if (!response?.data?.pagination?.has_next) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    if (size > 8) {
      // Only call when size increases beyond initial value
      getData();
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
      <Box>
        <Container maxWidth="xl">
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              p: 2,
              borderRadius: "7px",
              border: "1.5px solid #e8e8e8",
              mx: { xs: -1, md: 0 },
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
              Related News
            </Typography>
            <Grid container rowGap={{ xs: 1, md: 5 }}>
              {data?.map((item, key) => (
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
    </>
  );
};
