import { CATMENU, INIT_URI, MOREMENU, SOCIALS } from "@/constant";
import { Facebook, LinkedIn, RssFeed, X, YouTube } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Box
        sx={{
          border: "1.5px solid #e8e8e8",
          bgcolor: "#FFFFFF",
          mt: "50px",
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 5 }}>
          <Grid container sx={{ borderBottom: "1.5px solid #e8e8e8", pb: 3 }}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <a href="/">
                <Image
                  unoptimized
                  src={"/images/csr.png"}
                  layout="intrinsic"
                  height={120}
                  width={220}
                />
              </a>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                  mb: { xs: 5, md: 0 },
                }}
              >
                <a href="https://ne-np.facebook.com/mycsrvoice">
                  <IconButton sx={{ border: "0.9px solid #e8e8e8" }}>
                    <Facebook sx={{ color: "#1877F2" }} />
                  </IconButton>
                </a>
                <a href="https://twitter.com/CsrVoice">
                  <IconButton sx={{ border: "0.9px solid #e8e8e8" }}>
                    <X sx={{ color: "#000000" }} />
                  </IconButton>
                </a>
                <a href="https://www.youtube.com/channel/UCAy0c5dC5yy-wcTxqgujMhA">
                  <IconButton sx={{ border: "0.9px solid #e8e8e8" }}>
                    <YouTube sx={{ color: "#FF0000" }} />
                  </IconButton>
                </a>
                <a href="http://www.linkedin.com/in/csr-voice-049410232">
                  <IconButton sx={{ border: "0.9px solid #e8e8e8" }}>
                    <LinkedIn sx={{ color: "#0A66C2" }} />
                  </IconButton>
                </a>
                <a href={`${INIT_URI}rss.xml`}>
                  <IconButton sx={{ border: "0.9px solid #e8e8e8" }}>
                    <RssFeed sx={{ color: "#666666" }} />
                  </IconButton>
                </a>
              </Box>
            </Grid>
            <Grid
              item
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pr: { xs: 0, md: 4 },
              }}
            >
              <Box>
                <Typography className="font-bold" fontSize="18px">
                  Categories
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 1,
                  }}
                >
                  {CATMENU?.map((item, key) => (
                    <Typography
                      component="a"
                      href={item.link}
                      className="font-normal"
                      key={key}
                      sx={{ width: "fit-content" }}
                    >
                      {item?.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Box>
                <Typography className="font-bold" fontSize="18px">
                  Quick Links
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 1,
                  }}
                >
                  {MOREMENU?.map((item, key) => (
                    <Typography
                      component="a"
                      href={item.link}
                      className="font-normal"
                      key={key}
                      sx={{ width: "fit-content" }}
                      fontSize={"16px"}
                    >
                      {item?.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Typography
              sx={{ fontSize: "14px", color: "#41444B" }}
              className="font-normal"
            >
              © {currentYear} CSR Voice. All Rights Reserved.
            </Typography>
            <Typography
              sx={{ fontSize: "14px", color: "#41444B" }}
              className="font-normal"
            >
              Powdered by ©{" "}
              <Box
                component={"a"}
                href="https://snowchildstudio.com"
                target="_blank"
              >
                Snowchild Studio
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};
