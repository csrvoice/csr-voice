import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { useFilteredStories } from "@/hooks/useFilteredCategories";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Marquee from "react-fast-marquee";

export const TopMarquee = ({ marqueeData }) => {
  const filteredCategoryTwo = useFilteredStories(marqueeData?.data);
  return (
    <>
      <Marquee pauseOnHover>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            bgcolor: "#1877f2",
            py: 0.7,
          }}
        >
          {marqueeData?.data?.map((item, key) => (
            <Typography
              component="a"
              href={`/post/${filteredCategoryTwo[key]?.slug}/${item?.slug}/${item?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal"
              key={key}
              sx={{ color: "#FFFFFF", fontSize: { xs: "12px", md: "16px" } }}
            >
              • {useDecodeHtml(item?.title)}
            </Typography>
          ))}
        </Box>
      </Marquee>
    </>
  );
};
