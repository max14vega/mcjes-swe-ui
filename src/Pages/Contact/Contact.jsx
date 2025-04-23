import { Box, Button, Container, TextField, Typography, Paper,InputAdornment, IconButton} from "@mui/material";
import RoomServiceIcon from '@mui/icons-material/RoomService';
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";

const Contact = () => {
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

  //const PaperStyle = { padding: "30px 20px", width: 800, margin: "auto" }; //Adjust Paper Style

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
       <Paper elevation={1} sx={{ p: 8, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
        Contact Us {<RoomServiceIcon sx={{ fontSize: 45 }} />}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" sx={{ mb: 0.1 }}>
            Your Name
          </Typography>
          <TextField
            placeholder="Your Name" // Changed to match the test
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={formData.name}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{ mt: 2, mb: 0.1 }}>
            Email Address
          </Typography>
          <TextField
            placeholder="Email Address" // Changed to match the test
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={formData.email}
            onChange={handleChange}
          />
          <Typography variant="body1" sx={{ mt: 2, mb: 0.1 }}>
            Message
          </Typography>
          <TextField
            placeholder="Message" // Already matches the test
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
     </Paper>
    </Container>
  );
};

export default Contact;
