import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Container,
  Grid2,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PeopleAPI } from "../../Client/API";
import AddPerson from "../../Components/AddPerson/AddPerson";
import EditPerson from "../../Components/EditPerson/EditPerson";
import SearchBar from "../../Components/SearchBar/SearchBar";

const PeoplePage = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeople = Object.keys(data).filter((email) => {
    const person = data[email];
    const fullName = `${person.first_name} ${person.last_name}`.toLowerCase();
    const affiliation = person.affiliation?.toLowerCase() || "";
    const roles = person.roles?.join(" ").toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return (
      fullName.includes(query) ||
      email.toLowerCase().includes(query) ||
      affiliation.includes(query) ||
      roles.includes(query)
    );
  });

  const fetchData = () => {
    PeopleAPI.getPeople()
      .then((jsonData) => {
        setData(jsonData);
        setError(null);
      })
      .catch((error) => {
        setError(`Error·fetching·people:${error.message}`);
      });
  };

  const handleDelete = (email) => {
    PeopleAPI.deletePeople(email)
      .then(() => {
        const updatedData = { ...data };
        delete updatedData[email];
        setData(updatedData);
      })
      .catch((error) => {
        setError(`Error·deleting·person:${error.message}`);
      });
  };

  const handleEditClick = (person) => {
    console.log("Selected person for editing:", person);
    setPersonToEdit(person);
    setOpenEditDialog(true);
  };

  const handleUpdatePerson = (updatedPerson) => {
    PeopleAPI.updatePeople(updatedPerson)
      .then(() => {
        fetchData();
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const handleAddPerson = (person) => {
    PeopleAPI.addPeople(person)
      .then(() => {
        fetchData();
        setOpenAddDialog(false);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ my: 1 }}>
      <Grid2
        container
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid2 item>
          <Typography variant="h4" gutterBottom sx={{ my: 2 }}>
            People
          </Typography>
        </Grid2>
        <Grid2
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          <IconButton variant="contained" color="primary">
            <TuneIcon />
          </IconButton>
        </Grid2>
      </Grid2>
      <hr />
      <Grid2
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <TableContainer component={Paper} sx={{ width: "700%", my: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Affiliation</TableCell>
                <TableCell align="left">Roles</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPeople.length > 0 ? (
                filteredPeople.map((email) => (
                  <TableRow key={email}>
                    <TableCell scope="row">
                      {data[email].first_name} {data[email].last_name}
                    </TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">
                      {data[email].affiliation}
                    </TableCell>
                    <TableCell align="left">
                      {data[email].roles.join(", ")}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(data[email])}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(email)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Button
                    variant="contained"
                    onClick={() => setOpenAddDialog(true)}
                    sx={{ width: "100%", my: 1, borderRadius: 0.5 }}
                  >
                    Add New Person
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
      <AddPerson
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddPerson}
      />
      <EditPerson
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        personData={personToEdit}
        onSubmit={handleUpdatePerson}
      />
    </Container>
  );
};

export default PeoplePage;
