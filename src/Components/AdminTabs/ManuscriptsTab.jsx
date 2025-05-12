import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ManuscriptsAPI } from "../../Client/API";
import DataTable from "../../Components/DataTable/DataTable";
import EditManuscript from "../../Components/EditManuscript/EditManuscript";

const ManuscriptsTab = ({user}) => {
  const [data, setData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedManuscript, setSelectedManuscript] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const jsonData = await ManuscriptsAPI.getManuscripts();
  
      let manuscripts = Object.values(jsonData).map((manuscript) => ({
        ...manuscript,
        referees: manuscript.referees?.join(", ") || "",
      }));
  
      if (user?.roles?.includes("RE")) {
        manuscripts = manuscripts.filter((manuscript) =>
          manuscript.referees
            .split(",")
            .map((email) => email.trim().toLowerCase())
            .includes(user.email.toLowerCase())
        );
      }
  
      setData(manuscripts);
    } catch (error) {
      console.error("Error fetching manuscripts:", error);
    }
  };

  const handleDelete = async (key) => {
    if (!key) return alert("Missing manuscript key.");
    try {
      await ManuscriptsAPI.deleteManuscript(key);
      await fetchData();
      setOpenEditDialog(false);
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

  const columns = [
    { field: "manuscript_key", label: "Key" },
    { field: "title", label: "Title" },
    { field: "author_first_name", label: "Author First Name" },
    { field: "author_last_name", label: "Author Last Name" },
    { field: "author_email", label: "Author Email" },
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
        onDelete={(manuscript) => handleDelete(manuscript.manuscript_key)}
        onEdit={handleEdit}
        onAdd={() => navigate("/Submissions")}
        addButtonLabel="Add Manuscript"
      />
      <EditManuscript
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        manuscriptData={selectedManuscript}
        onSubmit={handleUpdateManuscript}
        onDelete={handleDelete}
        user={user}
      />
    </>
  );
};

export default ManuscriptsTab;