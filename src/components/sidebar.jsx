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
  GlobalStyles,
} from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import { useMap } from "react-leaflet";

function EventCard({ event, onEventClick }) {
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
    <ListItem sx={{ paddingRight: 0 }}>
      <Card
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: (theme) => theme.shape.borderRadius,
          boxShadow: 1,
          flexGrow: 1,
        }}
      >
        <CardActionArea onClick={() => onEventClick(event)}>
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

const DRAWER_WIDTH = 400;
const COLLAPSED_WIDTH = 0;

function ToggleSidebarButton({ open, onToggle, DRAWER_WIDTH }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: open ? DRAWER_WIDTH - 2 : -5,
        transform: "translateY(-50%)",
        zIndex: 800,
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
          borderRadius: "20%",
          width: open ? 22 : 22,
          height: open ? 50 : 50,
          boxShadow: 2,
          "&:hover": {
            backgroundColor: theme.palette.custom.hover,
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
  );
}

function ScrollableEventList({ events, open, drawerWidth, onEventClick }) {
  const scrollRef = React.useRef(null);
  return (
    <Box
      ref={scrollRef}
      sx={{
        height: "100%",
        width: DRAWER_WIDTH, // Always full width
        position: open ? "relative" : "absolute",
        left: 0,
        overflow: "auto", // Always allow scrolling
        visibility: open ? "visible" : "hidden",
      }}
    >
      <List>
        {events.map((event) => (
          <EventCard
            key={event.eventbriteId}
            event={event}
            onEventClick={onEventClick}
          />
        ))}
      </List>
    </Box>
  );
}

function CustomScrollbarStyles() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background: theme.palette.background.paper,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.action.hover,
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        // Firefox
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.palette.text.secondary} ${theme.palette.background.paper}`,
        },
      }}
    />
  );
}

export default function SidebarComponent({
  events,
  open = true,
  onToggle,
  onEventClick,
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        height: "100%",
        position: "relative",
      }}
    >
      <CustomScrollbarStyles />
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
        {/* Always render content but with absolute positioning to maintain state */}
        <ScrollableEventList
          events={events}
          open={open}
          drawerWidth={DRAWER_WIDTH}
          onEventClick={onEventClick}
        />
      </Drawer>

      {/* Toggle button - positioned outside the drawer */}
      <ToggleSidebarButton
        open={open}
        onToggle={onToggle}
        DRAWER_WIDTH={DRAWER_WIDTH}
      />
    </Box>
  );
}
