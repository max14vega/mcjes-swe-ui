// AddText.js
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";


const AddText = ({ open, onClose, onSubmit }) => {
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const textData = {
      key,
      title,
      text,
    };
    onSubmit(textData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Text</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Key"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            margin="normal"
            fullWidth
            multiline
            rows={10}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddText;