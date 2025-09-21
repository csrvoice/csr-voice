import {
  Box,
  Container,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/constant";
import { VideoCard } from "../Cards/VideoCard";
import { useExtractSrc } from "@/hooks/useExtractSrc";
import { useDecodeHtml } from "@/hooks/useDecodeHtml";
import { Close } from "@mui/icons-material";
import { HeadingTypographyTwo } from "../Typographies/HeadingTypographyTwo";

export const VideoCont = () => {
  const isMobile = useMediaQuery("(max-width:500px)");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedVideoContent, setSelectedVideoContent] = useState();

  const [videosData, setVideosData] = useState([]);

  const handleOpen = (data) => {
    setOpen(true);
    setSelectedVideoContent(data);
    const src = useExtractSrc(data?.content);
    setSelectedVideo(src);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: 900 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "12px",
    outline: "none",
  };

  const getData = async () => {
    setLoading(true);
    try {
      const page = 1;
      const format = "Video";
      const videoRes = await axios.get(
        `${API_URL}/wp-json/custom/v1/posts/format/${format}?page=${page}&per_page=2`
      );
      setVideosData(videoRes?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {!loading && (
        <Box sx={{ mx: { xs: -1, md: 0 }, mt: { xs: 4, md: 0 } }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                px: { xs: 1, md: 2 },
                py: 1,
                borderRadius: "7px",
                border: "1.5px solid #e8e8e8",
                mx: { xs: -1, md: 0 },
              }}
            >
              <Box
                sx={{
                  px: 1.5,
                }}
              >
                {/* Category Title */}
                <HeadingTypographyTwo title="Videos" />
              </Box>
              <Grid container>
                {videosData?.map((item, key) => (
                  <Grid
                    item
                    size={{ xs: 12 }}
                    key={key}
                    onClick={() => handleOpen(item)}
                  >
                    <VideoCard news={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography className="font-text-bold" fontSize={"20px"}>
              {useDecodeHtml(selectedVideoContent?.title)}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <iframe
            width="100%"
            height={isMobile ? "300px" : "500"}
            style={{ borderRadius: "10px" }}
            src={
              selectedVideo?.includes("?")
                ? `${selectedVideo}&autoplay=1`
                : `${selectedVideo}?autoplay=1`
            }
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </>
  );
};
