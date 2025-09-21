import { Box } from "@mui/material";
import React from "react";
import { Header } from "./Header/Header";
import Image from "next/image";
import { Footer } from "./Footer/Footer";
import { TopMarquee } from "../Home/TopMarquee";

export const Layout = ({ children, marqueeData }) => {
  return (
    <Box
      sx={{
        m: -1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: -1,
          top: { xs: 300, md: 10 },
          left: -350,
        }}
      >
        <Image
          src="/images/earth.png"
          height={612}
          width={612}
          style={{ opacity: 0.1 }}
          layout="intrinsic"
        />
      </Box>

      <Header />
      <TopMarquee marqueeData={marqueeData} />
      {children}
      <Footer />
    </Box>
  );
};
