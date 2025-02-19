import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { BACKEND_URL } from "../../../constants";

const PEOPLE_ENDPOINT = `${BACKEND_URL}/people`;

function PeopleForm({ visible, cancel, fetchPeople, setError }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeNumber = (event) => {
    setNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    axios
      .post(PEOPLE_ENDPOINT, { name, numPlayers: number })
      .then(fetchPeople)
      .catch(() => {
        setError("There was a problem adding the Person.");
      });
  };

  if (!visible) return null;
  return (
    <Box sx={{ padding: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      <Typography variant="h6">Add Game</Typography>
      <form onSubmit={addPerson}>
        <TextField
          required
          label="Name"
          type="text"
          id="name"
          value={name}
          onChange={changeName}
          sx={{ width: "100%", marginBottom: 2 }}
        />
        <TextField
          required
          label="Number of players"
          type="number"
          id="number-of-players"
          value={number}
          onChange={changeNumber}
          sx={{ width: "100%", marginBottom: 2 }}
        />
        <Button type="button" onClick={cancel} sx={{ marginRight: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}

PeopleForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  fetchPeople: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default PeopleForm;
