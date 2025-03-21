import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ManuscriptsAPI } from "../../Client/API";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon
import { Link } from "react-router-dom"; // Import Link for navigation

const Manuscript = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedManuscript, setSelectedManuscript] = useState(null); // State to store the selected manuscript
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch manuscripts
  useEffect(() => {
    const fetchManuscripts = async () => {
      setLoading(true);
      try {
        const data = await ManuscriptsAPI.getManuscripts();
        setManuscripts(Object.values(data));
        setError(null);
      } catch (error) {
        console.error("Failed to fetch manuscripts:", error);
        setError("Failed to fetch manuscripts.");
      } finally {
        setLoading(false);
      }
    };

    fetchManuscripts();
  }, []);

  // Function to open the modal with manuscript details
  const handleViewDetails = (book) => {
    setSelectedManuscript(book);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedManuscript(null);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            style={{ padding: "1rem", height: "fit-content" }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Filter
            </Typography>
            {/* Add filter options here later */}
            <Typography variant="body2" color="textSecondary">
              (Filter options will go here)
            </Typography>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Search Bar and Submit Manuscript Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginBottom: "2rem",
            }}
          >
            {/* Static Search Bar */}
            <TextField
              fullWidth
              label="Search by title or author"
              variant="outlined"
              disabled // Disabled the search box to make it clear it's non-functional
            />

            {/* Submit Manuscript Button */}
            <Button
              variant="contained"
              color="action" // Match the color used on the Home page
              component={Link}
              to="/Submissions"
              sx={{
                minWidth: "200px", // Set a minimum width for the button
                whiteSpace: "nowrap", // Prevent text wrapping
                padding: "10px 20px", // Add padding for better appearance
              }}
            >
              Submit Manuscript
            </Button>
          </Box>

          {/* Loading and Error Handling */}
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

          {/* Manuscript List */}
          <Grid container spacing={3}>
            {manuscripts.map((book) => {
              const author =
                `${book.author_first_name || ""} ${book.author_last_name || ""}`.trim(); // Combine first and last name
              return (
                <Grid item xs={12} sm={6} md={4} key={book._id}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {book.title || "No Title"} {/* For undefined title */}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="p"
                        gutterBottom
                      >
                        <strong>Author:</strong> {author || "Unknown Author"}{" "}
                        {/* For undefined author */}
                      </Typography>
                      <Typography variant="body1" component="p">
                        <strong>Abstract:</strong>{" "}
                        {book.abstract || "No abstract available"}{" "}
                        {/* For undefined abstract */}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "1rem" }}
                        onClick={() => handleViewDetails(book)} // Open modal on click
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>

      {/* Modal for Manuscript Details */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="manuscript-details-modal"
        aria-describedby="manuscript-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* Close Button (X icon) */}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Modal Content */}
          {selectedManuscript && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                {selectedManuscript.title || "No Title"}
              </Typography>
              <Typography variant="subtitle1" component="p" gutterBottom>
                <strong>Author:</strong>{" "}
                {`${selectedManuscript.author_first_name || ""} ${
                  selectedManuscript.author_last_name || ""
                }`.trim() || "Unknown Author"}
              </Typography>
              <Typography variant="body1" component="p">
                <strong>Abstract:</strong>{" "}
                {selectedManuscript.abstract || "No abstract available"}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Manuscript;