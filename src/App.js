import "./App.css";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import AppBarComponent from "./components/appbar";
import SidebarComponent from "./components/sidebar";
import MapComponent from "./components/map";

export default function App() {
  const theme = useTheme();
  const toolbarHeight = theme.mixins.toolbar.minHeight; // Get the AppBar height from theme

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
        <SidebarComponent />
        <MapComponent />
      </Stack>
    </>
  );
}
