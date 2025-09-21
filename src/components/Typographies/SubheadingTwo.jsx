import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { Typography } from "@mui/material";
import React from "react";

export const SubheadingTwo = ({ item }) => {
  return (
    <>
      <Typography
        fontSize="14px"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          my: 1,
        }}
        className="font-normal"
      >
        {useDecodeHtml(item?.excerpt)}
      </Typography>
    </>
  );
};
