import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Components/SearchBar";
import Slideshow from "../../Components/Slideshow";
import { ManuscriptsAPI } from "../../Client/API";

// Static top journals
const topJournals = [
  {
    id: 1,
    title: "Global Insect Ecology",
    description:
      "This journal provides a comprehensive look at the ecological roles of insects across the globe...",
  },
  {
    id: 2,
    title: "Arthropod Conservation Quarterly",
    description:
      "Focused on the conservation of arthropods... offering insights and solutions for conservation efforts.",
  },
  {
    id: 3,
    title: "Parasitology and Vector Research",
    description:
      "Dedicated to studying parasites and their vectors... including pathogen biology and vector ecology.",
  },
];

const previewImages = [
  "/Images/Previews/long-ahh-bug.jpg",
  "/Images/Previews/yellow-little-guy-dots.jpg",
  "/Images/Previews/blue-ahh-bug.jpg",
  "/Images/Previews/green-little-guy.jpg",
  "/Images/Previews/yellow-little-guy.jpg",
  "/Images/Previews/long-ahh-bug-winged.jpg",
];

const HomePage = () => {
  const [manuscripts, setManuscripts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedManuscript, setSelectedManuscript] = useState(null);

  useEffect(() => {
    const fetchManuscripts = async () => {
      try {
        const data = await ManuscriptsAPI.getManuscripts();
        const list = Object.values(data).slice(0, 6);
        const enriched = list.map((item, index) => ({
          ...item,
          title: item.title || "Untitled Manuscript",
          description: item.abstract || "No abstract provided.",
          imageUrl: previewImages[index % previewImages.length],
        }));
        setManuscripts(enriched);
      } catch (error) {
        console.error("Failed to load manuscripts:", error);
      }
    };

    fetchManuscripts();
  }, []);

  const handleOpen = (manuscript) => {
    setSelectedManuscript(manuscript);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedManuscript(null);
    setOpen(false);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box textAlign="center" mt={5} p={3}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 400 }}>
            Insects Here and Now
          </Typography>
          <Typography variant="h6" color="textSecondary">
            A Platform to Share Authored Works in the Insect World
          </Typography>
          <Box mt={2}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search manuscripts, journals, articles..."
            />
          </Box>
          <Slideshow />
          <Box mt={10} sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <Button
              variant="contained"
              color="action"
              size="large"
              component={Link}
              to="/Submissions"
            >
              Submit a Manuscript
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/manuscripts"
            >
              Browse Manuscripts
            </Button>
          </Box>
        </Box>

        {/* Top Journals */}
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Top Journals
          </Typography>
          <Grid container spacing={3}>
            {topJournals.map((journal) => (
              <Grid item xs={12} md={4} key={journal.id}>
                <Card elevation={3} sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Typography variant="h6">{journal.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {journal.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/journals/${journal.id}`}
                      variant="outlined"
                      color="info"
                    >
                      View More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Current and Relevant Work */}
        <Box sx={{ backgroundColor: "#f9fafb", py: 6, mt: 5 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                display: "inline-block",
                px: 2,
                mb: 4,
              }}
            >
              Current and Relevant Work
            </Typography>
            <Grid container spacing={4}>
              {manuscripts.map((manu, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    raised
                    onClick={() => handleOpen(manu)}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      borderRadius: 3,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={manu.imageUrl || "/Images/Previews/placeholder.jpg"}
                      height="180"
                      alt={manu.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {manu.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {manu.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", px: 5, pb: 2 }}>
                      <Button variant="outlined" color="info">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>

      {/* 🧠 Manuscript Modal */}
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
              borderRadius: 2,
            }}
          >
            {selectedManuscript && (
              <>
                <Typography variant="h4" gutterBottom>
                  {selectedManuscript.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Author:</strong>{" "}
                  {`${selectedManuscript.author_first_name || ""} ${selectedManuscript.author_last_name || ""}`.trim() || "Unknown Author"}
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
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HomePage;
