import React from "react";
import { AppBar, Button, Toolbar, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';  // Icon for Home
import InfoIcon from '@mui/icons-material/Info';  // Icon for About
import AccountCircleIcon from '@mui/icons-material/AccountCircle';  // Icon for Create Account
import ContactSupportIcon from '@mui/icons-material/ContactSupport';  // Icon for Contact Us

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Insert Logo
        </Typography>
        <Button color="inherit" startIcon={<HomeIcon />} component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" startIcon={<InfoIcon />} component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" startIcon={<ContactSupportIcon />} component={Link} to="/contact">
          Contact Us
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
