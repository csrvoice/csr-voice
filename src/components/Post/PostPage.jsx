import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { MoreStories } from "./MoreStories";
import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { useReadingTime } from "@/hooks/useReadingtime";
import { Sharing } from "../Sharing/Sharing";
import { INIT_URI } from "@/constant";
import { AdvertSquare } from "../Advertisements/AdvertSquare";
import useDateFormat from "@/hooks/useDateFormat";

export const PostPage = ({ post }) => {
  const slug = `${INIT_URI}/post/${post?.categories[0]?.slug}/${post?.slug}/${post?.id}`;

  return (
    <>
      <Box
        sx={{
          my: { xs: 2, md: 3 },
          mx: { xs: 1, md: 3 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: "7px",
            border: "1.5px solid #e8e8e8",
          }}
        >
          <Box
            sx={{
              ml: { xs: -1, lg: 4 },
              pl: 2,
              py: 2,
            }}
          >
            <Grid container>
              <Grid item size={{ xs: 12, lg: 8.5 }} sx={{}}>
                <Box>
                  <Typography
                    className="font-bold"
                    fontSize={{ xs: "24px", md: "36px" }}
                    lineHeight={{ xs: "32px", md: "43px" }}
                    sx={{ mt: { xs: 0, md: 2 } }}
                  >
                    {useDecodeHtml(post?.title)}
                  </Typography>
                </Box>

                <Box sx={{ my: 1 }}>
                  <Typography
                    className="font-normal"
                    fontSize={{ xs: "16px", md: "22px" }}
                    lineHeight={{ xs: "24px", md: "30px" }}
                  >
                    {useDecodeHtml(post?.excerpt)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: { xs: 0, md: 2 },
                    mb: 2,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    pr: { xs: 0, md: 2, lg: 5 },
                  }}
                >
                  <Typography
                    fontSize="14px"
                    sx={{ color: "#000000", mt: 1, mb: { xs: 2, md: 1 } }}
                    className="font-normal"
                  >
                    <Typography
                      variant="span"
                      sx={{ color: "#1877F2" }}
                      fontSize="14px"
                      className="font-bold"
                    >
                      {useDecodeHtml(post?.categories[0]?.name)}
                    </Typography>
                    {` • ${useReadingTime(post?.content)} • ${useDateFormat(
                      post?.modified
                    )}`}
                  </Typography>
                  <Sharing text={useDecodeHtml(post?.title)} slug={slug} />
                </Box>
                <Box sx={{ pr: { xs: 0, md: 2, lg: 5 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "7px",
                      border: "1px solid #eeeeee",
                      position: "relative",
                      height: { xs: "200px", sm: "400px", md: "490px" },
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      unoptimized
                      src={
                        post?.featured_image === null
                          ? "/images/fallbackTwo.png"
                          : post?.featured_image
                      }
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                  <Box
                    sx={{
                      borderTop: "1.5px solid #e8e8e8",
                      borderBottom: "1.5px solid #e8e8e8",
                      mt: 2,
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: post?.content }}
                      className="post-cont"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    <Typography sx={{ mb: 2 }}>Share this Post on</Typography>
                    <Sharing text={useDecodeHtml(post?.title)} slug={slug} />
                  </Box>
                </Box>
              </Grid>
              {/* Right Container */}
              <Grid
                item
                size={{ xs: 12, lg: 3.5 }}
                sx={{
                  pl: { xs: 0, md: 4 },
                  pt: { xs: 2, md: 0 },
                  mt: { xs: 3 },
                  borderTop: { xs: "1.5px solid #e8e8e8", md: "none" },
                }}
              >
                <MoreStories />
                <AdvertSquare img={"/images/ads/3.png"} />
                <AdvertSquare img={"/images/ads/2.png"} />
                <AdvertSquare img={"/images/ads/1.png"} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};
