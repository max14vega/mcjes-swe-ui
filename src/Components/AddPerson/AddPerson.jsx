import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Autocomplete } from '@mui/material';
import { RolesAPI } from "../../Client/API";

const AddPerson = ({ open, onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    RolesAPI.getRolesConversion().then(setRoles).catch(console.error);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const personData = {
      first_name: firstName,
      last_name: lastName,
      affiliation: affiliation,
      email: email,
      roles: selectedRoles,
    };
    onSubmit(personData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Person</DialogTitle>
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
            value={roles.filter(role => selectedRoles.includes(role.role_code))} // Filter selected roles by 'role_code'
            onChange={(event, newValue) => setSelectedRoles(newValue.map(role => role.role_code))} // Store the selected role codes
            renderInput={(params) => (
                <TextField
                {...params}
                placeholder="Select roles"
                />
            )}
            filterSelectedOptions
            />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary"> 
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPerson;
