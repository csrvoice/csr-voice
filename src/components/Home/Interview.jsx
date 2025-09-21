import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { API_URL } from "@/constant";
import { VideoCont } from "./VideoCont";
import { HeadingTypography } from "../Typographies/HeadingTypography";
import { TypographyOne } from "../Typographies/TypographyOne";
import { SubheadingOne } from "../Typographies/SubheadingOne";
import { PostDeetsOne } from "../Typographies/PostDeetsOne";

export const Interviews = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const fetchCategoryArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/wp-json/custom/v1/posts/category/interview/format/standard?page=1&per_page=2`
      );
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
        <Box sx={{ my: 5 }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: 1,
                px: { xs: 1, md: 1.5 },
                mx: { xs: -1, md: 0 },
              }}
            >
              {/* Category Heading */}
              <HeadingTypography title="Interviews" />
            </Box>
            <Grid container>
              <Grid item size={{ xs: 12, md: 8 }}>
                <a
                  href={`/post/${posts[0]?.categories[0]?.slug}/${posts[0]?.slug}/${posts[0]?.id}`}
                >
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      height: { xs: "450px", md: "600px" },
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <Image
                      src={posts[0]?.featured_image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        pb: 1,
                        px: { xs: 2, md: 4 },
                        background:
                          "linear-gradient(to top, #000000 30%, transparent)",
                        backdropFilter: "blur(1.5px)",
                      }}
                    >
                      <Typography
                        fontSize="12px"
                        sx={{
                          color: "transparent",
                          mt: 2,
                          mb: 1,
                          pointerEvents: "none",
                        }}
                      >
                        4d616e616e
                      </Typography>
                      {/* Post Title */}
                      <TypographyOne posts={posts} />

                      {/* Post Subheading */}
                      <SubheadingOne posts={posts} />

                      {/* Post Details */}
                      <PostDeetsOne item={posts[0]} inImg={true} />
                    </Box>
                  </Box>
                </a>
              </Grid>
              <Grid item size={{ xs: 12, md: 4 }}>
                <VideoCont />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};
