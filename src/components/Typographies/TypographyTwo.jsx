import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { Typography } from "@mui/material";
import React from "react";

export const TypographyTwo = ({ item }) => {
  return (
    <>
      <Typography
        component="a"
        href={`/post/${item?.categories[0]?.slug}/${item?.slug}/${item?.id}`}
        fontSize={{ xs: "16px", sm: "18px" }}
        lineHeight={{ xs: "22px", sm: "24px" }}
        className="font-text-bold"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          color: "#000000",
          "&:hover": {
            color: "#00000090",
            cursor: "pointer",
          },
        }}
      >
        {useDecodeHtml(item?.title)}
      </Typography>
    </>
  );
};
