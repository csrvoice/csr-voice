import React, { useEffect, useState } from "react";

import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import { NewsCard } from "../Cards/NewsCard";
import { API_URL } from "@/constant";
import { HeadingTypography } from "../Typographies/HeadingTypography";

export const Laws = () => {
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCategoryArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/wp-json/custom/v1/posts/category/laws/format/standard?page=1&per_page=4`
      );
      setCategory(response?.data?.category);
      setPosts(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching category articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryArticles();
  }, []);
  return (
    <>
      {!loading && (
        <Box sx={{ my: 3 }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                px: { xs: 1, md: 2 },
                py: 1,
                borderRadius: "7px",
                border: "1.5px solid #e8e8e8",
                mx: { xs: -1, md: 0 },
              }}
            >
              <HeadingTypography title={category?.name} slug={category?.slug} />
              <Grid container>
                {posts?.map((item, key) => (
                  <Grid item size={{ xs: 12, md: 3 }} key={key}>
                    <NewsCard news={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
