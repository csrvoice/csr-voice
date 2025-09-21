import {
  Box,
  Container,
  Drawer,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { CATMENU, MOBILECAT, SECTORS } from "@/constant";
import { useRouter } from "next/router";
import {
  Close,
  MenuRounded,
  SearchRounded,
  KeyboardArrowDown,
  ExpandMore,
} from "@mui/icons-material";
import { Search } from "../Search/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 400 },
  bgcolor: "background.paper",
  borderRadius: "100px",
  boxShadow: 24,
};

export const Header = () => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openSectorsMenu = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSectorsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSectorsClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{ borderBottom: "1.5px solid #e8e8e8", bgcolor: "#FFFFFF", py: 2 }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <a href="/">
                <Image
                  src={"/images/csr.png"}
                  layout="intrinsic"
                  height={68}
                  width={180}
                />
              </a>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <IconButton
                onClick={() => setModalOpen(true)}
                sx={{ border: "1.5px solid #f8f8f8" }}
              >
                <SearchRounded />
              </IconButton>
              <IconButton
                onClick={() => setOpenDrawer(true)}
                sx={{
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "20%",
                  padding: "5px",
                }}
              >
                <MenuRounded />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2.6,
              }}
            >
              {CATMENU?.map((item, key) => (
                <Box key={key} sx={{ position: "relative" }}>
                  {item?.name === "Sectors" ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleSectorsClick}
                    >
                      <Typography
                        sx={{
                          position: "relative",
                          borderBottom: "none",
                          textDecoration: "none",
                          fontSize: "16px",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: router.asPath === item.link ? "100%" : "0%",
                            height: "3px",
                            backgroundColor: "#1877F2",
                            transition: "width 0.3s ease-in-out",
                          },
                          "&:hover::after": {
                            width: "100%",
                          },
                        }}
                        className={
                          router.asPath === item.link
                            ? "font-bold"
                            : "font-normal"
                        }
                      >
                        {item?.name}
                      </Typography>
                      <KeyboardArrowDown
                        sx={{
                          ml: 0.5,
                          fontSize: "20px",
                          transform: openSectorsMenu
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s ease-in-out",
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography
                      component="a"
                      href={item.link}
                      sx={{
                        fontSize: "16px",
                        position: "relative",
                        borderBottom: "none",
                        textDecoration: "none",
                        pb: 0.3,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: router.asPath === item.link ? "100%" : "0%",
                          height: "3px",
                          backgroundColor: "#1877F2",
                          transition: "width 0.3s ease-in-out",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                      className={
                        router.asPath === item.link
                          ? "font-bold"
                          : "font-normal"
                      }
                    >
                      {item?.name}
                    </Typography>
                  )}
                </Box>
              ))}
              <IconButton onClick={() => setModalOpen(true)}>
                <SearchRounded />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Search modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Box>
      </Modal>
      {/* Sectors Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={openSectorsMenu}
        onClose={handleSectorsClose}
        MenuListProps={{
          "aria-labelledby": "sectors-button",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e8e8e8",
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {SECTORS.map((sector, index) => (
          <MenuItem
            key={index}
            className="font-normal"
            onClick={() => {
              router.push(sector.link);
              handleSectorsClose();
            }}
            sx={{
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "#1877F210",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "transparent",
              },
            }}
          >
            {sector.name}
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        PaperProps={{
          sx: {
            width: "100%",
            overflowX: "hidden",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Box>
              <a href="/">
                <Image
                  src={"/images/csr.png"}
                  layout="intrinsic"
                  height={48}
                  width={132}
                />
              </a>
            </Box>
            <Box sx={{ display: { md: "none" } }}>
              <IconButton
                onClick={() => setOpenDrawer(false)}
                sx={{
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "20%",
                  padding: "5px",
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {MOBILECAT?.map((item, key) => (
              <Box
                key={key}
                component="a"
                href={item.link}
                sx={{
                  borderTop: "1.5px solid #e8e8e8",
                  width: "100%",
                  p: 2,
                  "&::after": {
                    bgcolor: "#1877F230",
                  },
                  "&:hover::after": {
                    bgcolor: "#1877F230",
                  },
                }}
              >
                <Typography
                  component="a"
                  href={item.link}
                  sx={{
                    position: "relative",
                    borderBottom: "none",
                    textDecoration: "none",
                    pb: 0.5,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: router.asPath === item.link ? "100%" : "0%",
                      height: "3px",
                      backgroundColor: "#1877F2",
                      transition: "width 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                  className={
                    router.asPath === item.link ? "font-bold" : "font-normal"
                  }
                >
                  {item?.name}
                </Typography>
              </Box>
            ))}
            <Accordion variant="outlined" sx={{ width: "100%" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography
                  component="a"
                  href="/category/sectors"
                  className="font-normal"
                >
                  Sectors
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {SECTORS.map((sector, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      width: "100%",
                      "&:hover": {
                        backgroundColor: "#1877F210",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <a
                      href={sector?.link}
                      style={{ width: "100%" }}
                      className="font-normal"
                    >
                      {sector.name}
                    </a>
                  </MenuItem>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
