import { Box, Container, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        About the Journal
      </Typography>
      <Typography variant="body1" paragraph>
        The <strong>MCJES Journal</strong> is a peer-reviewed publication
        dedicated to advancing the study of insects and their impact on
        ecological, agricultural, medical, and social systems. Our journal
        serves as a platform for entomologists, researchers, and students to
        share innovative findings, theoretical insights, and practical
        applications related to the world of insects.
      </Typography>
      <Typography variant="body1" paragraph>
        We publish original research articles, literature reviews, field
        observations, and manuscripts that explore all aspects of
        entomology—including insect behavior, biodiversity, taxonomy,
        conservation, pest management, vector biology, and insect-human
        interactions.
      </Typography>
      <Typography variant="body1" paragraph>
        MCJES is committed to fostering an inclusive and accessible scientific
        community. We welcome submissions from early-career researchers,
        graduate students, and professionals working across disciplines
        connected to insect science.
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Editorial Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our editorial board believes in the importance of curiosity-driven
          science, field-based observation, and the responsible communication of
          knowledge. We aim to support contributors throughout the publishing
          process with transparent peer review, constructive feedback, and a
          dedication to scientific integrity.
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Areas of Interest
        </Typography>
        <Typography variant="body1" paragraph>
          MCJES publishes work on:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">Insect ecology and behavior</Typography>
          </li>
          <li>
            <Typography variant="body1">Systematics and taxonomy</Typography>
          </li>
          <li>
            <Typography variant="body1">Integrated pest management</Typography>
          </li>
          <li>
            <Typography variant="body1">
              Pollinator health and conservation
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Medical and veterinary entomology
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Insect physiology, genetics, and evolution
            </Typography>
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default About;
