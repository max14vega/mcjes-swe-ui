import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
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
import UpdateManuscriptsPage from "./Pages/UpdateManuscripts/UpdateManuscripts";

function App() {
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <BrowserRouter>
          <Routes>
            {/* Routes wrapped in layout */}
            <Route
              path="/"
              element={
                <Layout user={user} setUser={setUser}>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/admin"
              element={
                <Layout user={user} setUser={setUser}>
                  <AdminPage />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout user={user} setUser={setUser}>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/submissions"
              element={
                <Layout user={user} setUser={setUser}>
                  <Submissions />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout user={user} setUser={setUser}>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout user={user} setUser={setUser}>
                  <Login setUser={setUser}/>
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout user={user} setUser={setUser}>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout user={user} setUser={setUser}>
                  <Profile user={user} setUser={setUser}/>
                </Layout>
              }
            />
            <Route
            path="/manuscripts"
            element={
              <Layout user={user} setUser={setUser}>
                <Manuscripts user={user} />
              </Layout>
            }
          />
            <Route
              path="/update-manuscripts"
              element={
                <Layout user={user} setUser={setUser}>
                  <UpdateManuscriptsPage />
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
