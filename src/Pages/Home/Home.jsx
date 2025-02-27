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
  { title: "Journal on Software Systems", id: 1 },
  { title: "Journal on AI Research", id: 2 },
  { title: "Journal on Big Data Analytics", id: 3 },
];

const currentWorks = [
  {
    title: "Latest in Climate Change",
    description:
      "Cutting-edge research and discussions about climate change impacts.",
    imageUrl: "/images/current-climate.jpg",
    link: "/current/climate-change",
  },
  {
    title: "Innovations in AI",
    description: "Explore the forefront of artificial intelligence technology.",
    imageUrl: "/images/current-ai.jpg",
    link: "/current/ai",
  },
];

const primarySources = [
  {
    title: "Historical Documents on Software Engineering",
    imageUrl: "/images/historical-se.jpg",
    link: "/sources/software-engineering",
  },
  {
    title: "Foundational Data Science Papers",
    imageUrl: "/images/historical-ds.jpg",
    link: "/sources/data-science",
  },
];

const researchArticles = [
  {
    title: "Review on Big Data Analytics",
    description: "A comprehensive review of the latest trends in big data.",
    imageUrl: "/images/research-bigdata.jpg",
    link: "/articles/big-data",
  },
  {
    title: "Synthesis of AI Ethics",
    description: "A deep dive into the ethical considerations in AI.",
    imageUrl: "/images/research-ai-ethics.jpg",
    link: "/articles/ai-ethics",
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
          <Typography variant="h2" gutterBottom>
            Exploring Made Simple
          </Typography>
          <Typography variant="h6" color="textSecondary">
            A Platform to Share Authored Works
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
                <Card elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">{journal.title}</Typography>
                  <Button
                    component={Link}
                    to={`/journals/${journal.id}`}
                    variant="outlined"
                    color="info"
                  >
                    View More
                  </Button>
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
            Primary Sources
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
