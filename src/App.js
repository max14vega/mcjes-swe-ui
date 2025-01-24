import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Navbar from "./Components/Navbar";
import Games from "./Components/People";

function GamePage() {
	const { name } = useParams();
	return <h1>{name}</h1>;
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="games" element={<Games />} />
					<Route path="games/:name" element={<GamePage />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
