import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const AdvertRect = () => {
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
          <a href="https://shop.snowchildstudio.com/">
            <Image
              src={"/images/ads/adTwo.png"}
              height={100}
              width={900}
              layout="intrinsic"
            />
          </a>
        </Box>
      </Box>
    </>
  );
};
