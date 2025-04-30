import CodeIcon from '@mui/icons-material/Code';
import ArticleIcon from "@mui/icons-material/Article";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {
  AppBar,
  Box,
  Button,
  Menu,
  Tooltip,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  console.log("Navbar user:", user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:1175px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null); // Clear app state
    localStorage.removeItem("user"); // Clear localStorage
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
    // Close menu when user logs in (or logs out)
    setAnchorEl(null);
  }, [user]);


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
          <Tooltip title="Account settings">
            <IconButton onClick={handleMenuClick}>
              <Avatar sx={{
                bgcolor: "#7180B9", // background color
                color: 'white',// text/icon color
                width: 40,
                height: 40,
                fontWeight: 'bold'}}
              >
                {user?.firstName?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={() => {handleLogout(); }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
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
