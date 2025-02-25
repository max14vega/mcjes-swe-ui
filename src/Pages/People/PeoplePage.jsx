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
  Divider,
  Typography
} from "@mui/material";
import React, { useState, useEffect} from "react";
import  { PeopleAPI } from "../../Client/API";


const PeoplePage = () => {

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState(null);

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

  useEffect(() => { 
    fetchData("people");
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{my: 2}}> People </Typography>
      <hr/>
    <Grid2
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <TableContainer component={Paper} sx={{ width: "800%", my: 1}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Full Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Roles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).length > 0 ? (
                Object.keys(data).map((email) => (
                  <TableRow key={email}>
                    <TableCell scope="row">{data[email].first_name} {data[email].last_name}</TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{data[email].roles.join(", ")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </Container>
  );
};

export default PeoplePage;