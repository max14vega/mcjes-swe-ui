import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ user = { email: "Guest" } }) {
  // ✅ Added default value
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ padding: 4, textAlign: "center", boxShadow: 3 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto 16px",
            bgcolor: "primary.main",
          }}
        >
          {user.email.charAt(0).toUpperCase()}
        </Avatar>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Profile Page
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome, {user.email}!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ marginTop: 2 }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
