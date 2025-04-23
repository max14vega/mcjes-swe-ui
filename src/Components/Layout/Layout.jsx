import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Layout = ({ children, user, setUser }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar user={user} setUser={setUser} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
