import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import People from "./Components/People";
import Submissions from "./Components/Submissions";

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
                    <Route path="/" element={<Home />} />  {/* Home page route */}
                    <Route path="people" element={<People />} />
                    <Route path="people/:name" element={<PeoplePage />} />
                    <Route path="/submissions" element={<Submissions />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
