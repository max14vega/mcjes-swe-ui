// EditText.js
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const EditText = ({ open, onClose, textData, onSubmit }) => { 

  const [title, setTitle] = useState(textData.title);
  const [text, setText] = useState(textData.text);

  useEffect(() => {
    setTitle(textData.title);
    setText(textData.text);
  }, [textData]);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    const updatedTextData = {
      key: textData.key,
      title,
      text,
    };
    console.log(updatedTextData);
    onSubmit(updatedTextData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Text</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Key"
            value={textData.key}
            margin="normal"
            fullWidth
            disabled
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditText;