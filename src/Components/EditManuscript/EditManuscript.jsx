import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ManuscriptsAPI } from "../../Client/API";

const displayNameOptions = [
  { value: "Case Studies", label: "Case Studies" },
  { value: "Original Research", label: "Original Research" },
  { value: "Literature Review", label: "Literature Review" },
];

const stateOptions = [
  { value: "SUB", label: "Submitted" },
  { value: "ARF", label: "In Review" },
  { value: "REJ", label: "Rejected" },
  { value: "WIT", label: "Withdrawn" },
];

const EditManuscript = ({ open, onClose, manuscriptData, onDelete }) => {
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
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "display_name",
      "abstract",
      "text",
      "author_first_name",
      "author_last_name",
      "author_email",
    ];

    const missingFields = requiredFields.filter(
      (field) => !form[field] || form[field].trim() === ""
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n${missingFields.join(", ")}`);
      return;
    }

    try {
      const { manuscript_key, state, ...metadata } = form;

      await ManuscriptsAPI.updateManuscript(manuscript_key, metadata);

      // Map from selected state codes to backend actions
      const stateToAction = {
        REJ: "Rejected",
        WIT: "Withdrawn",
        ARF: "Assign Referee",
      };

      const selectedAction = stateToAction[state];

      if (selectedAction && state !== manuscriptData.state) {
        const payload = {
          ...metadata,
          action: selectedAction,
        };
        console.log("Submitting FSM action:", payload);
        await ManuscriptsAPI.updateManuscriptState(manuscript_key, payload);
      }

      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("There was an error updating this manuscript.");
    }
  };

  const handleDelete = () => {
    if (!form.manuscript_key) return;
    if (window.confirm("Are you sure you want to delete this manuscript?")) {
      onDelete(form.manuscript_key);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Manuscript</DialogTitle>
      <DialogContent>
        <form id="edit-manuscript-form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Display Name"
            name="display_name"
            value={form.display_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
            disabled
          >
            {displayNameOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
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
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" form="edit-manuscript-form" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditManuscript;
