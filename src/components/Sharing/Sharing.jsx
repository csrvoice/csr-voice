"use client";

import { Facebook, LinkedIn, WhatsApp, X } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

export const Sharing = ({ slug, text }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <a
          href={`https://api.whatsapp.com/send?text=${text} ${slug}`}
          target="_blank"
        >
          <IconButton
            sx={{
              bgcolor: "#25D366",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#25D366",
              },
            }}
          >
            <WhatsApp sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?url=${slug}&title=${text}`}
          target="_blank"
        >
          <IconButton
            sx={{
              bgcolor: "#0A66C2",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#0A66C2",
              },
            }}
          >
            <LinkedIn sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </a>
        <a
          href={`https://www.facebook.com/sharer.php?u=${slug}`}
          target="_blank"
        >
          <IconButton
            sx={{
              bgcolor: "#1877F2",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#1877F2",
              },
            }}
          >
            <Facebook sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </a>
        <a
          href={`https://twitter.com/share?url=${slug}&text=${text}`}
          target="_blank"
        >
          <IconButton
            sx={{
              bgcolor: "#000000",
              borderRadius: "5px",
              "&:hover": {
                bgcolor: "#000000",
              },
            }}
          >
            <X sx={{ color: "#FFFFFF" }} />
          </IconButton>
        </a>
      </Box>
    </>
  );
};
