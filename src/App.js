import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AppBarComponent from "./components/appbar";
import SidebarComponent from "./components/sidebar";
import MapComponent from "./components/map";

export default function App() {
  const theme = useTheme();
  const toolbarHeight = theme.mixins.toolbar.minHeight;

  // State to hold the fetched events
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/events/");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading events...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error loading events: {error}</div>;
  }

  return (
    <>
      {/* 1. Your fixed header */}
      <AppBarComponent />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        p={0}
        gap={0}
        sx={{
          height: `calc(100vh - ${toolbarHeight}px)`, // fill exactly the remaining space
          overflow: "hidden",
        }} // Adjust height to account for AppBar
      >
        <SidebarComponent events={events} />
        <MapComponent events={events} />
      </Stack>
    </>
  );
}
