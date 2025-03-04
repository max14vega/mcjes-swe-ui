import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ScienceIcon from '@mui/icons-material/Science';
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerClose} sx={{ width: 250 }}>
      <List>
        {[
          { text: 'Home', to: '/', icon: <HomeIcon /> },
          { text: 'About', to: '/about', icon: <InfoIcon /> },
          { text: 'Contact Us', to: '/contact', icon: <ContactSupportIcon /> },
          { text: 'Admin', to: '/peoplepage', icon: <AdminPanelSettingsIcon /> },
          { text: 'Testing', to: '/testing', icon: <ScienceIcon /> }
        ].map((item, index) => (
          <ListItem button key={index} component={Link} to={item.to}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
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
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Link to="/">
            <img src="/Images/Logo/LogoUpdated.png" alt="Logo" style={{ height: '70px', marginRight: '25px' }} />
          </Link>
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 10px' }}>
              {[
                { text: 'Home', to: '/', icon: <HomeIcon /> },
                { text: 'About', to: '/about', icon: <InfoIcon /> },
                { text: 'Contact Us', to: '/contact', icon: <ContactSupportIcon /> },
                { text: 'Admin', to: '/peoplepage', icon: <AdminPanelSettingsIcon /> },
                { text: 'Testing', to: '/testing', icon: <ScienceIcon /> }
              ].map((item, index) => (
                <Button
                  key={index} // Unique key for each button
                  color="inherit"
                  startIcon={item.icon}
                  component={Link}
                  to={item.to}
                  variant="text"
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
            sx={{ marginRight: 1, fontWeight: 'bold' }}
          >
            Register
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            sx={{ fontWeight: 'bold' }}
          >
            Log In
          </Button>
        </Box>
      </Toolbar>
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
        >
          {drawer}
        </Drawer>
      )}
    </AppBar>
  );
};

export default Navbar;
