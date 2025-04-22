import React, { useState, useEffect } from 'react';
import { PeopleAPI } from '../../Client/API';
import DataTable from '../../Components/DataTable/DataTable';
import AddPerson from '../../Components/AddPerson/AddPerson';
import EditPerson from '../../Components/EditPerson/EditPerson';

const PeopleTab = () => {
  const [data, setData] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [personToEdit, setPersonToEdit] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const columns = [
    { field: 'name', label: 'Full Name' },
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
        console.error(`Error deleting person: ${error.message}`);
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
        const people = Object.values(jsonData).map((person) => ({
          ...person,
          name: `${person.first_name} ${person.last_name}`,
        }));
        setData(people);
      })
      .catch((error) => {
        console.error(`Error fetching people: ${error.message}`);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <DataTable
        data={Object.values(data)}
        columns={columns}
        onDelete={(email) => handleDelete(email)}
        onEdit={(person) => handleEditClick(person)}
        onAdd={() => setOpenAddDialog(true)}
        addButtonLabel="Add New Person"
      />
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
    </div>
  );
};

export default PeopleTab;