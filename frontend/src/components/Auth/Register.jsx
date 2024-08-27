import React, { useState } from 'react';
import { createUser } from '../../services/ApiUser';
import { TextField, Button, Alert } from '@mui/material';
import { Link } from 'react-router-dom';


function Register() {
  const [fullname, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError('Username is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    if (password !== repassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setUsernameError('');
    setPasswordError('');

    try {
     await createUser({fullname, username, password });
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-[#E9ECEF]">
      <h1 className="text-[24px] my-4">REGISTER</h1>
      <div className="w-[400px] bg-white p-8 rounded-[10px] shadow-lg">
        <p className="text-[16px] mb-6 text-center">Please register your account</p>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <TextField
              variant="outlined"
              fullWidth
              label="Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextField
              variant="outlined"
              fullWidth
              label="User Name"
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
          <div className="mb-6">
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type="password"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </div>

          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <p className="mt-5 text-end">
          Return to  <Link to="/" className="text-blue-500 underline cursor-pointer">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
