import React from 'react';
import { Box, Typography, Grid, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper', 
        color: 'text.primary', 
        py: 2, 
        mt: 4, 
        borderTop: '1px solid #cccccc' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom>Resources</Typography>
            <Link href="#" color="inherit">About Insects</Link><br />
            <Link href="#" color="inherit">Insect Identification</Link><br />
            <Link href="#" color="inherit">Habitats</Link><br />
            <Link href="#" color="inherit">Photography Tips</Link><br />
            <Link href="#" color="inherit">Submission Guidelines</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom>Community</Typography>
            <Link href="#" color="inherit">Forums</Link><br />
            <Link href="#" color="inherit">Recent Activity</Link><br />
            <Link href="#" color="inherit">Members</Link><br />
            <Link href="#" color="inherit">Groups</Link><br />
            <Link href="#" color="inherit">Events</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" gutterBottom>Help & Support</Typography>
            <Link href="#" color="inherit">FAQ</Link><br />
            <Link href="#" color="inherit">Contact Us</Link><br />
            <Link href="#" color="inherit">Privacy Policy</Link><br />
            <Link href="#" color="inherit">Terms of Use</Link>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 2 }}>
          &copy; {new Date().getFullYear()} Insects Here and Now | All Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
