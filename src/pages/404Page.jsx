import { Layout } from "@/components/Layout/Layout";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <Layout>
        <Container maxWidth="xl">
          <Card variant="outlined">
            <CardContent
              sx={{
                height: "60vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "80px", md: "100px" },
                  color: "#1877f2",
                }}
                className="font-text-bold"
              >
                404
              </Typography>{" "}
              <Typography
                sx={{ fontSize: { xs: "30px", md: "40px" }, mb: 4 }}
                className="font-normal"
              >
                post not found
              </Typography>
              <Button
                onClick={() => router.push("/")}
                sx={{
                  textDecoration: "none",
                  bgcolor: "#1877f2",
                  color: "#FFFFFF",
                  px: 3,
                }}
                className="font-bold"
              >
                Go to Home Page
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Layout>
    </>
  );
};

export default NotFound;
