import React, { useState, useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';
import { refreshToken } from "../../services/RefreshToken";
import { loginUser } from "../../services/ApiLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("token");
      const refresh_token = localStorage.getItem("refreshToken");
      if (token && refresh_token) {
        try {
          await refreshToken();
          const fullName = localStorage.getItem("fullName");
          if (fullName) {
            navigate("/home");
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("fullName");
        }
      }
    };

    autoLogin();
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Please enter your username");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = await loginUser(username, password);
      if (data.access_token && data.refresh_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("fullName", data.fullname);
        localStorage.setItem("user_id", data.id)
        setError("Log in successfully!");
        navigate("/home");
      } else {
        setError("Login failed!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Login information is incorrect. Please try again.");
        } else {
          setError(`Login error: ${error.response.data.message || 'Please try again.'}`);
        }
      } else if (error.request) {
        setError("Unable to connect to the server. Please check your network connection.");
      } else {
        setError("An error has occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-[#E9ECEF]">
      <h1 className="text-[24px] my-4">LOGIN</h1>
      <div className="w-[400px] bg-white p-8 rounded-[10px] shadow-lg">
        <p className="text-[16px] mb-6 text-center">Please log in to your account</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}

            />
          </div>
          <div className="mb-6">
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </div>

          {error && <Alert severity="error" >{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <p className="mt-5 text-end">
            No account <Link to="/register" className="text-blue-500 underline cursor-pointer">registered here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
