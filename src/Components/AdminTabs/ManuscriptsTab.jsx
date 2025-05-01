import React, { useState, useEffect } from "react";
import { ManuscriptsAPI } from "../../Client/API";
import DataTable from "../../Components/DataTable/DataTable";
import AddManuscript from "../../Components/AddManuscript/AddManuscript";
import EditManuscript from "../../Components/EditManuscript/EditManuscript";

const ManuscriptsTab = () => {
  const [data, setData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedManuscript, setSelectedManuscript] = useState(null);

  const fetchData = async () => {
    try {
      const jsonData = await ManuscriptsAPI.getManuscripts();
      const manuscripts = Object.values(jsonData).map((manuscript) => ({
        ...manuscript,
        referees: manuscript.referees?.join(", ") || "",
      }));
      setData(manuscripts);
    } catch (error) {
      console.error("Error fetching manuscripts:", error);
    }
  };

  const handleDelete = async (manuscript) => {
    const key = manuscript.manuscript_key;
    if (!key) return alert("Missing manuscript key.");
    try {
      await ManuscriptsAPI.deleteManuscript(key);
      await fetchData();
    } catch (error) {
      console.error("Error deleting manuscript:", error);
    }
  };

  const handleEdit = (manuscript) => {
    setSelectedManuscript(manuscript);
    setOpenEditDialog(true);
  };

  const handleUpdateManuscript = async (updatedManuscript) => {
    try {
      await ManuscriptsAPI.updateManuscript(updatedManuscript);
      await fetchData();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating manuscript:", error);
    }
  };

  const handleAddManuscript = async (newManuscript) => {
    try {
      await ManuscriptsAPI.addManuscript(newManuscript);
      await fetchData();
      setOpenAddDialog(false);
    } catch (error) {
      console.error("Error adding manuscript:", error);
    }
  };

  const columns = [
    { field: "manuscript_key", label: "Key" },
    { field: "title", label: "Title" },
    { field: "editor", label: "Editor" },
    { field: "referees", label: "Referees" },
    { field: "state", label: "State" },
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
        addButtonLabel="Add Manuscript"
      />
      <AddManuscript
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddManuscript}
      />
      <EditManuscript
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        manuscriptData={selectedManuscript}
        onSubmit={handleUpdateManuscript}
      />
    </>
  );
};

export default ManuscriptsTab;
