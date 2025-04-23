import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack
  } from "@mui/material";
  import React, { useState, useEffect } from "react";

  const EditProfile = ({ open, onClose, userData, onSubmit }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [DOB, setDOB] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
      if (userData) {
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setDOB(userData.DOB || "");
        setPhone(userData.phone || "");
        setEmail(userData.email || "");
        setRole(userData.role || "");
      }
    }, [userData]);

    const handleSave = () => {
      const updated = { firstName, lastName, DOB, phone, role, email };
      onSubmit(updated);
      onClose();
    };

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
            <TextField label="Date of Birth" value={DOB} onChange={(e) => setDOB(e.target.value)} fullWidth />
            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    );
  };

  export default EditProfile;