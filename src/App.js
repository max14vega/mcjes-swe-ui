import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./Theme";

import "./App.css";

import Layout from "./Components/Layout";

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
          <Routes>
            {/* Routes wrapped in layout */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <Layout>
                  <AdminPage />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/submissions"
              element={
                <Layout>
                  <Submissions />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
            <Route
              path="/manuscripts"
              element={
                <Layout>
                  <Manuscripts />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
