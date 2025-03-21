import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Mastheads from "./Pages/AboutPage";
import Contact from "./Pages/Contact";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login";
import Manuscripts from "./Pages/Manuscripts";
import PeoplePage from "./Pages/People/PeoplePage";
import Register from "./Pages/Register";
import Submissions from "./Pages/Submissions";
import Testing from "./Pages/Testing";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="peoplepage" element={<PeoplePage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="about" element={<Mastheads />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="testing" element={<Testing />} />
            <Route path="manuscripts" element={<Manuscripts />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
