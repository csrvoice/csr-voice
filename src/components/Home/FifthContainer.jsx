import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { CategoryContainer } from "./CategoryContainer";

export const FifthContainer = () => {
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
              <CategoryContainer title="Laws" slug="laws" catSlug="home-laws" />
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
              <CategoryContainer
                title="Sustainable World"
                slug="sustainable-world"
                catSlug="home-sustainable-world"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
