import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ManuscriptsAPI } from "../../Client/API";

const Submissions = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleType, setArticleType] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const manuscriptData = {
      title,
      display_name: articleType,
      abstract,
      text,
      author_first_name: firstName,
      author_last_name: lastName,
      author_email: email,
      action: "submit",
    };

    try {
      const response = await ManuscriptsAPI.addManuscript(manuscriptData, token);
      console.log("Success:", response);
      alert("Manuscript submitted successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setTitle("");
      setAbstract("");
      setArticleType("");
      setText("");
    } catch (error) {
      const msg = error.response?.data || error.message;
      console.error("Submit error:", msg);
      alert("Failed to submit manuscript: " + JSON.stringify(msg, null, 2));
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Our Manuscript Submissions!
        </Typography>
        <Typography variant="body1" paragraph>
          We are thrilled to have the opportunity to review new works from
          writers like you. Whether you’re a seasoned author or a first-time
          writer, we are committed to providing a platform for diverse voices
          and original stories.
        </Typography>
        <Typography variant="body1" paragraph>
          Before submitting your manuscript, please take a moment to review our
          submission guidelines below. These guidelines are designed to ensure
          that your manuscript is processed smoothly and aligns with our
          publication standards.
        </Typography>
        <Typography variant="body1">
          Thank you for considering us as the home for your work. We look
          forward to reading your manuscript and potentially welcoming you to
          our community of authors.
        </Typography>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Title of Your Manuscript"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
              renderValue={
                articleType !== ""
                  ? undefined
                  : () => <span style={{ color: "gray" }}>Select Article Type</span>
              }
            >
              <MenuItem value="" disabled style={{ color: "gray" }}>
                Article Type
              </MenuItem>
              <MenuItem value="Case Studies">Case Studies</MenuItem>
              <MenuItem value="Original Research">Original Research</MenuItem>
              <MenuItem value="Literature Review">Literature Review</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            placeholder="Enter Manuscript Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
          />
          <TextField
            fullWidth
            multiline
            rows={8}
            margin="normal"
            variant="outlined"
            placeholder="Enter Manuscript Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Submit Manuscript
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Submissions;
