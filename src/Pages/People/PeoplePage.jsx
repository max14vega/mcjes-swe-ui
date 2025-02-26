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
import  AddPerson  from "../../Components/AddPerson/AddPerson";


const PeoplePage = () => {

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data) => {
    try {
      await PeopleAPI.addPerson(data);
      setOpen(false);
      // Refresh the data
      fetchData();
    } catch (error) {
      console.error("Failed to add person:", error);
    }
  };

  const fetchData = async (type) => {
    setDataType(type);
    try {
      let jsonData;
      jsonData = await PeopleAPI.getPeople();
      setData(jsonData);
      setError(null);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
      setError(`Failed to fetch ${type}.`);
    }
  };

  const handleDelete = async (email) => {
    try {
      await PeopleAPI.deletePeople(email);
      const updatedData = { ...data };
      delete updatedData[email];
      setData(updatedData);
    } catch (error) {
      console.error(`Failed to delete person with email ${email}:`, error);
      setError(`Failed to delete person with email ${email}.`);
    }
  };

  useEffect(() => { 
    fetchData("people");
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
      <AddPerson open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </Container>
  );
};

export default PeoplePage;