import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport"; // Icon for Contact Us
import HomeIcon from "@mui/icons-material/Home"; // Icon for Home
import InfoIcon from "@mui/icons-material/Info"; // Icon for About
import ScienceIcon from "@mui/icons-material/Science"; // Icon for Testing
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          <Link to="/">
            <img
              src="/Images/Logo/LogoClean.png"
              alt="Logo"
              style={{ height: "70px", marginRight: "25px" }}
            />
          </Link>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            startIcon={<InfoIcon />}
            component={Link}
            to="/about"
          >
            About
          </Button>
          <Button
            color="inherit"
            startIcon={<ContactSupportIcon />}
            component={Link}
            to="/contact"
          >
            Contact Us
          </Button>
          <Button
            color="inherit"
            startIcon={<AdminPanelSettingsIcon />}
            component={Link}
            to="/peoplepage"
          >
            Admin
          </Button>
          <Button // New Testing button
            variant="contained"
            color="action"
            startIcon={<ScienceIcon />}
            component={Link}
            to="/testing"
          >
            Testing
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
            sx={{ marginRight: 1, fontWeight: "bold" }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            sx={{ fontWeight: "bold" }}
          >
            Log In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
