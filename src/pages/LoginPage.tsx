import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tabs, Tab, AppBar } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [value, setValue] = React.useState(0);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
              Login
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
