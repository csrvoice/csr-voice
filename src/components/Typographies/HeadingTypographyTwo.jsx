import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { Typography } from "@mui/material";
import React from "react";

export const HeadingTypographyTwo = ({ title }) => {
  return (
    <>
      <Typography
        fontSize={{ xs: "28px", md: "38px" }}
        className="font-text-bold"
        sx={{
          color: "#080808",
          borderBottom: "3px solid #1877F2",
          pb: -2,
          mb: 2,
        }}
      >
        {useDecodeHtml(title)}
      </Typography>
    </>
  );
};
