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
  
  const EditManuscript = ({ open, onClose, manuscriptData, onSubmit }) => {
    const [form, setForm] = useState({
      manuscript_key: "",
      title: "",
      display_name: "",
      abstract: "",
      text: "",
    });
  
    useEffect(() => {
      if (manuscriptData) {
        setForm({
          manuscript_key: manuscriptData.manuscript_key,
          title: manuscriptData.title,
          display_name: manuscriptData.display_name,
          abstract: manuscriptData.abstract,
          text: manuscriptData.text,
        });
      }
    }, [manuscriptData]);
  
    const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(form);
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
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
              label="Article Type"
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default EditManuscript;