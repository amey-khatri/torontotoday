import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  GlobalStyles,
} from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import theme from "../theme";

// MUI Global Styles for seamless tooltip
const tooltipGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      ".leaflet-tooltip.mapPopup": {
        background: "transparent !important",
        border: "none !important",
        boxShadow: "none !important",
        padding: "0 !important",
        margin: "0 !important",
      },
      ".leaflet-tooltip.mapPopup::before": {
        borderTopColor: `${theme.palette.background.paper} !important`,
        borderLeftColor: "transparent !important",
        borderRightColor: "transparent !important",
        borderBottomColor: "transparent !important",
      },
    })}
  />
);

const scaleFactor = 1.2; // Scale factor for the larger icon

// Define custom icons for regular and selected markers
const defaultIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25 * scaleFactor, 41 * scaleFactor], // 40% larger
  iconAnchor: [12 * scaleFactor, 41 * scaleFactor], // Adjusted anchor point
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function CreateCardPopup({ event }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
      }}
    >
      <Card
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: (theme) => theme.shape.borderRadius,
          boxShadow: 2,
          flexGrow: 1,
          width: 200,
          height: 150,
        }}
      >
        <CardActionArea sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            height="120"
            width="200"
            src={event.image}
            alt={event.name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent
            sx={{
              textAlign: "center",
              paddingX: "10px",
              paddingY: "8px",
              margin: "0px",
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="p"
              fontSize="0.8rem"
              lineHeight={1.2}
              fontWeight={theme.typography.fontWeightBold}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {event.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

// Component to handle map resize
function MapResizeHandler({ sidebarOpen }) {
  const map = useMap();

  useEffect(() => {
    // Small delay to ensure the sidebar animation is complete
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => clearTimeout(timer);
  }, [sidebarOpen, map]);

  return null;
}

// Add this new component after MapResizeHandler
function MapEventFocusHandler({ selectedEvent }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEvent) {
      const position = [
        selectedEvent.location.latitude,
        selectedEvent.location.longitude,
      ];

      map.setView(position, 14, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [selectedEvent, map]);

  return null;
}

function ClickableMarker({ event, position, onMarkerClick, isSelected }) {
  const map = useMap();

  const handleClick = () => {
    onMarkerClick(event);
  };

  return (
    <Marker
      position={position}
      eventHandlers={{
        click: handleClick,
      }}
      icon={isSelected ? selectedIcon : defaultIcon}
      zIndexOffset={isSelected ? 1000 : 0} // Ensure the selected marker is on top
    >
      <Tooltip
        className="mapPopup"
        direction="top"
        offset={isSelected ? [50, -80] : [0, -55]}
        permanent={false}
        arrow
      >
        <CreateCardPopup event={event} />
      </Tooltip>
    </Marker>
  );
}

export default function MapComponent({
  events,
  sidebarOpen,
  onMarkerClick,
  selectedEvent,
}) {
  const center = [43.6532, -79.3832];
  const zoom = 12;

  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      {tooltipGlobalStyles}
      <Box
        flex={3}
        sx={{
          display: { xs: "block" },
          bgcolor: "skyblue",
        }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <MapResizeHandler sidebarOpen={sidebarOpen} />
          <MapEventFocusHandler selectedEvent={selectedEvent} />

          {events.map((event) => (
            <ClickableMarker
              key={event.eventbriteId}
              event={event}
              position={[event.location.latitude, event.location.longitude]}
              onMarkerClick={onMarkerClick}
              isSelected={
                selectedEvent &&
                selectedEvent.eventbriteId === event.eventbriteId
              }
            />
          ))}
        </MapContainer>
      </Box>
    </>
  );
}
