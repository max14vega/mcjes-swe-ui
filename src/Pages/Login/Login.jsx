import { Card, CardContent } from "@mui/material"; // Importing Card and CardContent from MUI
import { Button } from "@mui/material"; // Importing Button from MUI
import { TextField } from "@mui/material"; // MUI provides TextField for Input (not Input component directly)
import { Typography } from "@mui/material"; // Typography can be used for text elements like Label
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // For now, just log the credentials (you can add actual login logic here)
    console.log("Logging in with", email, password);

    // Reset error if login is successful
    setError("");

    // Add login request here, like an API call
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Card
        sx={{
          position: "absolute",
          top: "250px", // Distance from the top of the screen
          left: "450px", // Distance from the left of the screen
          width: "400px", // Set width to 400px
          height: "400px", // Set height to 600px
          padding: "24px", // Add padding inside the card
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Box shadow for card
          borderRadius: "30px", // Rounded corners (same as `rounded-2xl`)
          backgroundColor: "white", // Background color of the card
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>{" "}
          {/* Use Typography for the title */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="mb-4">
            <Typography variant="body1" gutterBottom>
              Email
            </Typography>{" "}
            {/* Use Typography as Label */}
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <Typography variant="body1" gutterBottom>
              Password
            </Typography>{" "}
            {/* Use Typography as Label */}
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="Enter your password"
            />
          </div>
          <Button
            className="w-full"
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
