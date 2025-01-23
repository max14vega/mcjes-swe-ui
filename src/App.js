import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import "./App.css";

import Games from "./Components/Games";
import Navbar from "./Components/Navbar";

function GamePage() {
	const { name } = useParams();
	return <h1>{name}</h1>;
}

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="games" element={<Games />} />
				<Route path="games/:name" element={<GamePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
