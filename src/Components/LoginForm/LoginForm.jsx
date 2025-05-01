import {
  Avatar,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import AppleLogin from "react-apple-login";

const LoginForm = ({
  email,
  password,
  emailError,
  passwordError,
  handleEmailChange,
  handlePasswordChange,
  handleLogin,
  handleAppleSuccess,
  handleAppleFailure,
  login,
}) => {
  const PaperStyle = { padding: "30px 20px", width: 400, height: "100%", margin: "auto" };
  const formStyle = {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };
  const buttonStyle = { marginTop: 10, padding: "10px", fontSize: "16px" };
  const avatarStyle = {
    backgroundColor: "#171738",
    marginBottom: 10,
    width: 50,
    height: 50,
  };

  return (
    <Paper elevation={10} style={PaperStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Avatar style={avatarStyle}>
          <AccountBoxIcon />
        </Avatar>
      </div>
      <Typography variant="h5" gutterBottom>
        Welcome Back!
      </Typography>
      <form style={formStyle}>
        <TextField
          id="email"
          value={email}
          placeholder="Enter your email"
          fullWidth
          type="email"
          variant="outlined"
          size="medium"
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          fullWidth
          variant="outlined"
          size="medium"
          onChange={handlePasswordChange}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />

        <Link href="#" underline="none" sx={{ textAlign: "left", ml: 2 }}>
          Forgot Password?
        </Link>

        <Button
          type="button"
          variant="contained"
          color="primary"
          fullWidth
          style={buttonStyle}
          onClick={handleLogin}
        >
          Log In
        </Button>

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
            gap: "8px",
          }}
          onClick={login}
        >
          <GoogleIcon />
          <Typography variant="body2">Continue with Google</Typography>
        </Button>

        <AppleLogin
          clientId="com.yourapp.web"
          redirectURI="https://your-redirect-uri.com"
          onSuccess={handleAppleSuccess}
          onFailure={handleAppleFailure}
          render={(props) => (
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
                gap: "8px",
              }}
              onClick={props.onClick}
            >
              <AppleIcon />
              <Typography variant="body2">Continue with Apple</Typography>
            </Button>
          )}
        />

        <Typography variant="body2" sx={{ mt: 1 }}>
          Not a Member? <Link href="/register">Register</Link>
        </Typography>
      </form>
    </Paper>
  );
};

export default LoginForm;