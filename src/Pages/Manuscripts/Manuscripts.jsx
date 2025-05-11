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

const Manuscript = ({ user }) => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedManuscript, setSelectedManuscript] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMineOnly, setViewMineOnly] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchManuscripts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data = [];

        if (viewMineOnly && user?.email) {
          try {
            const response = await ManuscriptsAPI.getManuscriptsByEmail(user.email);
            data = Array.isArray(response) ? response : [];
          } catch (err) {
            if (err?.response?.status === 404) {
              data = [];
            } else {
              throw err;
            }
          }
        } else {
          const response = await ManuscriptsAPI.getManuscripts();
          data = Object.values(response || {});
        }

        setManuscripts(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An unexpected error occurred while fetching manuscripts.");
      } finally {
        setLoading(false);
      }
    };

    fetchManuscripts();
  }, [viewMineOnly, user?.email, location.search]);

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

  const handleWithdraw = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this manuscript?")) return;
    try {
      await ManuscriptsAPI.deleteManuscript(id);
      setManuscripts((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      alert("Failed to withdraw the manuscript.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this manuscript?")) return;
    try {
      await ManuscriptsAPI.deleteManuscript(String(id));
      setManuscripts((prev) => prev.filter((m) => m.manuscript_key !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the manuscript.");
    }
  };

  const filteredManuscripts = manuscripts.filter((m) => {
    const query = searchQuery.toLowerCase();
    return (
      m.title?.toLowerCase().includes(query) ||
      m.abstract?.toLowerCase().includes(query) ||
      `${m.author_first_name || ""} ${m.author_last_name || ""}`.toLowerCase().includes(query)
    );
  });

  const displayManuscripts = viewMineOnly && user?.email
    ? filteredManuscripts.filter((m) => m.author_email === user.email)
    : filteredManuscripts;

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
          <Box display="flex" gap={2} mb={2} alignItems="center">
            <TextField
              fullWidth
              label="Search by title or author"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {user?.allRoles?.includes("AU") && !user?.allRoles?.includes("DE") && (
              <Button variant="contained" onClick={() => setViewMineOnly((prev) => !prev)}>
                {viewMineOnly
                  ? "View All Manuscripts"
                  : "View My Author Manuscripts"}
              </Button>
            )}
            {!user?.allRoles?.includes("AU") && user?.allRoles?.includes("DE") && (
              <Button variant="contained" onClick={() => setViewMineOnly((prev) => !prev)}>
                {viewMineOnly
                  ? "View All Manuscripts"
                  : "View My Developer Manuscripts"}
              </Button>
            )}
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          )}
          {error && manuscripts.length === 0 && (
            <Alert severity="error" style={{ marginBottom: "2rem" }}>
              {error}
            </Alert>
          )}

          <Box mb={2}>
            <Typography variant="body2" color="textSecondary">
              Logged in as: {user?.firstName || "Unknown"} ({user?.email || "No email"})<br />
              Role: {user?.role || "No role"} | Role Code: {user?.role_code || "No role code"}<br />
              All Roles: {user?.allRoles?.join(", ") || "None"}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            {displayManuscripts.length === 0 ? (
              <>
                <Typography variant="body1">
                  {viewMineOnly
                    ? "You have not submitted any manuscripts yet. Submit one to get started."
                    : "No manuscripts match your search."}
                </Typography>
                {viewMineOnly && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.location.href = "/submissions"}
                    style={{ marginTop: "1rem", width: "fit-content" }}
                  >
                    Submit Manuscript
                  </Button>
                )}
              </>
            ) : (
              displayManuscripts.map((book) => {
                const author = `${book.author_first_name || ""} ${book.author_last_name || ""}`.trim();
                return (
                  <Card
                    elevation={3}
                    key={book.manuscript_key || book._id}
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
                      <Box mt={2} display="flex" gap={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(book)}
                        >
                          View Details
                        </Button>
                        {user?.email === book.author_email &&
                          book.state === "Submitted" &&
                          !user?.allRoles?.includes("DE") && (
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleWithdraw(book.manuscript_key)}
                            >
                              Withdraw
                            </Button>
                          )}
                        {user?.allRoles?.includes("DE") && (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(book.manuscript_key)}
                          >
                            Remove
                          </Button>
                        )}
                      </Box>
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
