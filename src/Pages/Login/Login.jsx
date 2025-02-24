import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";
import { useState } from "react";

// ErrorMessage Component
function ErrorMessage({ message, onClose }) {
  return (
    <Alert severity="error" variant="filled" onClose={onClose}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Simulate authentication failure
    if (email !== "user@example.com" || password !== "password123") {
      setError("Invalid email or password.");
      return;
    }

    // Reset error if login is successful
    setError("");

    console.log("Successfully logged in!");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">
      <Card
        sx={{
          flex: 1,
          width: "90vw",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "30px",
          backgroundColor: "white",
          marginLeft: "auto",
          margin: "5vh auto",
          display: "flex",
          flexDirection: "row", // Align items in a row
        }}
      >
        {/* Left Side - Small Blue Card with Image */}
        <div
          style={{
            flex: 3, // Takes more space on the left
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginRight: "20px", // Adjust margin to move it more left
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#7180B9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src="/Images/Logo/LogoWhite.png"
              alt="Logo"
              style={{
                width: "100%",
                height: "50%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <div
          style={{
            flex: 2, // Takes more space on the right
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <CardContent
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "left",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                alignSelf: "center",
                marginRight: "-20px",
                marginBottom: "40px",
                whiteSpace: "nowrap",
              }}
            >
              Welcome Back!
            </Typography>

            {/* Show error message if there is an error */}
            {error && (
              <ErrorMessage message={error} onClose={() => setError("")} />
            )}

            <div className="mb-4">
              <Typography variant="body1" gutterBottom>
                Email
              </Typography>
              <TextField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                placeholder="Enter your email"
                fullWidth
                sx={{
                  width: "130%",
                  fontSize: "1.2rem",
                  textAlign: "right",
                  marginRight: "80px",
                  marginLeft: "-20px",
                  "& input": {
                    fontSize: "1.2rem",
                    padding: "15px",
                    textAlign: "left",
                  },
                }}
              />
            </div>
            <div className="mb-4">
              <Typography variant="body1" gutterBottom>
                Password
              </Typography>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                  width: "130%",
                  fontSize: "1.2rem",
                  textAlign: "right",
                  marginRight: "80px",
                  marginLeft: "-20px",
                  "& input": {
                    fontSize: "1.2rem",
                    padding: "15px",
                    textAlign: "left",
                  },
                }}
                variant="outlined"
                placeholder="Enter your password"
              />
            </div>
            <Button
              className="w-full"
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{
                width: "130%",
                fontSize: "1.2rem",
                padding: "30px",
                height: "40px",
                marginTop: "40px",
                marginRight: "-60px",
              }}
            >
              Login
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
