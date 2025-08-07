import React from "react";
import { Box, Drawer, IconButton, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DRAWER_WIDTH = 400;
const IMAGE_HEIGHT = 180; // Fixed height in pixels for the image section

export default function EventDetailsComponent({ event, open, onClose }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        height: "100%",
        position: "relative",
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? DRAWER_WIDTH : 0,
            position: "relative",
            height: "100%",
            boxSizing: "border-box",
            overflow: "hidden", // Changed from auto to hidden for the drawer itself
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            borderLeft: `1px solid ${theme.palette.divider}`,
            backgroundColor: open
              ? theme.palette.background.paper
              : "transparent",
          },
        }}
      >
        {open && event && (
          <Box
            sx={{
              position: "relative",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close button */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 1200,
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    boxShadow: 3,
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Fixed height image container */}
            <Box
              sx={{
                height: IMAGE_HEIGHT,
                minHeight: IMAGE_HEIGHT,
                flexShrink: 0, // Prevents the box from shrinking
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${event?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(5px)",
                  opacity: 0.8,
                  transform: "scale(1.1)",
                  zIndex: 0,
                }}
              />
              <img
                src={event?.image}
                alt={event?.name}
                style={{
                  maxWidth: "93%",
                  maxHeight: "93%",
                  objectFit: "contain",
                  borderRadius: theme.shape.borderRadius,
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </Box>

            {/* Scrollable content area */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto", // Makes this section scrollable
                p: 2,
              }}
            >
              {/* Event details content goes here */}
              <Box>
                <Typography variant="h5" component={"div"}>
                  {event?.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
