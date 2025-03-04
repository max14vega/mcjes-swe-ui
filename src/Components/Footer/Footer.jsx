import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "primary.main",
        p: 7,
        pt: 15,
        textAlign: "center",
        width: "100%",
        mt: 'auto' // This ensures that the footer will move to the bottom
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/" color="inherit">Home</Link><br />
          <Link href="/about" color="inherit">About Us</Link><br />
          <Link href="/contact" color="inherit">Contact Us</Link><br />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Follow Us
          </Typography>
          <IconButton href="https://twitter.com" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://facebook.com" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://linkedin.com" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://instagram.com" color="inherit">
            <InstagramIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            About MCJES Journal
          </Typography>
          <Typography variant="body2">
            MCJES Journal is dedicated to publishing the latest research and insights in the fields of science and engineering. Our mission is to foster knowledge and innovation.
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ mt: 2 }}>
        &copy; {currentYear} MCJES Journal
      </Typography>
    </Box>
  );
};

export default Footer;
