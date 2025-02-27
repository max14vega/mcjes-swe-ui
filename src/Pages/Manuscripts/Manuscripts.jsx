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
} from "@mui/material";
import React, { useState } from "react";

const manuscriptExamples = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austin",
    id: 1,
    description: "blah blah blah",
  },
  {
    title: "Catcher and the Rye",
    author: "J.D. Salinger",
    id: 2,
    description: "blah blah blah",
  },
  {
    title: "One Piece",
    author: "Eichiro Oda",
    id: 3,
    description: "the one piece is real",
  },
];

const Manuscript = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter manuscripts based on the search term
  const filteredManuscripts = manuscriptExamples.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
          {/* Search Bar */}
          <TextField
            fullWidth
            label="Search by title or author"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "2rem" }}
          />

          {/* Manuscript List */}
          <Grid container spacing={3}>
            {filteredManuscripts.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle1" component="p" gutterBottom>
                      <strong>Author:</strong> {book.author}
                    </Typography>
                    <Typography variant="body1" component="p">
                      {book.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "1rem" }}
                      onClick={() => alert(`You clicked ${book.title}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Manuscript;
