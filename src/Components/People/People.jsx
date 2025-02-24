import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid2,
  Icon,
  Stack,
  ThemeProvider,
} from "@mui/material";
import {
  Box,
  Collapse,
  IconButton,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const rows = [
  createData("Jaylan Wu"),
  createData("Maximiliano Vega"),
  createData("Cheyenne Williams"),
  createData("Eduardo de los Santos"),
  createData("Saadat Rafin"),
];

function createData(fullName, email, roles) {
  return { fullName, email, roles, information: [{}, {}] };
}

const People = () => {
  const [error, setError] = useState("");
  const [peopleState, setPeopleState] = useState([]);
  const [addingPerson, setAddingPerson] = useState(false);

  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     try {
  //       const response = await getPeople();
  //       setPeopleState(response);
  //     } catch (error) {
  //       setError("Error fetching people");
  //     }
  //   };
  //   fetchPeople();
  // }, []);

  const handleAddPerson = (newPerson) => {
    setPeopleState([...peopleState, newPerson]);
    setAddingPerson(false);
  };

  const handleCancelAddPerson = () => {
    setAddingPerson(false);
  };

  return (
    <Stack
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", paddingTop: 5 }}
    >
      {error && <ErrorMessage message={error} />}
      {addingPerson ? (
        <PeopleForm onAddPerson={handleAddPerson} onCancelAddPerson={handleCancelAddPerson}/>
      ) : (
        <Grid2 xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ height: '100%', display: 'flex-row', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setAddingPerson(true)}>
            <CardContent sx={{ padding: 0 }}>
              <AddIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" sx={{ textAlign: 'center' }}>Add Person</Typography>
            </CardContent>
          </Card>
          <Card></Card>
        </Grid2>
      )}
      <hr></hr>
      <Grid2
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <TableContainer component={Paper} sx={{ width: "800%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Roles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={rows.id}>
                  <TableCell scope="row">{row.fullName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.roles}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </Stack>
  );
};

export default People;
