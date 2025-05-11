import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ManuscriptsAPI } from "../../Client/API";

const Revisions = ({ user }) => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editManu, setEditManu] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetch = async () => {
        try {
          const all = await ManuscriptsAPI.getManuscriptsByEmail(user.email);
          const revisionWorks = Array.isArray(all)
            ? all.filter((m) => m.state === "Author Revision")
            : [];
          setManuscripts(revisionWorks);
          setError(null); // clear previous error
        } catch (err) {
          if (err?.response?.status === 404) {
            // Treat 404 as "no manuscripts"
            setManuscripts([]);
            setError(null);
          } else {
            console.error("Failed to fetch revision manuscripts", err);
            setError("Could not load manuscripts needing revision.");
          }
        } finally {
          setLoading(false);
        }
      };
    fetch();
  }, [user.email]);

  const handleEditClick = (manuscript) => {
    setEditManu(manuscript);
    setEditText(manuscript.text || "");
  };

  const handleSave = async () => {
    try {
      await ManuscriptsAPI.updateManuscript(editManu.manuscript_key, {
        text: editText,
        state: "Editor Review",
      });
      setManuscripts((prev) =>
        prev.filter(m => m.manuscript_key !== editManu.manuscript_key)
      );
      setEditManu(null);
      setEditText("");
    } catch (error) {
      alert("Failed to submit revision.");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Manuscripts Requiring Your Revisions
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : manuscripts.length === 0 ? (
        <Typography>You currently have no works pending revision.</Typography>
      ) : (
        manuscripts.map((m) => (
          <Card key={m.manuscript_key} style={{ marginBottom: "1rem" }}>
            <CardContent>
              <Typography variant="h6">{m.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Status: {m.state}
              </Typography>
              <Typography variant="body1">{m.abstract}</Typography>
              <Box mt={2}>
                <Button variant="contained" onClick={() => handleEditClick(m)}>
                  Edit Submission
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      {editManu && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Editing: {editManu.title}
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            label="Revised Manuscript Text"
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <Box display="flex" gap={2} mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Submit Revisions
            </Button>
            <Button variant="outlined" onClick={() => setEditManu(null)}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Revisions;
