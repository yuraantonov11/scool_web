import { Box, Container, Typography } from '@mui/material';
import BasicDetails from './basic-details/BasicDetails';

const UserSettings = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Обліковий запис
        </Typography>
        <BasicDetails />
      </Container>
    </Box>
  );
};

export default UserSettings;
