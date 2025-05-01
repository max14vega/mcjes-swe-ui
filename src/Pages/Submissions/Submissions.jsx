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
import React, { useState, useEffect } from "react";
import { ManuscriptsAPI, TextsAPI } from "../../Client/API";

const Submissions = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleType, setArticleType] = useState("");
  const [editingText, setEditingText] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    TextsAPI.getTexts()
      .then((texts) => {
        const textKey = "submission-text"; // Replace with the actual key
        setText(texts[textKey]?.text || "");
      })
      .catch((error) => {
        console.error("Error fetching text:", error);
      });
  }, []);
  
  const handleSaveText = (newText) => {
    TextsAPI.addText({ key: "submission-text", text: newText })
      .then((response) => {
        setText(newText);
        setEditingText(false);
      })
      .catch((error) => {
        console.error("Error updating text:", error);
      });
  };
  
  const handleEditText = () => {
    setEditingText(true);
  };

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
      const response = await ManuscriptsAPI.addManuscript(
        manuscriptData,
        token
      );
      console.log("Success:", response);
      alert("Manuscript submitted successfully!");

      // Clear the form
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
      alert("Failed to submit manuscript:\n" + JSON.stringify(msg, null, 2));
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Our Manuscript Submissions!
        </Typography>
        {editingText ? (
          <div>
            <TextField
              multiline
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
            />
            <Button onClick={() => handleSaveText(text)}>Save</Button>
          </div>
        ) : (
          <div>
            <Typography variant="body1" paragraph>
              {text}
            </Typography>
            <Button onClick={handleEditText}>Edit</Button>
          </div>
        )}

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="example@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Title of Your Manuscript"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel id="genre-label">Article Type</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={articleType}
              label="Article Type"
              onChange={(e) => setArticleType(e.target.value)}
            >
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
            required
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
            required
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
