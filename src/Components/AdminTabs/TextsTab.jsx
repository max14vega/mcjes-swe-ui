import React, { useState, useEffect } from "react";
import { TextsAPI } from "../../Client/API";
import DataTable from "../../Components/DataTable/DataTable";
import AddText from "../../Components/Texts/AddText";
import EditText from "../../Components/Texts/EditText";

const TextsTab = () => {
  const [data, setData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedText, setSelectedText] = useState(null);

  const fetchData = async () => {
    try {
      const jsonData = await TextsAPI.getTexts();
      const texts = Object.values(jsonData).map((text) => ({
        ...text,
      }));
      setData(texts);
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  const handleDelete = async (text) => {
    const key = text.key;
    if (!key) return alert("Missing text key.");
    try {
      await TextsAPI.deleteText(key);
      await fetchData();
    } catch (error) {
      console.error("Error deleting text:", error);
    }
  };

  const handleEdit = (index) => {
    const text = data[index];
    console.log('Text object:', text);
    if (text && text.key) {
      setSelectedText({ ...text }); // Create a new object to avoid mutating the original data
      setOpenEditDialog(true);
    } else {
      console.error("Invalid text object:", text);
    }
  };

  const handleUpdateText = async (updatedText) => {
    try {
      await TextsAPI.updateText(updatedText);
      await fetchData();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating text:", error);
    }
  };

  const handleAddText = async (newText) => {
    try {
      await TextsAPI.addText(newText);
      await fetchData();
      setOpenAddDialog(false);
    } catch (error) {
      console.error("Error adding text:", error);
    }
  };

  const columns = [
    { field: "key", label: "Key" },
    { field: "title", label: "Title" },
    { field: "text", label: "Text" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAdd={() => setOpenAddDialog(true)}
        addButtonLabel="Add Text"
      />
      <AddText
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddText}
      />
      <EditText
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        textData={selectedText}
        onSubmit={handleUpdateText}
      />
    </>
  );
};

export default TextsTab;