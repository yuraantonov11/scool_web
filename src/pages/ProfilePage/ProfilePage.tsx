import * as React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant='h5' component='h2' gutterBottom>
            Profile Page
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            This is the profile page.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant='contained'>Edit Profile</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
