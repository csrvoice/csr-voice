import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { TypographyOne } from "../Typographies/TypographyOne";
import { TypographyTwo } from "../Typographies/TypographyTwo";
import { SubheadingOne } from "../Typographies/SubheadingOne";
import { PostDeetsOne } from "../Typographies/PostDeetsOne";
import Image from "next/image";
import {
  useFilteredCategories,
  useFilteredStories,
} from "@/hooks/useFilteredCategories";

export const TopContainer = ({ posts, homeLatestStories }) => {
  const filteredCategory = useFilteredCategories(posts[0]?.categories);
  const filteredCategoryTwo = useFilteredStories(homeLatestStories);

  return (
    <Box sx={{ my: { xs: 2, md: 5 } }}>
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
            Latest Stories
          </Typography>
          <Grid container>
            {/* Left Grid */}
            <Grid item size={{ xs: 12, md: 7 }} sx={{ pr: { xs: 0, md: 3 } }}>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: { xs: "400px", md: "600px" },
                  width: "100%",
                  borderRadius: "10px",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  "&:hover img": {
                    transform: "scale(1.08)",
                  },
                }}
              >
                <a
                  href={`/post/${filteredCategory[0]?.slug}/${posts[0]?.slug}/${posts[0]?.id}`}
                >
                  <Image
                    unoptimized
                    src={
                      posts[0]?.featured_image === null
                        ? "/images/fallbackTwo.png"
                        : posts[0]?.featured_image
                    }
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    style={{
                      transition:
                        "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                </a>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    px: { xs: 2, md: 4 },
                    pb: 2,
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
                  {/* Title of the Post */}
                  <TypographyOne posts={posts} />
                  {/* Subheading of the Post */}
                  <SubheadingOne posts={posts} />
                  {/* PoSt Detials */}
                  <PostDeetsOne item={posts[0]} inImg={true} />
                </Box>
              </Box>
            </Grid>
            {/* Right Grid */}
            <Grid item size={{ xs: 12, md: 5 }} sx={{ my: { xs: 2, md: 0 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {homeLatestStories?.slice(0, 6).map((item, key) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      gap: 2,
                      width: "100%",
                      maxWidth: "600px",
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        height: "90px",
                        width: "140px",
                        maxWidth: "150px",
                        borderRadius: "5px",
                        flexShrink: 0,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <a
                        href={`/post/${filteredCategoryTwo[key]?.slug}/${item?.slug}/${item?.id}`}
                      >
                        <Image
                          unoptimized
                          src={
                            item?.featured_image === null
                              ? "/images/fallbackTwo.png"
                              : item?.featured_image
                          }
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          style={{
                            transition:
                              "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                          }}
                        />
                      </a>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/*Post Title */}
                      <TypographyTwo item={item} />
                      {/*Post Details */}
                      <PostDeetsOne item={item} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
