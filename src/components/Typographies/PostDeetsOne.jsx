import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { useReadingTime } from "@/hooks/useReadingtime";
import { Typography } from "@mui/material";
import React from "react";

export const PostDeetsOne = ({ item, inImg }) => {
  return (
    <>
      <Typography
        fontSize="13px"
        sx={{ color: inImg ? "#FFFFFF" : "#000000", my: 1 }}
        className="font-normal"
      >
        <Typography
          component={"a"}
          href={`/category/${item?.categories[0]?.slug}`}
          sx={{
            bgcolor: inImg && "#1877F2",
            py: inImg && 0.2,
            px: inImg && 0.5,
            borderRadius: "4px",
            color: inImg ? "#FFFFFF" : "#1877F2",
          }}
          fontSize="13px"
          className="font-bold"
        >
          {useDecodeHtml(item?.categories[0]?.name)}
        </Typography>
        {` • ${useReadingTime(item?.content)}`}
      </Typography>
    </>
  );
};
