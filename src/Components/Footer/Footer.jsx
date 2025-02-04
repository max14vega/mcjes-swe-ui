import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: 'background', 
        color: 'primary.main', 
        p: 3, 
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} MCJES Journal
      </Typography>
    </Box>
  );
};

export default Footer;