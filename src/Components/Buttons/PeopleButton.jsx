import { Alert, Button, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { PeopleAPI } from "../../Client/API";

const PeopleButton = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchPeople = async () => {
    try {
      console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
      const data = await PeopleAPI.getPeople();
      setPeople(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch people.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button variant="contained" color="primary" onClick={handleFetchPeople}>
        Fetch People
      </Button>

      {error && (
        <Alert severity="error" style={{ marginTop: "10px" }}>
          {error}
        </Alert>
      )}
    </div>
  );
};

export default PeopleButton;
