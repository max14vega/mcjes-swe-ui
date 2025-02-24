import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import People from "./Components/People";
import Mastheads from "./Pages/AboutPage";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Submissions from "./Pages/Submissions";
import Testing from "./Pages/Testing"; // Corrected import path to match the directory structure

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
          <Route path="people-page" element={<PeoplePage />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="about" element={<Mastheads />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="testing" element={<Testing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
