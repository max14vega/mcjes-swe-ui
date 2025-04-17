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
import React from "react";
import { ManuscriptsAPI } from "../../Client/API";

const Submissions = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [abstract, setAbstract] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [file, setFile] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const manuscriptData = {
      first_name: firstName,
      last_name: lastName,
      email,
      title,
      abstract,
      genre,
      // file upload can be handled separately if backend supports it
    };

    try {
      await ManuscriptsAPI.addManuscript(manuscriptData);
      alert("Manuscript submitted successfully!");
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setTitle("");
      setAbstract("");
      setGenre("");
      setFile(null);
    } catch (error) {
      alert("Failed to submit manuscript.");
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
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              renderValue={
                genre !== ""
                  ? undefined
                  : () => <span style={{ color: "gray" }}>Select Genre</span>
              }
            >
              <MenuItem value="" disabled style={{ color: "gray" }}>
                Select Genre
              </MenuItem>
              <MenuItem value="Case Studies">Case Studies</MenuItem>
              <MenuItem value="Original Research">Original Research</MenuItem>
              <MenuItem value="Review Articles">Review Articles</MenuItem>
              <MenuItem value="Rapid Communications">Rapid Communications</MenuItem>
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
            type="file"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              accept: ".pdf,.doc,.docx",
            }}
            onChange={(e) => setFile(e.target.files[0])}
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