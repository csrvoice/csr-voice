import { Box, Container, Typography } from "@mui/material";
import React from "react";

export const AboutUs = () => {
  // ✅ Common style for all paragraphs
  const textStyle = {
    fontSize: { xs: "16px", md: "18px" },
    lineHeight: { xs: "24px", md: "27px" },
  };

  return (
    <Box sx={{ my: { xs: 2, md: 5 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: 2,
            borderRadius: "7px",
            border: "1.5px solid #e8e8e8",
            textAlign: "justify", // ✅ applied once here
          }}
        >
          <Typography
            className="font-bold"
            sx={{ fontSize: { xs: "26px", md: "30px" } }}
          >
            About Us
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexDirection: "column", my: 5 }}>
            <Typography className="font-normal" sx={textStyle}>
              We at the CSR Voice are a group of dedicated journalists, writers,
              investigators and researchers who believe in highlighting every
              action that helps communities and groups to serve as an example
              for more people to help promote the goodness of things.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              We think that every reasonable effort must be appreciated,
              reported and replicated by others so that the chain of examples
              helps promote and preserve this world the way it was intended to
              be my nature.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Our team travels to reach every nook and corner where Corporates
              are involved in CSR activity. Having verified the genuineness of
              projects, we report them as stories for our readers and others
              seeking inspiration.
            </Typography>

            <Typography className="font-normal" sx={textStyle}>
              Our stories and write-ups on the website catalyze inspiration for
              more and more people to come out and do good for the world and its
              habitants, may this be in the form of providing education to
              children, health infrastructure to the unreachable, vocational
              training to the breadwinners, water to the parched earth or
              cleaning up of the environment for all living beings.
            </Typography>

            <Typography className="font-bold" sx={textStyle}>
              This team of committed professionals brings forth things as they
              happen to differentiate between claims and reality.
            </Typography>
          </Box>

          <Typography sx={{ color: "#1877f2" }} className="font-normal">
            Published: 10 September 2018
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
