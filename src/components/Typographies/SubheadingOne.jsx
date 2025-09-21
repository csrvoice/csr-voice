import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { Typography } from "@mui/material";
import React from "react";

export const SubheadingOne = ({ posts }) => {
  return (
    <>
      <Typography
        fontSize={{ xs: "14px", md: "16px" }}
        className="font-normal"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          color: "#e8e8e8",
          my: 1,
        }}
      >
        {useDecodeHtml(posts[0]?.excerpt)}
      </Typography>
    </>
  );
};
