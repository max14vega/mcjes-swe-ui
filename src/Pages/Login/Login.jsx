import { useState } from "react";
import { Card, CardContent } from "@mui/material";  // Importing Card and CardContent from MUI
import { Button } from "@mui/material";  // Importing Button from MUI
import { TextField } from "@mui/material";  // MUI provides TextField for Input (not Input component directly)
import { Typography } from "@mui/material";  // Typography can be used for text elements like Label

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg rounded-2xl bg-white">
        <CardContent>
          <Typography variant="h5" gutterBottom>Login</Typography>  {/* Use Typography for the title */}

          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <Typography variant="body1" gutterBottom>Email</Typography>  {/* Use Typography as Label */}
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
            <Typography variant="body1" gutterBottom>Password</Typography>  {/* Use Typography as Label */}
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

          <Button className="w-full" variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}