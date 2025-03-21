import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AppleIcon from "@mui/icons-material/Apple";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import PasswordIcon from "@mui/icons-material/Password";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import { useState } from "react";
import AppleLogin from "react-apple-login"; // For Apple login

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //const navigate = useNavigate();

  const PaperStyle = { padding: "30px 20px", width: 400, margin: "auto" }; //Adjust Paper Style
  const formStyle = {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  }; // Adjuct Form Style
  const buttonStyle = { marginTop: 10, padding: "10px", fontSize: "16px" }; // Adjuct button style
  const avatarStyle = {
    backgroundColor: "#171738",
    marginBottom: 10,
    width: 50,
    height: 50,
  }; // Adjust avatar style

  const leftcolStyle = {
    flex: 2, // Take more space on larger screens
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const rigthcolStyle = {
    flex: 1, // Takes up 1 part of the card width
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "40px",
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email) setEmailError("Email is required.");
    else if (!validateEmail(email)) setEmailError("Invalid email format.");

    if (!password) setPasswordError("Password is required.");
    else if (password.length < 6)
      setPasswordError("Password must be at least 6 characters long.");

    if (
      !emailError &&
      !passwordError &&
      email === "user@example.com" &&
      password === "password123"
    ) {
      console.log("Successfully logged in!");
      //setUser({ email }); // Store user info
      //navigate("/profile"); // Redirect to Profile Page
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (emailError) setEmailError(""); // Clear email error when user starts typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) setPasswordError(""); // Clear password error when user starts typing
  };

  const handleAppleSuccess = (response) => {
    console.log("Apple Login Success:", response);
    // Handle Apple login response and authenticate user
  };

  const handleAppleFailure = (error) => {
    console.log("Apple Login Error:", error);
    // Handle Apple login error
  };

  const login = useGoogleLogin({
    onSuccess: (response) => console.log("Google Login Success:", response),
    onError: (error) => console.log("Google Login Error:", error),
  });

  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center">
      <Card
        sx={{
          flex: 1,
          display: "flex",
          width: "90vw",
          height: "80vh",
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
        {/* Left Side - Small Blue Card with Image */}
        <div style={leftcolStyle}>
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
                height: "auto", // Limits the image height to 60% of the card
                borderRadius: "10px", // Rounds the image corners slightly
                objectFit: "cover", // Ensures the image scales properly without distortion
              }}
            />
          </Card>
        </div>

        {/* Right Side - Login Form */}
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
                  justifyContent: "center", // Center avatar horizontally
                  alignItems: "center", // Center avatar vertically
                  marginBottom: 10, // Ensure spacing between avatar and form
                }}
              >
                <Avatar style={avatarStyle}>
                  <AccountBoxIcon />
                </Avatar>
              </div>
              <Typography variant="h5" gutterBottom>
                {" "}
                Welcome Back!{" "}
              </Typography>
              <form style={formStyle}>
                <TextField
                  id="email"
                  value={email}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  placeholder="Enter your email"
                  fullWidth
                  type="email"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "10px" }}
                  onChange={handleEmailChange} // Handle email input change
                  error={!!emailError} // Display error if there's an email error
                  helperText={emailError} // Show email error message
                />
                <TextField
                  id="password"
                  type="password"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PasswordIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  placeholder="Enter your password"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "10px" }}
                  onChange={handlePasswordChange} // Handle password input change
                  error={!!passwordError} // Display error if there's a password error
                  helperText={passwordError} // Show password error message
                />
                <Link
                  href="#"
                  underline="none"
                  sx={{ textAlign: "left", ml: 2 }}
                >
                  Forgot Password?
                </Link>

                <Button
                  type="button" // Changed from "submit" to "button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={buttonStyle}
                  onClick={handleLogin} // Trigger login on click
                >
                  Log In
                </Button>

                {/* Google Login Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    fontSize: "12px",
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px", // Adds space between icon and text
                  }}
                  onClick={login} // Calls Google login on button click
                >
                  <GoogleIcon sx={{}} />
                  <Typography variant="body2">Continue with Google</Typography>
                </Button>

                {/* Apple Login Button */}
                <AppleLogin
                  clientId="com.yourapp.web"
                  redirectURI="https://your-redirect-uri.com"
                  onSuccess={handleAppleSuccess}
                  onFailure={handleAppleFailure}
                  render={(props) => (
                    <Button
                      variant="outlined" // Change to "outlined" to have a border
                      fullWidth
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        fontSize: "12px",
                        backgroundColor: "white", // White background
                        color: "black", // Black text
                        border: "1px solid black", // Black border
                        borderRadius: "5px", // Optional: Rounded corners
                        gap: "8px", // Adds space between icon and text
                      }}
                      onClick={props.onClick}
                    >
                      <AppleIcon sx={{}} />
                      <Typography variant="body2">
                        Continue with Apple
                      </Typography>
                    </Button>
                  )}
                />

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Not a Member?{" "}
                  <Link href="/register" underline="none">
                    {" "}
                    Register{" "}
                  </Link>
                </Typography>
              </form>
            </Paper>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
