import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const BackdropStyled = styled(Backdrop)(({ theme }) => ({
  backgroundColor: theme.palette.neutral[900],
}));

const LoadingPage: FC<{ message?: string }> = ({ message }) => {
  return (
    <BackdropStyled
      open
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <CircularProgress />

      {message && (
        <Typography sx={{ mt: 1, color: '#fff' }}>{message}</Typography>
      )}
    </BackdropStyled>
  );
};

export default LoadingPage;
