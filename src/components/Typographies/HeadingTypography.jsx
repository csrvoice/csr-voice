import { Box, Typography } from "@mui/material";
import React from "react";

export const HeadingTypography = ({ title, slug }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
          px: 1.5,
        }}
      >
        <Typography
          fontSize={{ xs: "28px", md: "38px" }}
          className="font-text-bold"
          sx={{ color: "#080808" }}
        >
          {title}
        </Typography>
        {slug && (
          <Typography
            component="a"
            href={`/category/${slug}`}
            fontSize={{ xs: "16px", md: "18px" }}
            className="font-normal"
            sx={{
              color: "#1877F2",
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
          >
            See All
          </Typography>
        )}
      </Box>
    </>
  );
};
