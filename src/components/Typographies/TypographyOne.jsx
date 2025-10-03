import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { useFilteredCategories } from "@/hooks/useFilteredCategories";
import { Typography } from "@mui/material";
import React from "react";

export const TypographyOne = ({ posts }) => {
  const filteredCategory = useFilteredCategories(posts[0]?.categories);
  return (
    <>
      <Typography
        component="a"
        href={`/post/${filteredCategory[0]?.slug}/${posts[0]?.slug}/${posts[0]?.id}`}
        fontSize={{ xs: "20px", md: "26px" }}
        lineHeight={{ xs: "28px", md: "32px" }}
        className="font-text-bold"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          color: "#FFFFFF",
          my: 1,
          "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
          },
        }}
      >
        {useDecodeHtml(posts[0]?.title)}
      </Typography>
    </>
  );
};
