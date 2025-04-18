import { PeopleAPI, RolesAPI } from "../../Client/API";
import React, { useState, useEffect } from "react";
import {Grid2, Typography, Container} from "@mui/material";

const About = () => {
  const [people, setPeople] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await PeopleAPI.getPeople();
        setPeople(response);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await RolesAPI.getRolesConversion();
        setRoles(response);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchPeople();
    fetchRoles();
  }, []);

  const renderPeople = () => {
    if (!people || !roles) return null;
  
    const mastheadRoles = roles.filter((role) => role.is_masthead);
    const sortedRoles = mastheadRoles.sort((a, b) => {
      const roleOrder = {
        'ME': 0,
        'CE': 1,
        'ED': 2,
      };
      return roleOrder[a.role_code] - roleOrder[b.role_code];
    });
  
    return (
      <Grid2 container spacing={2} direction="column">
        {sortedRoles.map((role) => (
          <Grid2 item="true" key={role.role_code}>
            <Typography variant="h5">{role.role}</Typography>
            {Object.values(people).filter((person) => person.roles.includes(role.role_code)).map((person, index) => (
              <Typography key={index} variant="body1">
                {person.first_name} {person.last_name}, <em>{person.affiliation}</em>
              </Typography>
            ))}
          </Grid2>
        ))}
      </Grid2>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        About the Journal
      </Typography>
      <Typography variant="body1" paragraph>
        The MCJES Journal is a peer-reviewed publication dedicated to advancing the study of insects and their impact on ecological, agricultural, medical, and social systems.
      </Typography>
      <Typography variant="body1" paragraph>
        Our journal serves as a platform for entomologists, researchers, and students to share innovative findings, theoretical insights, and practical applications related to the world of insects.
      </Typography>
      <hr></hr>
      {renderPeople()}
    </Container>
  );
};

export default About;