import React, { useState, useEffect } from 'react';
import { ManuscriptsAPI }from '../../Client/API';
import DataTable from '../../Components/DataTable/DataTable';

const ManuscriptsTab = () => {
  const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  //fetch data then join referees for data clarity
  const fetchData = async () => {
    ManuscriptsAPI.getManuscripts()
      .then((jsonData) => {
        const manuscripts = Object.values(jsonData).map((manuscript) => ({
          ...manuscript,
          referees: manuscript.referees.join(', '),
        }));
        setData(manuscripts);
      })
      .catch((error) => {
        console.error('Error fetching manuscripts:', error);
      });
  };

  //fields can be altered depending on what we want for admins
  const columns = [
    { field: 'manuscript_key', label: 'Key' },
    { field: 'title', label: 'Title'},
    { field: 'editor', label: 'Editor' },
    { field: 'referees', label: 'Referees'},
    { field: 'state', label: 'State' },
  ];

  const handleDelete = (item) => {
    // Implement delete logic here (delete by key)
  };

  const handleEdit = (item) => {
    // Implement edit logic here (edit by key)
  };

  const handleAdd = () => {
    // Implement submit manuscript here? if needed
  };


   useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onAdd={handleAdd}
      addButtonLabel="Add Manuscript"
    />
  );
};

export default ManuscriptsTab;