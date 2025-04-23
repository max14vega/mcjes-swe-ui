import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from "@mui/icons-material/Article";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {

  console.log("Navbar user:", user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:1175px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem component={Link} to="/contact">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem component={Link} to="/admin">
          <ListItemIcon>
            <CodeIcon/>
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
        <ListItem component={Link} to="/manuscripts">
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Browse Manuscripts" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to="/" sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/Images/Logo/LogoUpdated.png"
            alt="Logo"
            style={{ height: "70px", marginRight: "25px" }}
          />
        </Link>
        <Box
          sx={{
            flexGrow: 1,
            display: isMobile ? "none" : "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<InfoIcon />}
            component={Link}
            to="/about"
          >
            Masthead
          </Button>
          <Button
            variant="contained"
            startIcon={<ArticleIcon />}
            component={Link}
            to="/manuscripts"
          >
            Manuscripts
          </Button>
          <Button
            variant="contained"
            startIcon={<ContactSupportIcon />}
            component={Link}
            to="/contact"
          >
            Contact Us
          </Button>
          <Button
            variant="contained"
            startIcon={<CodeIcon/>}
            component={Link}
            to="/admin"
          >
            Admin
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
        {user ? (
            <>
          <Button
            variant="contained"
            color="Primary"
            startIcon={<ManageAccountsIcon />}
            component={Link}
            to="/profile"
            sx={{ marginRight: 1, fontWeight: "bold" }}
          >
            {user.firstName}
          </Button>
            </>
            ) : (
            <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HowToRegIcon />}
            component={Link}
            to="/register"
            sx={{ marginRight: 1, fontWeight: "bold" }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            component={Link}
            to="/login"
            sx={{ fontWeight: "bold" }}
          >
            Log In
          </Button>
          </>
          )}
        </Box>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
