// src/components/Login.tsx
import { useState, ChangeEvent } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import Carlist from './Carlist';

type User = {
  username: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  });

  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + '/login', user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log('Login response:', res);

        const headerToken =
          res.headers['authorization'] || res.headers['Authorization'];

        const bodyToken =
          (res.data &&
            (res.data.token ||
              res.data.jwt ||
              res.data.accessToken)) ||
          undefined;

        const jwtToken = headerToken || bodyToken;

        if (jwtToken) {
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
        } else {
          console.warn('No token returned from backend');
          setOpen(true);
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setOpen(true);
      });
  };

  const handleLogout = () => {
    sessionStorage.setItem('jwt', '');
    setAuth(false);
  };

  // --- Рендер ---
  if (isAuthenticated) {
    return <Carlist logOut={handleLogout} />;
  }

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField
        name="username"
        label="Username"
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Login failed: Check your username and password"
      />
    </Stack>
  );
}

export default Login;
