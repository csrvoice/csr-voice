import React, { useEffect, useState } from "react";

import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import { NewsCard } from "../Cards/NewsCard";
import { API_URL } from "@/constant";
import { HeadingTypography } from "../Typographies/HeadingTypography";

export const Governance = () => {
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCategoryArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/wp-json/custom/v1/posts/category/governance/format/standard?page=1&per_page=2`
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
        <Box sx={{ my: 1 }}>
          <Container maxWidth="xl">
            <Box sx={{ bgcolor: "#FFFFFF", borderRadius: "7px" }}>
              {/* Category Heading */}
              <HeadingTypography title={category?.name} slug={category?.slug} />

              <Grid container gap={{ xs: 2, md: 0 }} sx={{ mt: 2 }}>
                {posts?.map((item, key) => (
                  <Grid item size={{ xs: 12, md: 6 }} key={key}>
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
