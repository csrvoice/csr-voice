import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { SocialStocks } from "./SocialStocks";
import { Governance } from "./Governance";

export const ThirdContainer = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ mx: { xs: -2, md: 0 } }}>
          <Grid container gap={1}>
            <Grid
              item
              size={{ xs: 12, md: 5.96 }}
              sx={{
                bgcolor: "#FFFFFF",
                borderRadius: "7px",
                border: "1.5px solid #e8e8e8",
              }}
            >
              <SocialStocks />
            </Grid>
            <Grid
              item
              size={{ xs: 12, md: 5.96 }}
              sx={{
                bgcolor: "#FFFFFF",
                borderRadius: "7px",
                border: "1.5px solid #e8e8e8",
              }}
            >
              <Governance />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
