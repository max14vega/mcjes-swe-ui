import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { ManuscriptsAPI, PeopleAPI, TextsAPI } from "../../Client/API";

const Testing = () => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [error, setError] = useState(null);

  // Define the table headers for each data type
  const headers = {
    people: ["First Name", "Last Name", "Affiliation", "Email", "Roles"],
    manuscripts: [
      "Title",
      "Display Name",
      "Abstract",
      "Text",
      "Author First Name",
      "Author Last Name",
      "Author Email",
    ],
    texts: ["Key", "Title", "Text"],
  };

  const fetchData = async (type) => {
    setDataType(type);
    try {
      let jsonData;
      switch (type) {
        case "people":
          jsonData = await PeopleAPI.getPeople();
          jsonData = Object.values(jsonData);
          break;
        case "manuscripts":
          jsonData = await ManuscriptsAPI.getManuscripts();
          jsonData = Object.values(jsonData);
          break;
        case "texts":
          jsonData = await TextsAPI.getTexts();
          jsonData = Object.values(jsonData);
          break;
        default:
          jsonData = [];
      }
      setData(jsonData);
      setError(null);
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
      setError(`Failed to fetch ${type}.`);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          padding: 3,
        }}
      >
        <Button
          onClick={() => fetchData("people")}
          variant="contained"
          color="primary"
          sx={{ margin: 1 }}
        >
          Get People
        </Button>
        <Button
          onClick={() => fetchData("manuscripts")}
          variant="contained"
          color="primary"
          sx={{ margin: 1 }}
        >
          Get Manuscripts
        </Button>
        <Button
          onClick={() => fetchData("texts")}
          variant="contained"
          color="primary"
          sx={{ margin: 1 }}
        >
          Get Texts
        </Button>
      </Box>
      {error && (
        <Alert severity="error" style={{ marginTop: "20px" }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers[dataType] &&
                headers[dataType].map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <TableRow key={index}>
                  {headers[dataType].map((header, headerIndex) => (
                    <TableCell key={headerIndex}>
                      {item[header.toLowerCase().replace(/ /g, "_")]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Testing;
