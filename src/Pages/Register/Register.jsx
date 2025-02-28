import { useState } from "react";
import { Typography, TextField, Button, Avatar, Paper, Grid, Card, CardMedia, CardContent } from "@mui/material"; // Added Card, CardMedia, and CardContent imports
import AddReactionIcon from "@mui/icons-material/AddReaction";

const Signup = () => {
  const PaperStyle = { padding:'30px 20px', width: 400, margin: "auto" };
  const avatarStyle = { backgroundColor: "#1976d2", marginBottom: 10, width: 50,height: 50} // Adjust avatar size as needed};
  const formStyle = { marginTop: 20, display: "flex", flexDirection: "column", gap: "15px" }; // Adds spacing
  const buttonStyle = { marginTop: 10, padding: "10px", fontSize: "16px" }; // Ensure text is visible

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">
      {/* Main Card containing both image and form */}
      <Card
        sx={{
            flex: 1,
            marginTop: "30px", // Adjust this value as needed
            width: "90vw",  // Reduced the width of the card for more margin
            height: "80vh",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            borderRadius: "40px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row", // Align items in a row
            marginLeft: "auto", // Push card away from the left
            marginRight: "auto", // Push card away from the right
          }}
      >
        {/* Left Column - Card with Image */}
        <div
          style={{
            flex: 2, // Takes up 50% of the card width
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px", // Adjust margin to move it more left
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "Black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src="/Images/Logo/CatLogoBlack.png"
              alt="Logo"
              style={{
                width: "80%",
                height: "60%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </Card>
        </div>

        {/* Right Column - Form */}
        <div
          style={{
            flex: 1, // Takes up 50% of the card width
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "40px",
          }}
        >
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
                justifyContent: "center",  // Center avatar horizontally
                alignItems: "center",      // Center avatar vertically
                marginBottom: 10,          // Ensure spacing between avatar and form
              }}
            >
              <Avatar style={avatarStyle}>
                <AddReactionIcon />
              </Avatar>
            </div>
            <Typography variant="h5" gutterBottom>Sign Up</Typography>
            <Typography variant="body2" color="textSecondary"> Please fill this form to register </Typography>

            {/* Form */}
            <form style={formStyle}>
                <TextField id="name" placeholder="Enter your name" fullWidth variant="outlined" size="medium" style={{ marginBottom: "10px"}} />
                <TextField id="email" placeholder="Enter your email" fullWidth type="email" variant="outlined" size="medium" style={{ marginBottom: "10px" }}/>
                <TextField id="phone" placeholder="Enter your phone number" fullWidth type="tel" variant="outlined" size="medium" style={{ marginBottom: "10px" }} />
                <TextField id="password" type="password" placeholder="Enter your password" fullWidth variant="outlined" size="medium" style={{ marginBottom: "10px" }} />
                <TextField id="confirm-password" type="password" placeholder="Re-enter your password" fullWidth variant="outlined" size="medium" style={{ marginBottom: "10px" }} />
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