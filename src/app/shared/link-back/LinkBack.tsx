import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const LinkBack: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Typography
      variant="subtitle2"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline',
        },
      }}
      onClick={goBack}
    >
      <ArrowBackIcon fontSize="small" />
      {children}
    </Typography>
  );
};

export default LinkBack;
