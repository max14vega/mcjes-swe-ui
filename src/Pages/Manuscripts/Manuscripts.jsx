import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ManuscriptsAPI } from "../../Client/API";

const Manuscript = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          {/* Static Search Bar */}
          <TextField
            fullWidth
            label="Search by title or author"
            variant="outlined"
            style={{ marginBottom: "2rem" }}
            disabled // Disabled the search box to make it clear it's non-functional
          />

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
              const author = `${book.author_first_name || ""} ${book.author_last_name || ""}`.trim(); // Combine first and last name
              return (
                <Grid item xs={12} sm={6} md={4} key={book._id}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {book.title || "No Title"} {/* For undefined title */}
                      </Typography>
                      <Typography variant="subtitle1" component="p" gutterBottom>
                        <strong>Author:</strong> {author || "Unknown Author"} {/* For undefined author */}
                      </Typography>
                      <Typography variant="body1" component="p">
                        <strong>Abstract:</strong> {book.abstract || "No abstract available"} {/* For undefined abstract */}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "1rem" }}
                        onClick={() => alert(`You clicked ${book.title || "this manuscript"}`)}
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
    </Container>
  );
};

export default Manuscript;