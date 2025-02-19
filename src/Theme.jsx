import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7180B9", // Strong violet-blue
      contrastText: "#FFFFFF", // White for contrast
    },
    secondary: {
      main: "#171738", // Very dark blue for secondary elements
      contrastText: "#FFFFFF", // White text on secondary color
    },
    background: {
      default: "#FFFFFF", // white for general backgrounds
      paper: "#FFFFFF", // White background for elements like cards and dialogs
    },
    info: {
      main: "#3423A6", // Light blue/violet for info components
    },
    action: {
      main: "#DFF3E4", // Greenish tone for action items like buttons
      contrastText: "#000000", // Black text on buttons for better visibility
    },
  },

  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  spacing: 6,
  shape: {
    borderRadius: 20,
  },
});

export default theme;
