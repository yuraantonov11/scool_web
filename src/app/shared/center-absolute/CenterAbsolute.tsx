import { Box } from '@mui/material';
import { ElementType, FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  component?: ElementType
}
const CenterAbsolute: FC<Props> = ({
  children,
  component,
}) => {
  return (
    <Box
      component={component}
      sx={{
        right: '50%',
        top: '50%',
        position: 'absolute',
        transform: 'translate(50%, 0%)',
      }}
    >
      {children}
    </Box>
  );
};

export default CenterAbsolute;
