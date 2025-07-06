// src/theme.js
import { createTheme } from "@mui/material/styles";
import {
  orange,
  deepOrange,
  red,
  amber,
  lightBlue,
  green,
  grey,
} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff9000",
      contrastText: "rgba(255,255,255,0.87)",
    },
    secondary: {
      main: "#878787",
    },
    background: {
      paper: "#f5f5f5",
    },
    text: {
      primary: "#ff9100",
      secondary: "#212121",
      white: "#f5f5f5",
    },
    warning: {
      main: "#ffd740",
    },
    grey: {
      50: grey[50],
      100: grey[100],
      200: grey[200],
      300: grey[300],
      400: grey[400],
      500: grey[500],
      600: grey[600],
      700: grey[700],
      800: grey[800],
      900: grey[900],
    },
    divider: "rgba(0, 0, 0, 0.12)",
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      focus: "rgba(0, 0, 0, 0.12)",
    },
  },

  typography: {
    fontFamily: ['"Alegrya"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
    h1: { fontSize: "6rem", fontWeight: 300, lineHeight: 1.167 },
    h2: { fontSize: "3.75rem", fontWeight: 300, lineHeight: 1.2 },
    h3: { fontSize: "3rem", fontWeight: 400, lineHeight: 1.167 },
    h4: { fontSize: "2.125rem", fontWeight: 400, lineHeight: 1.235 },
    h5: { fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.334 },
    h6: { fontSize: "1.25rem", fontWeight: 900, lineHeight: 1.6 },
    subtitle1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.75 },
    subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.57 },
    body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.43 },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: "uppercase",
    },
    caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.66 },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2.66,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {},
  zIndex: {
    mobileStepper: 1000,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default theme;
