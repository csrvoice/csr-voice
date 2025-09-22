import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const AdvertSquare = ({ img }) => {
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
          }}
        >
          {/* <a href="https://snowchildstudio.com/"> */}
          <Image src={img} height={230} width={320} layout="intrinsic" />
          {/* </a> */}
        </Box>
      </Box>
    </>
  );
};
