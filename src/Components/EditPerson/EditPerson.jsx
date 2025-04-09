import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RolesAPI } from "../../Client/API"; // Import RolesAPI

const EditPerson = ({ open, onClose, personData, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Log the personData when it changes
  useEffect(() => {
    console.log("Received personData:", personData); // Log to see if personData is correct
    if (personData) {
      setFirstName(personData.first_name);
      setLastName(personData.last_name);
      setEmail(personData.email);
      setAffiliation(personData.affiliation);
      setSelectedRoles(personData.roles || []); // Default to empty array if no roles are present
    }
  }, [personData]); // Only runs when personData changes

  useEffect(() => {
    // Fetch roles only once
    RolesAPI.getRolesConversion()
      .then((fetchedRoles) => {
        console.log("Fetched roles:", fetchedRoles); // Log fetched roles to check if they're correct
        setRoles(fetchedRoles);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedPersonData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      affiliation: affiliation,
      roles: selectedRoles,
    };

    onSubmit(updatedPersonData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Person</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            placeholder="Affiliation"
            value={affiliation}
            onChange={(event) => setAffiliation(event.target.value)}
            margin="normal"
            fullWidth
          />
          <Autocomplete
            multiple
            id="roles-outlined"
            options={roles}
            sx={{ marginTop: "15px" }}
            getOptionLabel={(option) => option.role} // Display the role name
            value={roles.filter(
              (role) => selectedRoles.includes(role.role_code), // Filter selected roles by 'role_code'
            )}
            onChange={
              (event, newValue) =>
                setSelectedRoles(newValue.map((role) => role.role_code)) // Store the selected role codes
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select roles" />
            )}
            filterSelectedOptions
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPerson;
