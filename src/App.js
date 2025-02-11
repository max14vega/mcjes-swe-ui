import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import People from "./Components/People";
import Submissions from "./Pages/Submissions";
import Mastheads from "./Pages/AboutPage";

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
                    <Route path="/" element={<Home />} />  
                    <Route path="people" element={<People />} />
                    <Route path="people/:name" element={<PeoplePage />} />
                    <Route path="submissions" element={<Submissions />} /> 
                    <Route path="about" element={<Mastheads />} /> 
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
