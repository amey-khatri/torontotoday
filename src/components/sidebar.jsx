import {
  Drawer,
  Box,
  Toolbar,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  ListItem,
  List,
} from "@mui/material";
import React from "react";
import events from "../data";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useTheme } from "@mui/material/styles";

function EventCard({ event }) {
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
            height="20%"
            src={event.image}
            alt={event.name}
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
                {event.location} {event.date}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}

export default function SidebarComponent({ drawerWidth }) {
  const theme = useTheme();

  return (
    <Box
      flex={1}
      sx={{
        display: { xs: "none", sm: "block" },
        borderRadius: (theme) => theme.shape.borderRadius,
        height: "100%",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            height: "92vh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          },
        }}
      >
        <Box>
          <List>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
