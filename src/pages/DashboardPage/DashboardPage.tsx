import { Box, Container, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth='md' sx={{ pt: 4 }}>
        <Typography variant='h4' align='center' sx={{ mb: 4 }}>
          Dashboard Page
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='body1' sx={{ mb: 2 }}>
            This is the dashboard page.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
