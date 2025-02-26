import {
  Paper,
  Table,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TableHead,
  TableRow,
  Grid2,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import React, { useState, useEffect} from "react";
import  { PeopleAPI } from "../../Client/API";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPerson  from "../../Components/AddPerson/AddPerson";


const PeoplePage = () => {

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log("Before setting open to false:", open);
    setOpen(false);
    console.log("After setting open to false:", open);
  };

  const handleSubmit = (data) => {
    PeopleAPI.addPeople(data)
      .then(() => {
        console.log("Before setting open to false:", open);
        setOpen(false);
        console.log("After setting open to false:", open);
        // Refresh the data
        fetchData();
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const fetchData = () => {
    PeopleAPI.getPeople()
      .then((jsonData) => {
        setData(jsonData);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching people: " + error.message);
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
        setError("Error deleting person: " + error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Container sx={{my: 1}}>
      <Grid2 
        xs={12} 
        sx={{ display: "flex", 
              justifyContent: "left",
              alignItems: "center",
               }}>
      <Typography variant="h4" gutterBottom sx={{my: 2}}> People </Typography>
      {/* <Button variant="contained" onClick={() => fetchData("people")}> Add Person</Button> */}
      </Grid2>
      <hr/>
    <Grid2
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <TableContainer component={Paper} sx={{ width: "700%", my: 1}}>
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
                    <TableCell scope="row">{data[email].first_name} {data[email].last_name}</TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{data[email].affiliation}</TableCell>
                    <TableCell align="left">{data[email].roles.join(", ")}</TableCell>
                    <TableCell align="center">
                      <IconButton variant="contained" color="error" onClick={() => handleDelete(email)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No data available</TableCell>
                </TableRow>
              )}
              <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Button 
                      variant="contained" 
                      onClick={() => setOpen(true)}
                      sx={{width: "100%", my: 1, borderRadius: .25}}
                      >
                      Add New Person
                    </Button>
                  </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
      <AddPerson open={open} onClose={handleClose} onSubmit={(data) => {
        handleSubmit(data);
      }} />
    </Container>
  );
};

export default PeoplePage;