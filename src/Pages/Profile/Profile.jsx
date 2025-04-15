import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Stack,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({
  user = {
    email: "guest@example.com",
    firstName: "Guest",
    lastName: "User",
    DOB: "12-10-1990",
    phone: "N/A",
    role: "Visitor",
    Total_articles: "35",
    Average_views_per_article:"85",
    Time_spent_on_page: "10 minutes",
    Bounce_rate: "15",
    Most_popular_articles: "Monarchs",
    Revenue_per_article: "$80",
  },
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      <Stack spacing={4} alignItems="center" width="100%">
        {/* 🧑 Top Profile Header */}
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3, height: "calc(100% - 50px)" }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            {/* Left: Avatar */}
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
                fontSize: 36,
              }}
            >
              {user.firstName.charAt(0).toUpperCase()}
            </Avatar>

            {/* Right: Info + Logout */}
            <Stack spacing={1} alignItems="flex-start" flex={1}>
              <Typography variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.role}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Card>

        {/* 📇 Personal Information */}
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                sx={{
                  minWidth: 36,
                  height: 25,
                  px: 1.5, // reduce horizontal padding
                  borderRadius: 0.2, // makes it more square
                }}
              >
                Edit
              </Button>
            </Box>
          <Divider sx={{ marginBottom: 2 }} />
          <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="space-between">
          <Grid container spacing={2}>
                {/* Row 1 */}
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">First Name</Typography>
                  <Typography variant="body1">{user.firstName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Last Name</Typography>
                  <Typography variant="body1">{user.lastName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">DOB</Typography>
                  <Typography variant="body1">{user.DOB}</Typography>
                </Grid>

                {/* Row 2 */}
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Role</Typography>
                  <Typography variant="body1">{user.role}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
              </Grid>
          </Stack>
        </Card>

        {/* 📊 Stats Section */}
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" gutterBottom>
                Stats
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon/>}
                sx={{
                  minWidth: 36,
                  height: 25,
                  px: 1.5, // reduce horizontal padding
                  borderRadius: 0.2, // makes it more square
                }}
              >
                Edit
              </Button>
            </Box>
          <Divider sx={{ marginBottom: 2 }} />
          {/* You can customize this further based on real stats */}
            <Grid container spacing={2}>
                {/* Row 1 */}
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Total article count</Typography>
                  <Typography variant="body1">{user.Total_articles}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Average views per article</Typography>
                  <Typography variant="body1">{user.Average_views_per_article}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Time spent on page</Typography>
                  <Typography variant="body1">{user.Time_spent_on_page}</Typography>
                </Grid>

                {/* Row 2 */}
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Bounce rate</Typography>
                  <Typography variant="body1">{user.Bounce_rate}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Most popular articles</Typography>
                  <Typography variant="body1">{user.Most_popular_articles}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color="textSecondary">Revenue per article </Typography>
                  <Typography variant="body1">{user.Revenue_per_article}</Typography>
                </Grid>
              </Grid>
        </Card>
      </Stack>
    </Container>
  );
}