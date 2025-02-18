import React from 'react';
import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Slideshow from '../../Components/Slideshow';  // Corrected path to go up two levels

const topJournals = [
    { title: "Journal on Software Systems", id: 1 },
    { title: "Journal on AI Research", id: 2 },
    { title: "Journal on Big Data Analytics", id: 3 },
];

const HomePage = () => {
    return (
        <>
            {/* Slideshow Section */}
            <Slideshow />

            <Container maxWidth="md">
                <Box textAlign="center" mt={5} p={3}>
                    <Typography variant="h2" gutterBottom>
                        MCJES JOURNALS
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        A platform to share cutting-edge research in Software Engineering.
                    </Typography>
                    <Box mt={3} sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <Button variant="contained" color="action" size="large" component={Link} to="/Submissions">
                            Submit a Manuscript
                        </Button>
                        <Button variant="contained" color="primary" size="large" component={Link} to="/manuscripts">
                            Browse Manuscripts
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Top Journals Section */}
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Top Journals
                </Typography>
                <Grid container spacing={2}>
                    {topJournals.map((journal) => (
                        <Grid item xs={12} md={4} key={journal.id}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6">{journal.title}</Typography>
                                <Button component={Link} to={`/journals/${journal.id}`} variant="outlined" color="info">
                                    View More
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;
