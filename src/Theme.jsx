import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#80A4ED', // Light Blue
      contrastText: '#FFFFFF', // White for contrast on primary color
    },
    secondary: {
      main: '#EF8354', // orangish for secondary elements
      contrastText: '#FFFFFF', // White text on secondary color
    },
    background: {
      default: '#F5F5F6', // light grey for general backgrounds
      paper: '#FFFFFF', // White background for elements like cards and dialogs
    },
    info: {
      main: '#26A69A', // Teal shade for info components
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
