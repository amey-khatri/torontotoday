import React from "react";
import { Box } from "@mui/material";

export default function MapComponent() {
  return (
    <Box
      flex={3}
      sx={{
        display: { xs: "block" },
        bgcolor: "skyblue",
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      <p>HELLO</p>
    </Box>
  );
}
