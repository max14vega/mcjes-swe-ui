import AddReactionIcon from "@mui/icons-material/AddReaction"; //Addedd the Icon for Register Page
import { Button, TextField, Typography } from "@mui/material";
import { Avatar } from "@mui/material"; //Avatar import
import { Card, CardContent, CardMedia, Grid, Paper } from "@mui/material"; // Added Card, CardMedia, and CardContent imports
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent default form submission

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }
    if (!phone) {
      setPhoneError("Phone number is required.");
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError("Invalid phone number. Use 10 digits.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      console.log("User registered successfully:", { name, email, phone });
    }
  };

  const PaperStyle = { padding: "30px 20px", width: 400, margin: "auto" };
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
  const buttonStyle = { marginTop: 10, padding: "10px", fontSize: "16px" };

  const leftColStyle = {
    flex: 2,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
  };

  const rightColStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "40px",
  };

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">
      {/* Main Card containing both image and form */}
      <Card
        sx={{
          flex: 1,
          display: "flex",
          width: "90vw", //90% of the viewport width
          height: "80vh", // 80% of viewport height
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "40px",
          backgroundColor: "white", //backgroung color
          flexDirection: "row", // Align items in a row
          marginTop: "30px", // Adjust the top margin
          marginLeft: "auto", // Push card away from the left
          marginRight: "auto", // Push card away from the right
        }}
      >
        {/* Left Column - Store Image */}
        <div style={leftColStyle}>
          <Card
            sx={{
              width: "100%", // Makes the card fill the container
              height: "100%", // Ensures it takes up the full height
              backgroundColor: "#171738",
              display: "flex", // Uses flexbox inside the card
              alignItems: "center", // Centers the image vertically
              justifyContent: "center", // Centers the image horizontally
              borderRadius: "20px", // Rounds the corners of the card
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Adds a soft shadow for depth
            }}
          >
            <img
              src="/Images/Logo/LogoUpdated.png"
              alt="Logo"
              style={{
                width: "80%", // Limits the image width to 80% of the card
                height: "50%", // Limits the image height to 60% of the card
                borderRadius: "10px", // Rounds the image corners slightly
                objectFit: "cover", // Ensures the image scales properly without distortion
              }}
            />
          </Card>
        </div>

        {/* Right Column - Form */}
        <div style={rightColStyle}>
          <CardContent
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Paper elevation={10} style={PaperStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // Center avatar horizontally
                  alignItems: "center", // Center avatar vertically
                  marginBottom: 10, // Ensure spacing between avatar and form
                }}
              >
                <Avatar style={avatarStyle}>
                  <AddReactionIcon />
                </Avatar>
              </div>
              <Typography variant="h5" gutterBottom>
                Sign Up
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {" "}
                Please fill this form to register{" "}
              </Typography>

              {/* Form */}
              <form style={formStyle} onSubmit={handleSignup}>
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
                />
                <TextField
                  id="phone"
                  placeholder="Enter your phone number"
                  fullWidth
                  type="tel"
                  variant="outlined"
                  size="medium"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!!phoneError}
                  helperText={phoneError}
                />
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
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={buttonStyle}
                >
                  Register
                </Button>
              </form>
            </Paper>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
