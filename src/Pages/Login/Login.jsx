import {
  Card,
  CardContent,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountAPI } from "../../Client/API";
import LoginForm from "../../Components/LoginForm/LoginForm";


export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const leftcolStyle = {
    flex: 2, // Take more space on larger screens
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
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

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    }


    if (isValid) {
      try {
        const response = await AccountAPI.login({ email, password });

        // Save access token
        localStorage.setItem("access_token", response.access_token);

        // Save user info (what backend now returns!)
        const backendUser = response.user;
        console.log("backendUser:", backendUser); // <-- Add this
        // Normalize field names
        const transformedUser = {
          firstName: backendUser.first_name,
          lastName: backendUser.last_name,
          email: backendUser.email,
          affiliation: backendUser.affiliation,
          roles: backendUser.roles,
          phone: backendUser.phone || "N/A",
          Total_articles: backendUser.Total_articles || 0,
          Average_views_per_article: backendUser.Average_views_per_article || 0,
          Time_spent_on_page: backendUser.Time_spent_on_page || "0 min",
          Bounce_rate: backendUser.Bounce_rate || "0%",
          Most_popular_articles: backendUser.Most_popular_articles || "None",
          Revenue_per_article: backendUser.Revenue_per_article || "$0.00",
        };
        localStorage.setItem("user", JSON.stringify(transformedUser));
        setUser(transformedUser);

        navigate("/profile"); // Redirect
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
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
              src="/Logo/LogoUpdated.png"
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
            <LoginForm
              email={email}
              password={password}
              emailError={emailError}
              passwordError={passwordError}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              handleLogin={handleLogin}
              handleAppleSuccess={handleAppleSuccess}
              handleAppleFailure={handleAppleFailure}
              login={login}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
