import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { login } from "../actions/auth";
import { RootState } from "../store";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tabs, Tab, AppBar } from '@mui/material';
import {useEffect} from "react";
import {AuthActionTypes} from "../types/auth.types";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AuthActionTypes>>();
  const authState = useSelector((state: RootState) => state.auth);
  const { loading, isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the dashboard or home page
      console.log("Logged in successfully!");
    }
  }, [isAuthenticated]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(login(email, password));

    console.log('Email:', email, 'Password:', password);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label='Login' />
          <Tab label='Register' />
        </Tabs>
      </AppBar>
      <Box sx={{ width: '100%', maxWidth: '400px' }}>
        {value === 0 && (
          <>
            <TextField
              label='Email'
              variant='outlined'
              margin='normal'
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
            <TextField
              label='Password'
              variant='outlined'
              margin='normal'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
            <Button
              variant='contained'
              type='submit'
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </>
        )}
        {value === 1 && (
          <>
            <TextField
              label='Name'
              variant='outlined'
              margin='normal'
              fullWidth
            />
            <TextField
              label='Email'
              variant='outlined'
              margin='normal'
              fullWidth
            />
            <TextField
              label='Password'
              variant='outlined'
              margin='normal'
              type='password'
              fullWidth
            />
            <Button
              disabled={loading}
              variant='contained'
              type='submit'
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
