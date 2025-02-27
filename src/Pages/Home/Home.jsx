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
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Components/SearchBar";
import Slideshow from "../../Components/Slideshow";

// Sample data for top journals, current works, primary sources, and research articles
const topJournals = [
  {
    "title": "Global Insect Ecology",
    "id": 1,
    "description": "This journal provides a comprehensive look at the ecological roles of insects across the globe, exploring their interactions within ecosystems, effects on plant and animal populations, and responses to environmental changes."
  },
  {
    "title": "Arthropod Conservation Quarterly",
    "id": 2,
    "description": "Focused on the conservation of arthropods, this journal publishes research on habitat preservation, species sustainability, and the impacts of human activity on arthropod populations, offering insights and solutions for conservation efforts."
  },
  {
    "title": "Parasitology and Vector Research",
    "id": 3,
    "description": "Dedicated to studying parasites and their vectors, this journal covers all aspects of parasitology and vector-borne diseases, including pathogen biology, vector ecology, and the development of control methods and treatments."
  }
];

const currentWorks = [
  {
    title: "Latest in Climate Change",
    description:
      "Cutting-edge research and discussions about climate change impacts.",
    imageUrl: "Images/Previews/long-ahh-bug.jpg",
    link: "/current/climate-change",
  },
  {
    title: "Innovations in Entomology",
    description:
      "Explore the forefront of entomology techniques and discoveries.",
    imageUrl: "/Images/Previews/yellow-little-guy-dots.jpg",
    link: "/current/entomology",
  },
];

const primarySources = [
  {
    title: "Classical Texts on Insect Taxonomy",
    imageUrl: "/Images/Previews/blue-ahh-bug.jpg",
    link: "/sources/insect-taxonomy",
    description: "Explore the seminal works that shaped the way we classify and understand insect species around the world."
  },
  {
    title: "Foundational Papers on Pollinator Ecology",
    imageUrl: "/Images/Previews/yellow-little-guy.jpg",
    link: "/sources/pollinator-ecology",
    description: "Key research papers that delve into the ecology of pollinators and their critical roles in ecosystems."
  },
];

const researchArticles = [
  {
    title: "Latest Trends in Pest Control Technologies",
    description: "A comprehensive review of modern methods and innovations in managing pest populations effectively.",
    imageUrl: "/Images/Previews/long-ahh-bug-winged.jpg",
    link: "/articles/pest-control",
  },
  {
    title: "Advancements in Insect Studies",
    description: "A detailed examination of recent breakthroughs in understanding the complex behaviors of insects.",
    imageUrl: "/Images/Previews/yellow-little-guy-dots.jpg",
    link: "/articles/insect-behavior",
  },
];

// Component for displaying cards in various sections
const SectionCard = ({ item }) => (
  <Card
    raised
    sx={{ height: "100%", display: "flex", flexDirection: "column" }}
  >
    <CardMedia
      component="img"
      alt={item.title}
      height="140"
      image={item.imageUrl}
      sx={{ width: "100%" }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h5">{item.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {item.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} to={item.link}>
        Learn More
      </Button>
    </CardActions>
  </Card>
);

const HomePage = () => {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement your search logic here
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
          <Box
            mt={10}
            sx={{ display: "flex", justifyContent: "center", gap: 4 }}
          >
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

        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Top Journals
          </Typography>
          <Grid container spacing={2}>
            {topJournals.map((journal) => (
              <Grid item xs={12} md={4} key={journal.id}>
                <Card elevation={3} sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {journal.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {journal.description}  // This line adds the description
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


        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Current and Relevant Work
          </Typography>
          <Grid container spacing={2}>
            {currentWorks.map((work, index) => (
              <Grid item xs={12} md={6} key={index}>
                <SectionCard item={work} />
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Understanding Bug Behavior
          </Typography>
          <Grid container spacing={2}>
            {primarySources.map((source, index) => (
              <Grid item xs={12} md={6} key={index}>
                <SectionCard item={source} />
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Research Articles
          </Typography>
          <Grid container spacing={2}>
            {researchArticles.map((article, index) => (
              <Grid item xs={12} md={6} key={index}>
                <SectionCard item={article} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default HomePage;
