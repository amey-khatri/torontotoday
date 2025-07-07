import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

// (b) Point Leaflet at the bundled images:
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function CreateCardPopup({ event }) {
  return (
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
          width="120px"
          src={event.image}
          alt={event.name}
        />
        <CardContent
          sx={{
            textAlign: "center",
            paddingX: "10px",
            paddingY: "0px",
            margin: "0px",
          }}
        >
          <Typography
            variant="caption"
            fontSize={"0.9rem"}
            component="p"
            lineHeight={1.4}
            p={0.5}
          >
            <b>{event.name}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function MapComponent({ events }) {
  const center = [43.6532, -79.3832];
  const zoom = 12;

  return (
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

        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.latitude, event.longitude]}
            // icon={CreateImageIcon(event.image)}
          >
            <Popup className="mapPopup" minWidth={170} maxWidth={170}>
              <CreateCardPopup event={event} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
