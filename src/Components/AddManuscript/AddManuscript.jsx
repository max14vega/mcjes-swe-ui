import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Box,
  } from "@mui/material";
  import React, { useState } from "react";
  
  const AddManuscript = ({ open, onClose, onSubmit }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [articleType, setArticleType] = useState("");
    const [abstract, setAbstract] = useState("");
    const [text, setText] = useState("");
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
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
  
      onSubmit(manuscriptData);
      onClose();
  
      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setTitle("");
      setArticleType("");
      setAbstract("");
      setText("");
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Add Manuscript</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
              type="email"
            />
            <TextField
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="article-type-label">Article Type</InputLabel>
              <Select
                labelId="article-type-label"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
                label="Article Type"
              >
                <MenuItem value="Case Studies">Case Studies</MenuItem>
                <MenuItem value="Original Research">Original Research</MenuItem>
                <MenuItem value="Literature Review">Literature Review</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              margin="normal"
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              placeholder="Full Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              margin="normal"
              fullWidth
              multiline
              rows={6}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddManuscript;
  