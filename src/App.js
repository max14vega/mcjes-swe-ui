import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Navbar from "./Components/Navbar";
import People from "./Components/People";
import Footer from "./Components/Footer";

function PeoplePage() {
	const { name } = useParams();
	return <h1>{name}</h1>;
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="people" element={<People />} />
					<Route path="people/:name" element={<PeoplePage />} />
				</Routes>
			</BrowserRouter>

			<Footer />
		</ThemeProvider>
	);
}

export default App;
