import { useState} from "react";
import { Typography, TextField, Button} from "@mui/material"
import {Avatar} from "@mui/material"; //Avatar import
import{Paper, Grid, Card, CardMedia, CardContent} from "@mui/material"; // Added Card, CardMedia, and CardContent imports
import AddReactionIcon from "@mui/icons-material/AddReaction"; //Addedd the Icon for Register Page

const Signup = () => {
  const PaperStyle = { padding:'30px 20px', width: 400, margin: "auto" }; //Adjust Paper Style
  const avatarStyle = { backgroundColor: "#171738", marginBottom: 10, width: 50,height: 50} // Adjust avatar style
  const formStyle = { marginTop: 20, display: "flex", flexDirection: "column", gap: "15px" }; // Adjuct Form Style
  const buttonStyle = { marginTop: 10, padding: "10px", fontSize: "16px" }; // Adjuct button style
  const leftcolStyle =
    {flex: 2, // Takes up 2 parts of the available space (more width than the right column)
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px", // Adjust margin to move it more left
    }
  const rigthcolStyle =
   {flex: 1, // Takes up 1 part of the card width
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "40px",
   }

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">
      {/* Main Card containing both image and form */}
      <Card
        sx={{
            flex: 1,
            display: "flex",
            width: "90vw",  //90% of the viewport width
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
        <div style={leftcolStyle}>
          <Card
            sx={{
              width: "100%", // Makes the card fill the container
              height: "100%", // Ensures it takes up the full height
              backgroundColor: "#171738",
              display: "flex", // Uses flexbox inside the card
              alignItems: "center", // Centers the image vertically
              justifyContent: "center",  // Centers the image horizontally
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
        <div style={rigthcolStyle}>
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