import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { PlayArrow } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const VideoCard = ({ news }) => {
  return (
    <>
      <Card variant="outlined" sx={{ border: "none", height: "260px" }}>
        <CardContent
          sx={{
            px: 1.5,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "200px",
              width: "100%",
              borderRadius: "10px",
              border: "1.5px solid #eeeeee",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "& img": {
                transition: "transform 0.3s ease",
              },
              "&:hover img": {
                transform: "scale(1.1)",
                cursor: "pointer",
              },
            }}
          >
            {/* Overlay with centered play button */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100,
              }}
            >
              <IconButton
                sx={{
                  bgcolor: "#1877f2",
                  "&:hover": {
                    bgcolor: "#1877f2",
                  },
                }}
              >
                <PlayArrow sx={{ color: "#FFFFFF" }} />
              </IconButton>
            </Box>

            {/* Background Image */}
            <Image
              src={news?.featured_image}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={news?.title}
            />
          </Box>

          <Typography
            fontSize={{ xs: "20px", sm: "20px" }}
            lineHeight="28px"
            className="font-text-bold"
            sx={{
              my: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
              color: "#000000",
              "&:hover": {
                color: "#00000090",
                cursor: "pointer",
              },
            }}
          >
            {useDecodeHtml(news?.title)}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
