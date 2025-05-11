import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { RolesAPI } from "../../Client/API";

const EditProfile = ({ open, onClose, userData, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setAffiliation(userData.affiliation || "");
      setPhone(userData.phone || "");
      setEmail(userData.email || "");
      setSelectedRoles(userData.roles || []);
    }
  }, [userData]);

  useEffect(() => {
    RolesAPI.getRolesConversion()
      .then((fetchedRoles) => {
        setRoles(fetchedRoles);
      })
      .catch(console.error);
  }, []);

  const handleSave = () => {
    const updated = {
      firstName,
      lastName,
      affiliation,
      phone,
      email,
      roles: selectedRoles,
    };
    onSubmit(updated);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Affiliation"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Autocomplete
            multiple
            id="profile-roles"
            options={roles}
            getOptionLabel={(option) => option.role}
            value={roles.filter((r) => selectedRoles.includes(r.role_code))}
            onChange={(event, newValue) =>
              setSelectedRoles(newValue.map((r) => r.role_code))
            }
            renderInput={(params) => (
              <TextField {...params} label="Roles" placeholder="Select roles" />
            )}
            filterSelectedOptions
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;