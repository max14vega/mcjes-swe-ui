import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const stateOptions = ["SUB", "ARF", "REJ", "WIT"];

const EditManuscript = ({ open, onClose, manuscriptData, onSubmit }) => {
  const [form, setForm] = useState({
    manuscript_key: "",
    title: "",
    display_name: "",
    abstract: "",
    text: "",
    author_first_name: "",
    author_last_name: "",
    author_email: "",
    state: "",
  });

  useEffect(() => {
    if (manuscriptData) {
      setForm({
        manuscript_key: manuscriptData.manuscript_key || "",
        title: manuscriptData.title || "",
        display_name: manuscriptData.display_name || "",
        abstract: manuscriptData.abstract || "",
        text: manuscriptData.text || "",
        author_first_name: manuscriptData.author_first_name || "",
        author_last_name: manuscriptData.author_last_name || "",
        author_email: manuscriptData.author_email || "",
        state: manuscriptData.state || "",
      });
    }
  }, [manuscriptData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);  // Passes entire updated payload
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Manuscript</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Display Name"
            name="display_name"
            value={form.display_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Case Studies">Case Studies</MenuItem>
            <MenuItem value="Original Research">Original Research</MenuItem>
            <MenuItem value="Literature Review">Literature Review</MenuItem>
          </TextField>
          <TextField
            label="Abstract"
            name="abstract"
            value={form.abstract}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Text"
            name="text"
            value={form.text}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            margin="normal"
          />
          <TextField
            label="Author First Name"
            name="author_first_name"
            value={form.author_first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author Last Name"
            name="author_last_name"
            value={form.author_last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author Email"
            name="author_email"
            value={form.author_email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {stateOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditManuscript;