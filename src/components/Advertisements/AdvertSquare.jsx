import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const AdvertSquare = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 5,
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            width: { xs: "320px", md: "300px" },
            bgcolor: "#e8e8e8",
            borderRadius: "7px",
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "12px", my: 1.5, color: "#00000070" }}
          >
            Advertisement
          </Typography>
          <a href="https://snowchildstudio.com/">
            <Image
              src={"/images/ads/adOne.png"}
              height={230}
              width={320}
              layout="intrinsic"
            />
          </a>
        </Box>
      </Box>
    </>
  );
};
