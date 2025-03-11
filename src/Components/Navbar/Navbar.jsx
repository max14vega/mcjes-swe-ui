import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArticleIcon from "@mui/icons-material/Article";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import ScienceIcon from "@mui/icons-material/Science";
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button component={Link} to="/peoplepage">
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
        <ListItem button component={Link} to="/testing">
          <ListItemIcon>
            <ScienceIcon />
          </ListItemIcon>
          <ListItemText primary="Testing" />
        </ListItem>
        <ListItem button component={Link} to="/manuscripts">
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
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            variant="contained"
            startIcon={<InfoIcon />}
            component={Link}
            to="/about"
          >
            About
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
            //color="inherit"
            startIcon={<AdminPanelSettingsIcon />}
            component={Link}
            to="/peoplepage"
          >
            Admin
          </Button>
          <Button
            variant="contained"
            startIcon={<ScienceIcon />}
            component={Link}
            to="/testing"
          >
            Testing
          </Button>
          <Button
            variant="contained"
            startIcon={<ArticleIcon />}
            component={Link}
            to="/manuscripts"
          >
            Browse Manuscripts
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
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
