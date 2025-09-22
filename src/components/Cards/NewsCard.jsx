import { Box, Card, CardContent } from "@mui/material";
import Image from "next/image";
import React from "react";
import { TypographyTwo } from "../Typographies/TypographyTwo";
import { PostDeetsOne } from "../Typographies/PostDeetsOne";
import { SubheadingTwo } from "../Typographies/SubheadingTwo";

export const NewsCard = ({ news }) => {
  return (
    <>
      <Card variant="outlined" sx={{ border: "none", height: "360px" }}>
        <CardContent
          sx={{
            px: 1.5,
            py: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <a
            href={`/post/${news?.categories[0]?.slug}/${news?.slug}/${news?.id}`}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                height: "200px",
                width: "100%",
                borderRadius: "10px",
                border: "1.5px solid #eeeeee",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "& img": {
                  transition: "transform 0.3s ease",
                },
                "&:hover img": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Image
                src={
                  news?.featured_image === null
                    ? "/images/fallbackTwo.png"
                    : news?.featured_image
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={news?.title}
              />
            </Box>
          </a>

          {/* Post Detials */}
          <PostDeetsOne item={news} />

          {/* Post Title */}
          <TypographyTwo item={news} />

          {/* Post Subheading */}
          <SubheadingTwo item={news} />
        </CardContent>
      </Card>
    </>
  );
};
