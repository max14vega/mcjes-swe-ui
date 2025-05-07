import {
    Avatar,
    Button,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    MenuItem
  } from "@mui/material";
  import React from "react";
  import HowToRegIcon from "@mui/icons-material/HowToReg";
  import EmailIcon from "@mui/icons-material/Email";
  import PasswordIcon from "@mui/icons-material/Password";
  import PersonIcon from "@mui/icons-material/Person";
  import WorkIcon from "@mui/icons-material/Work";

  const RegisterForm = ({
    name,
    setName,
    email,
    setEmail,
    role,
    setRole,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    nameError,
    emailError,
    roleError,
    passwordError,
    confirmPasswordError,
    handleRegister,
  }) => {
    const PaperStyle = { padding: "30px 20px", width: 400, margin: "auto" };
    const buttonStyle = { marginTop: 10, padding: "10px", fontSize: "16px" };
    const avatarStyle = {
      backgroundColor: "#171738",
      marginBottom: 10,
      width: 50,
      height: 50,
    };
    const formStyle = {
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    };

    const roles = [
      { role_code: "AU", role: "Author" },
      { role_code: "ED", role: "Editor" },
      { role_code: "CE", role: "Consulting Editor" },
      { role_code: "ME", role: "Managing Editor" },
      { role_code: "RE", role: "Referee" },
    ];

    return (
      <Paper elevation={10} style={PaperStyle}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <Avatar style={avatarStyle}>
            <HowToRegIcon />
          </Avatar>
        </div>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please fill this form to register
        </Typography>

        <form style={formStyle} onSubmit={handleRegister}>
          <TextField
            id="name"
            placeholder="Enter your name"
            fullWidth
            variant="outlined"
            size="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="email"
            placeholder="Enter your email"
            fullWidth
            type="email"
            variant="outlined"
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <TextField
            id="affiliation"
            placeholder="Enter your affiliation"
            fullWidth
            variant="outlined"
            size="medium"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            error={!!affiliationError}
            helperText={affiliationError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
          /> */}
          <TextField
            id="outlined-select-role"
            select
            label="Select role"
            fullWidth
            variant="outlined"
            size="medium"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            error={!!roleError}
            helperText={roleError || ""}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WorkIcon />
                </InputAdornment>
              ),
            }}
          >
            {roles.map((option) => (
              <MenuItem key={option.role_code} value={option.role_code}>
                {option.role}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="password"
            type="password"
            placeholder="Enter your password"
            fullWidth
            variant="outlined"
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="confirm-password"
            type="password"
            placeholder="Re-enter your password"
            fullWidth
            variant="outlined"
            size="medium"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={buttonStyle}>
            Register
          </Button>
        </form>
      </Paper>
    );
  };

  export default RegisterForm;