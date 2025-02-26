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
    const fetchRoles = async () => {
      try {
        const response = await RolesAPI.getRoles();
        if (response && typeof response === 'object') {
          // Convert the object into an array of roles with the correct order: role_code, role, is_masthead
          const transformedRoles = Object.keys(response).map(roleCode => ({
            role_code: roleCode,        // role code (e.g., 'AU')
            role: response[roleCode].role,  // role name (e.g., 'Author')
            is_masthead: response[roleCode].is_masthead  // is_masthead flag
          }));
          setRoles(transformedRoles);
        } else {
          console.error('Invalid response data:', response);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          affiliation: affiliation,
          email: email,
          roles: selectedRoles, // Send roles as a list of codes
        }),
      });
      const data = await response.json();
      console.log(data);
      onClose(); // Close dialog after successful submission
    } catch (error) {
      console.error(error);
    }
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
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPerson;
