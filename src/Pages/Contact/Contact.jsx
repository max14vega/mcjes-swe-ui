import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const ContactPage = () => {
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
    // Process form data here (e.g., send to an API)
    console.log(formData);
    alert("Thank you for your message! We will get back to you soon.");
    // Optionally clear the form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 1 }}>
          <Typography component="p" variant="body1" gutterBottom>
            Your Name
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <Typography component="p" variant="body1" gutterBottom>
            Email Address
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Typography component="p" variant="body1" gutterBottom>
            Message
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ContactPage;
