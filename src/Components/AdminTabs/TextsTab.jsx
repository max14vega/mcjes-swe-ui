import React, { useState, useEffect } from 'react';
import { TextsAPI } from '../../Client/API';
import DataTable from '../DataTable/DataTable';
import AddText from '../Texts/AddText';
import EditText from '../Texts/EditText';

const TextsTab = () => {
  const [data, setData] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [textToEdit, setTextToEdit] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const columns = [
    { field: 'key', label: 'Key' },
    { field: 'title', label: 'Title' },
    { field: 'text', label: 'Text' },
  ];

  const handleDelete = (key) => {
    TextsAPI.deleteText(key)
      .then(() => {
        const updatedData = { ...data };
        delete updatedData[key];
        setData(updatedData);
        fetchData();
      })
      .catch((error) => {
        console.error(`Error deleting text: ${error.message}`);
      });
  };

  const handleEditClick = (text) => {
    setTextToEdit(text);
    setOpenEditDialog(true);
  };

  const handleUpdateText = (updatedText) => {
    console.log('Updating text:', updatedText);
    TextsAPI.updateText(updatedText)
      .then(() => {
        TextsAPI.getTexts().then((jsonData) => {
          setData(jsonData);
          fetchData();
        });
        setOpenEditDialog(false);
      })
      .catch((error) => {
        console.error('Error updating text:', error);
      });
  };

  const handleAddText = (text) => {
    TextsAPI.addText(text)
      .then(() => {
        TextsAPI.getTexts().then((jsonData) => {
          setData(jsonData);
          fetchData();
        });
        setOpenAddDialog(false);
      })
      .catch((error) => {
        console.error('Error adding text:', error);
      });
  };

  const fetchData = () => {
    TextsAPI.getTexts()
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error(`Error fetching texts: ${error.message}`);
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
        onDelete={(key) => handleDelete(key)}
        onEdit={(text) => handleEditClick(text)}
        onAdd={() => setOpenAddDialog(true)}
        addButtonLabel="Add New Text"
      />
      <AddText
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddText}
      />
      {textToEdit && (
        <EditText
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          textData={textToEdit}
          onSubmit={handleUpdateText}
        />
      )}
    </div>
  );
};

export default TextsTab;