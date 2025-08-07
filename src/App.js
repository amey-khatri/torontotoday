import React, { useState, useEffect } from "react";
import "./App.css";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AppBarComponent from "./components/appbar";
import SidebarComponent from "./components/sidebar";
import MapComponent from "./components/map";
import EventDetailsComponent from "./components/eventdetails";

export default function App() {
  const theme = useTheme();
  const toolbarHeight = theme.mixins.toolbar.minHeight;

  // State to hold the fetched events
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State for sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //State for selected event in map
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventdetailsOpen, setEventDetailsOpen] = useState(false);
  const [previousSidebarState, setPreviousSidebarState] = useState(true);

  // const handleMarkerClick = (event) => {
  //   setPreviousSidebarState(sidebarOpen);
  //   setSidebarOpen(false);
  //   setSelectedEvent(event);
  //   setEventDetailsOpen(true);
  // };

  // const handleEventDetailsClose = () => {
  //   setEventDetailsOpen(false);
  //   setSelectedEvent(null);
  //   setSidebarOpen(previousSidebarState);
  // };

  function handleMarkerClick(event) {
    setPreviousSidebarState(sidebarOpen);
    setSidebarOpen(false);
    setSelectedEvent(event);
    setEventDetailsOpen(true);
  }

  function handleEventDetailsClose() {
    setEventDetailsOpen(false);
    setSelectedEvent(null);
    setSidebarOpen(previousSidebarState);
  }

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
      <AppBarComponent />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        p={0}
        gap={0}
        sx={{
          height: `calc(100vh - ${toolbarHeight}px)`,
          overflow: "hidden",
        }}
      >
        <SidebarComponent
          events={events}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onEventClick={handleMarkerClick}
        />
        <EventDetailsComponent
          event={selectedEvent}
          open={eventdetailsOpen}
          onClose={handleEventDetailsClose}
        />
        <MapComponent
          events={events}
          sidebarOpen={sidebarOpen || eventdetailsOpen}
          onMarkerClick={handleMarkerClick}
        />
      </Stack>
    </>
  );
}
