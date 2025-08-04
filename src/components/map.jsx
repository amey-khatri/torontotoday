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

delete L.Icon.Default.prototype._getIconUrl;

// (b) Point Leaflet at the bundled images:
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
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

export default function MapComponent({ events, sidebarOpen }) {
  const center = [43.6532, -79.3832];
  const zoom = 12;

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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <MapResizeHandler sidebarOpen={sidebarOpen} />

          {events.map((event) => (
            <Marker
              key={event.eventbriteId}
              position={[event.location.latitude, event.location.longitude]}
            >
              <Tooltip
                className="mapPopup"
                direction="top"
                offset={[-15, -30]}
                permanent={false}
                arrow
              >
                <CreateCardPopup event={event} />
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </>
  );
}
