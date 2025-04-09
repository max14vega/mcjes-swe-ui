import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import AddPerson from "../../Components/AddPerson/AddPerson"; // Make sure the import path is correct
import EditPerson from "../../Components/EditPerson/EditPerson"; // Make sure the import path is correct

const PeoplePage = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false); // State for Add Person dialog

  const fetchData = () => {
    PeopleAPI.getPeople()
      .then((jsonData) => {
        setData(jsonData);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching people: ${error.message}");
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
        setError(`Error deleting person: ${error.message}`);
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
        fetchData(); // Refresh data after update
        setOpenEditDialog(false); // Close the dialog
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const handleAddPerson = (person) => {
    PeopleAPI.addPeople(person)
      .then(() => {
        fetchData(); // Refresh data after adding
        setOpenAddDialog(false); // Close the add person dialog
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
        xs={12}
        sx={{ display: "flex", justifyContent: "left", alignItems: "center" }}
      >
        <Typography variant="h4" gutterBottom sx={{ my: 2 }}>
          People
        </Typography>
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
              {Object.keys(data).length > 0 ? (
                Object.keys(data).map((email) => (
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
                        onClick={() => handleEditClick(data[email])} // Pass the selected person for editing
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
                    onClick={() => setOpenAddDialog(true)} // This opens the AddPerson dialog
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

      {/* Add Person Dialog */}
      <AddPerson
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddPerson}
      />

      {/* Edit Person Dialog */}
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
