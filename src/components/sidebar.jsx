import React from "react";
import {
  Drawer,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  ListItem,
  List,
  IconButton,
  Divider,
} from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";

function EventCard({ event }) {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <ListItem>
      <Card
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: (theme) => theme.shape.borderRadius,
          boxShadow: 1,
          flexGrow: 1,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src={event.image}
            alt={event.name}
            sx={{
              objectFit: "cover",
            }}
          />
          <CardContent>
            <Typography variant="h6" fontSize={"1rem"} component="div">
              {event.name}
            </Typography>

            <Box
              component="div"
              sx={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                <AccessTimeFilledIcon
                  fontSize="inherit"
                  sx={{
                    verticalAlign: "middle",
                    marginRight: "4px",
                    fontSize: "0.875rem",
                  }}
                />
                {event.venueName} - {formatDateTime(event.startTime)}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}

const DRAWER_WIDTH = 350;
const COLLAPSED_WIDTH = 0;

export default function SidebarComponent({ events, open = true, onToggle }) {
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
        sx={{
          width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            position: "relative",
            height: "100%",
            boxSizing: "border-box",
            overflow: open ? "auto" : "hidden",
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: open
              ? theme.palette.background.paper
              : "transparent",
          },
        }}
      >
        {/* Content - only show when open */}
        {open && (
          <Box sx={{ height: "100%" }}>
            <List>
              {events.map((event) => (
                <EventCard key={event.eventbriteId} event={event} />
              ))}
            </List>
          </Box>
        )}
      </Drawer>

      {/* Toggle button - positioned outside the drawer */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: open ? DRAWER_WIDTH - 24 : -5,
          transform: "translateY(-50%)",
          zIndex: 1200,
          transition: theme.transitions.create(["left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <IconButton
          onClick={onToggle}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "50%",
            width: open ? 40 : 36,
            height: open ? 40 : 36,
            boxShadow: 2,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              boxShadow: 3,
            },
          }}
        >
          {open ? (
            <ChevronLeftIcon fontSize="medium" />
          ) : (
            <ChevronRightIcon fontSize="medium" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
