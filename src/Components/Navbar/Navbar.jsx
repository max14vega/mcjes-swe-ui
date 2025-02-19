import React from "react";
import { AppBar, Button, Toolbar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';  // Icon for Home
import InfoIcon from '@mui/icons-material/Info';  // Icon for About
import ContactSupportIcon from '@mui/icons-material/ContactSupport';  // Icon for Contact Us

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', padding: '0 10px' }}> 
        <Link to="/">
         <img src="/Images/Logo/LogoClean.png" alt="Logo" style={{ height: '70px', marginRight: '25px' }} />
        </Link>
          <Button color="inherit" startIcon={<HomeIcon />} component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" startIcon={<InfoIcon />} component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" startIcon={<ContactSupportIcon />} component={Link} to="/contact">
            Contact Us
          </Button>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button variant="contained" color="secondary" component={Link} to="/register" sx={{ marginRight: 1, fontWeight: 'bold' }}>
            Register
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/login" sx={{ fontWeight: 'bold' }}>
            Log In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
