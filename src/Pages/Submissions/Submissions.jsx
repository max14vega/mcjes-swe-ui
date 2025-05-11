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
import ErrorMessage from "../../Components/ErrorMessage"; 

const Submissions = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleType, setArticleType] = useState("");
  const [manuscriptBody, setManuscriptBody] = useState("");

  const [editingText, setEditingText] = useState(false);
  const [introText, setIntroText] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({}); // field-specific validation errors

  useEffect(() => {
    TextsAPI.getTexts()
      .then((texts) => {
        const textKey = "submission-text";
        setIntroText(texts[textKey]?.text || "");
      })
      .catch((error) => {
        console.error("Error fetching text:", error);
        setError("Failed to load submission introduction text.");
      });
  }, []);

  const handleSaveText = () => {
    TextsAPI.addText({ key: "submission-text", text: introText })
      .then(() => {
        setEditingText(false);
      })
      .catch((error) => {
        console.error("Error updating text:", error);
        setError("Failed to save introduction text.");
      });
  };

  const handleEditText = () => {
    setEditingText(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!title.trim()) newErrors.title = "Title is required";
    if (!articleType) newErrors.articleType = "Article type is required";
    if (!abstract.trim()) newErrors.abstract = "Abstract is required";
    if (!manuscriptBody.trim()) newErrors.manuscriptBody = "Manuscript text is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // clear previous validation errors

    const token = localStorage.getItem("token");

    const manuscriptData = {
      title,
      display_name: articleType,
      abstract,
      text: manuscriptBody,
      author_first_name: firstName,
      author_last_name: lastName,
      author_email: email,
      action: "submit",
    };

    try {
      await ManuscriptsAPI.addManuscript(manuscriptData, token);

      // Clear form after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setTitle("");
      setAbstract("");
      setArticleType("");
      setManuscriptBody("");
      setError(null);
      alert("Manuscript submitted successfully!");
    } catch (error) {
      const msg = error.response?.data || error.message;
      console.error("Submit error:", msg);
      setError("Failed to submit manuscript:\n" + JSON.stringify(msg, null, 2));
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 10 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Our Manuscript Submissions!
        </Typography>

        {error && (
          <Box mt={2}>
            <ErrorMessage message={error} onClose={() => setError(null)} />
          </Box>
        )}

        {editingText ? (
          <>
            <TextField
              multiline
              rows={10}
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              fullWidth
              label="Submission Page Introduction"
              InputLabelProps={{ shrink: true }}
              sx={{ mt: 2 }}
            />
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button variant="contained" onClick={handleSaveText}>
                Save
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="body1" paragraph>{introText}</Typography>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" size="small" onClick={handleEditText}>
                Edit Introduction
              </Button>
            </Box>
          </>
        )}

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} mt={4}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Manuscript Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            required
            error={!!errors.articleType}
          >
            <InputLabel id="genre-label" shrink>Article Type</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={articleType}
              label="Article Type"
              onChange={(e) => setArticleType(e.target.value)}
            >
              <MenuItem value="Case Studies">Case Studies</MenuItem>
              <MenuItem value="Literature Review">Literature Review</MenuItem>
            </Select>
            {errors.articleType && (
              <Typography variant="caption" color="error">
                {errors.articleType}
              </Typography>
            )}
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            label="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            error={!!errors.abstract}
            helperText={errors.abstract}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            multiline
            rows={8}
            margin="normal"
            variant="outlined"
            label="Manuscript Text"
            value={manuscriptBody}
            onChange={(e) => setManuscriptBody(e.target.value)}
            error={!!errors.manuscriptBody}
            helperText={errors.manuscriptBody}
            InputLabelProps={{ shrink: true }}
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
