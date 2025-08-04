import React from "react";
import { Box, Drawer, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DRAWER_WIDTH = 400;

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
            overflow: open ? "auto" : "hidden",
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
        {open && (
          <Box sx={{ height: "100%", position: "relative" }}>
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
                  width: 40,
                  height: 40,
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    boxShadow: 3,
                  },
                }}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>

            {/* Event details content will go here */}
            <Box sx={{ p: 2, pt: 8 }}>
              {/* Placeholder for event details */}
              Event details for: {event?.name}
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
