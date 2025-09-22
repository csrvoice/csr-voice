import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const AdvertRect = ({ img }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          my: 5,
        }}
      >
        <Typography
          textAlign={"center"}
          sx={{ fontSize: "12px", my: 1.5, color: "#00000070" }}
        >
          Advertisement
        </Typography>
        {/* <a href="https://shop.snowchildstudio.com/"> */}
        <Image src={img} height={100} width={900} layout="intrinsic" />
        {/* </a> */}
      </Box>
    </>
  );
};
