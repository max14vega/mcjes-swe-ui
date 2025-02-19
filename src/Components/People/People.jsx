import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Icon,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import theme from "../../Theme";

import { BACKEND_URL } from "../../constants";
import ErrorMessage from "./ErrorMessage";
import PeopleForm from "./Form/PeopleForm";

const PEOPLE_ENDPOINT = `${BACKEND_URL}/people`;

const people = [
  { id: 1, name: "Jaylan Wu", icon: "https://via.placeholder.com/50" },
  { id: 2, name: "Max Vega", icon: "https://via.placeholder.com/50" },
  { id: 3, name: "Saadat Rafin", icon: "https://via.placeholder.com/50" },
  { id: 4, name: "Cheyenne Williams", icon: "https://via.placeholder.com/50" },
  {
    id: 5,
    name: "Eduardo de los Santos",
    icon: "https://via.placeholder.com/50",
  },
  // Add more people here...
];

function Person({ person }) {
  const { name, icon } = person;
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent
          sx={{ display: "flex", alignItems: "center", marginBottom: -1 }}
        >
          <Avatar src={icon} sx={{ marginRight: 2 }} />
          <Typography variant="body1">{name}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

Person.propTypes = {
  person: propTypes.shape({
    name: propTypes.string.isRequired,
    icon: propTypes.string.isRequired,
  }).isRequired,
};

function People() {
  const [error, setError] = useState("");
  const [peopleState, setPeopleState] = useState([]);
  const [addingPerson, setAddingPerson] = useState(false);

  useEffect(() => {
    setPeopleState(people);
  }, []);

  const handleAddPerson = (newPerson) => {
    setPeopleState([...peopleState, newPerson]);
    setAddingPerson(false);
  };

  const handleCancelAddPerson = () => {
    setAddingPerson(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <div>
          <Typography variant="h4" sx={{ marginBottom: 2, marginTop: 2 }}>
            People
          </Typography>
        </div>
        <hr />
        <div>
          <Grid2 container spacing={2}>
            {error && <ErrorMessage message={error} />}
            {addingPerson ? (
              <PeopleForm
                onAddPerson={handleAddPerson}
                onCancelAddPerson={handleCancelAddPerson}
              />
            ) : (
              <Grid2 xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setAddingPerson(true)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: -1,
                    }}
                  >
                    <Avatar AddIcon={AddIcon} sx={{ marginRight: 2 }} />
                    <Typography variant="body1">Add Person</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            )}
            {peopleState.map((person) => (
              <Grid2 key={person.id} xs={12} sm={6} md={4} lg={3}>
                <Person person={person} />
              </Grid2>
            ))}
          </Grid2>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default People;
