import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#907ad6",
			light: "#9b87da",
			dark: "#816dc0",
		},
		secondary: {
			main: "#f50057",
			light: "#ff4081",
			dark: "#e91e63",
		},
		background: {
			default: "#f7f7f7",
			paper: "#fff",
		},
		text: {
			primary: "#333",
			secondary: "#666",
		},
	},
	typography: {
		fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
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
