import React, { useState, useEffect } from 'react';
import { PeopleAPI } from '../../Client/API';
import AddPerson from '../../Components/AddPerson/AddPerson';
import EditPerson from '../../Components/EditPerson/EditPerson';
import SearchBar from '../../Components/SearchBar/SearchBar';
import DataTable from '../../Components/DataTable/DataTable';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Container,
  Grid2,
  IconButton,
  Typography,
} from '@mui/material';

const PeoplePage = () => {
  const [data, setData] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { field: 'first_name', label: 'Full Name' },
    { field: 'email', label: 'Email' },
    { field: 'affiliation', label: 'Affiliation' },
    { field: 'roles', label: 'Roles' },
  ];

  const handleDelete = (item) => {
    const email = item.email;
    PeopleAPI.deletePeople(email)
      .then(() => {
        const updatedData = { ...data };
        delete updatedData[email];
        setData(updatedData);
      })
      .catch((error) => {
        console.error(`Error·deleting·person:${error.message}`);
      });
  };

  const handleEditClick = (person) => {
    setPersonToEdit(person);
    setOpenEditDialog(true);
  };

  const handleUpdatePerson = (updatedPerson) => {
    PeopleAPI.updatePeople(updatedPerson)
      .then(() => {
        PeopleAPI.getPeople().then((jsonData) => {
          setData(jsonData);
        });
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error('Error updating person:', error);
      });
  };

  const handleAddPerson = (person) => {
    PeopleAPI.addPeople(person)
      .then(() => {
        PeopleAPI.getPeople().then((jsonData) => {
          setData(jsonData);
        });
        setOpenAddDialog(false);
      })
      .catch((error) => {
        console.error('Error adding person:', error);
      });
  };

  const fetchData = () => {
    PeopleAPI.getPeople()
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error(`Error fetching people: ${error.message}`);
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Grid2 item="true">
          <Typography variant="h4" gutterBottom sx={{ my: 2 }}>
            People
          </Typography>
        </Grid2>
        <Grid2
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
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
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <DataTable
          data={Object.values(data)}
          columns={columns}
          onDelete={(email) => handleDelete(email)}
          onEdit={(person) => handleEditClick(person)}
          onAdd={() => setOpenAddDialog(true)}
          addButtonLabel="Add New Person"
          searchQuery={searchQuery}
        />
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