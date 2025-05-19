import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ManuscriptsAPI } from "../../Client/API";

const stateOptions = ["SUB", "ARF", "REJ", "WIT"];

const UpdateManuscriptsPage = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchManuscripts = async () => {
      try {
        const data = await ManuscriptsAPI.getManuscripts();
        setManuscripts(Object.values(data));
      } catch (error) {
        console.error("Error fetching manuscripts:", error);
      }
    };

  useEffect(() => {
    fetchManuscripts();
  }, []);

  const handleOpen = (m) => {
    setSelected(m);
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    /*
    try {
      await ManuscriptsAPI.updateManuscript(selected.manuscript_key, selected);
      setManuscripts((prev) =>
        prev.map((m) => (m.manuscript_key === selected.manuscript_key ? selected : m))
      );
      handleClose();
    } catch (err) {
      alert("Failed to update manuscript");
    }
    */
    try {
    await ManuscriptsAPI.updateManuscript(selected.manuscript_key, selected);
    await fetchManuscripts(); // 🔄 First update the table
    handleClose(); // ✅ Then close the modal
  } catch (err) {
    alert("Failed to update manuscript");
  }
  };

  const handleDelete = async (manuscript_key) => {
    try {
      await ManuscriptsAPI.deleteManuscript(manuscript_key);
      setManuscripts((prev) => prev.filter((m) => m.manuscript_key !== manuscript_key));
    } catch (err) {
      alert("Failed to delete manuscript");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Update Manuscripts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>State</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {manuscripts.map((m) => (
              <TableRow key={m.manuscript_key}>
                <TableCell>{m.title}</TableCell>
                <TableCell>{m.author_first_name} {m.author_last_name}</TableCell>
                <TableCell>{m.author_email}</TableCell>
                <TableCell>{m.state}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(m)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(m.manuscript_key)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {selected && (
            <>
              <Typography variant="h6">Edit Manuscript</Typography>
              <TextField
                label="Title"
                value={selected.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <TextField
                label="Display Name"
                value={selected.display_name || ""}
                onChange={(e) => handleChange("display_name", e.target.value)}
              />
              <TextField
                label="Abstract"
                value={selected.abstract || ""}
                multiline
                onChange={(e) => handleChange("abstract", e.target.value)}
              />
              <TextField
                label="Text"
                value={selected.text || ""}
                multiline
                onChange={(e) => handleChange("text", e.target.value)}
              />
              <TextField
                id="outlined-read-only-input"
                label="Author First Name"
                value={selected.author_first_name || ""}
                onChange={(e) => handleChange("author_first_name", e.target.value)}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <TextField
                label="Author Last Name"
                value={selected.author_last_name || ""}
                onChange={(e) => handleChange("author_last_name", e.target.value)}
              />
              <TextField
                label="Author Email"
                value={selected.author_email || ""}
                onChange={(e) => handleChange("author_email", e.target.value)}
              />
              <TextField
                select
                label="State"
                value={selected.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
              >
                {stateOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button onClick={handleClose} color="secondary" variant="outlined">
                  Cancel
                </Button>
                <Button onClick={handleUpdate} variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default UpdateManuscriptsPage;