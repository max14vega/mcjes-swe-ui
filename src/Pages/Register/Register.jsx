//material UI components
import {
  Card,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import { AccountAPI } from "../../Client/API";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [affiliationError, setAffiliationError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setNameError("");
    setEmailError("");
    setAffiliationError("");
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
    if (!affiliation) {
      setAffiliationError("Affiliation is required.");
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
      const newUser = {
        first_name: name.split(" ")[0],
        last_name: name.split(" ")[1] || "",
        email: email,
        password: password,
        affiliation: affiliation,
      };

      try {
        await AccountAPI.register(newUser);
        alert("User registered successfully!");
        // Redirect or reset form if needed
      } catch (error) {
        console.error("Registration error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

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
                height: "auto",
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
            <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                affiliation={affiliation}
                setAffiliation={setAffiliation}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                nameError={nameError}
                emailError={emailError}
                affiliationError={affiliationError}
                passwordError={passwordError}
                confirmPasswordError={confirmPasswordError}
                handleRegister={handleRegister}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Register;
