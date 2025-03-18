import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";

const Contact = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{
      mt: 4,
      p: matches ? 2 : 4,
      bgcolor: 'background.paper',
      boxShadow: 3,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Typography variant="h4" gutterBottom component="h1" color="primary.main" sx={{ mb: 1 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
        We're here to help and answer any questions you might have. We look forward to hearing from you!
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box sx={{ width: '100%', '& .MuiTextField-root': { my: 1 } }}>
          <TextField
            placeholder="Your Name"
            variant="filled"
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={{ input: { color: 'text.primary' } }}
          />
          <TextField
            placeholder="Email Address"
            variant="filled"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ input: { color: 'text.primary' } }}
          />
          <TextField
            placeholder="Message"
            variant="filled"
            required
            fullWidth
            id="message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            sx={{ input: { color: 'text.primary' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, py: 1.5 }}
          >
            Send Message
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Contact;
