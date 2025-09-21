import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { Typography } from "@mui/material";
import React from "react";

export const TypographyOne = ({ posts }) => {
  return (
    <>
      <Typography
        component="a"
        href={`/post/${posts[0]?.categories[0]?.slug}/${posts[0]?.slug}/${posts[0]?.id}`}
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
