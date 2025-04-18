import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login";
import Manuscripts from "./Pages/Manuscripts";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register";
import Submissions from "./Pages/Submissions";
import AdminPage from "./Pages/Admin/AdminPage";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="manuscripts" element={<Manuscripts />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
