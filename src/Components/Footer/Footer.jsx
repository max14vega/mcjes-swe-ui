import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Email } from "@mui/icons-material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        p: 4,
        mt: 25,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            MCJES Journal
          </Typography>
          <Typography variant="body2">
            Advancing research and scholarly discourse since 2025.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="/about" color="inherit" underline="hover" display="block">About Us</Link>
            <Link href="/submissions" color="inherit" underline="hover" display="block">Submit Article</Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">Contact</Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Connect With Us
          </Typography>
          <Box>
            <IconButton href="mailto:info@mcjes.org" color="inherit">
              <Email />
            </IconButton>
            <IconButton href="https://facebook.com" target="_blank" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="inherit">
              <Instagram />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} MCJES Journal. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
