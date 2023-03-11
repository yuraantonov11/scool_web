import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant='h1'>404</Typography>
      <Typography variant='h5' mb={2}>
        Oops! Page not found.
      </Typography>
      <Button variant='contained' component={Link} to='/'>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
