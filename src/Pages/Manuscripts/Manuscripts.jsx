import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ManuscriptsAPI } from "../../Client/API";

const Manuscript = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedManuscript, setSelectedManuscript] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const fetchManuscripts = async () => {
      setLoading(true);
      try {
        const data = await ManuscriptsAPI.getManuscripts();
        setManuscripts(Object.values(data));
        setError(null);
      } catch (error) {
        setError("Failed to fetch manuscripts.");
      } finally {
        setLoading(false);
      }
    };
    fetchManuscripts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [location.search]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (manuscript) => {
    setSelectedManuscript(manuscript);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedManuscript(null);
  };

  const filteredManuscripts = manuscripts.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.title?.toLowerCase().includes(query) ||
      m.abstract?.toLowerCase().includes(query) ||
      `${m.author_first_name || ""} ${m.author_last_name || ""}`.toLowerCase().includes(query)
    );
  });

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: "1rem", height: "fit-content" }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Filter
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Categories
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {["Ecology", "Conservation", "Parasitology", "Genetics", "Taxonomy"].map((cat) => (
                  <Box key={cat} display="flex" alignItems="center">
                    <input type="checkbox" style={{ marginRight: "0.5rem" }} />
                    <Typography variant="body2">{cat}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box display="flex" gap={2} mb={2} alignItems="stretch">
            <TextField
              fullWidth
              label="Search by title or author"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Alert severity="error" style={{ marginBottom: "2rem" }}>
              {error}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={3}>
            {filteredManuscripts.length === 0 ? (
              <Typography variant="body1">No manuscripts match your search.</Typography>
            ) : (
              filteredManuscripts.map((book) => {
                const author = `${book.author_first_name || ""} ${book.author_last_name || ""}`.trim();
                return (
                  <Card
                    elevation={3}
                    key={book._id}
                    style={{ display: "flex", flexDirection: "row", padding: "1rem" }}
                  >
                    <CardContent style={{ flex: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {book.title || "No Title"}
                      </Typography>
                      <Typography variant="subtitle1" component="p" gutterBottom>
                        <strong>Author:</strong> {author || "Unknown Author"}
                      </Typography>
                      <Typography variant="body1" component="p">
                        <strong>Abstract:</strong> {book.abstract || "No abstract available"}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "1rem" }}
                        onClick={() => handleOpen(book)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedManuscript && (
              <>
                <Typography variant="h4" gutterBottom>
                  {selectedManuscript.title || "No Title"}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <strong>Author:</strong>{" "}
                  {`${selectedManuscript.author_first_name || ""} ${selectedManuscript.author_last_name || ""}`.trim() ||
                    "Unknown Author"}
                </Typography>
                <Typography variant="body1">
                  <strong>Abstract:</strong>{" "}
                  {selectedManuscript.abstract || "No abstract available"}
                </Typography>
              </>
            )}
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Manuscript;