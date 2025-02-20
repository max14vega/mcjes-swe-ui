import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Box } from '@mui/material';

const Testing = () => {
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('');

  const fetchData = async (type) => {
    setDataType(type);
    const response = await fetch(`/api/${type}`);
    const jsonData = await response.json();
    setData(jsonData);
  };

  // Define the table headers for each data type
  const headers = {
    people: ['First Name', 'Last Name', 'Affiliation', 'Email', 'Roles', 'Editor'],
    manuscripts: ['Title', 'Display Name', 'Abstract', 'Text', 'Author First Name', 'Author Last Name', 'Author Email'],
    texts: ['Content', 'Author First Name', 'Author Last Name', 'Affiliation', 'Email', 'Roles']
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Button onClick={() => fetchData('people')} variant="contained" color="primary" sx={{ margin: 1 }}>
          Get People
        </Button>
        <Button onClick={() => fetchData('manuscripts')} variant="contained" color="primary" sx={{ margin: 1 }}>
          Get Manuscripts
        </Button>
        <Button onClick={() => fetchData('texts')} variant="contained" color="primary" sx={{ margin: 1 }}>
          Get Texts
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers[dataType] && headers[dataType].map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} sx={{
                '&:hover': {
                  backgroundColor: 'secondary', // Custom hover color
                }
              }}>
                {headers[dataType] && headers[dataType].map((header, headerIndex) => (
                  <TableCell key={headerIndex}>{item[header.toLowerCase().replace(/ /g, '_')]}</TableCell>
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
