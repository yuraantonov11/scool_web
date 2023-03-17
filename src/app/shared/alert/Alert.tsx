import { FC, ReactNode } from 'react';

import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  children: ReactNode;
  open?: boolean;
  onClose?: () => void;
}

const AlertCollapse: FC<Props> = ({ children, onClose, open }) => {
  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => onClose && onClose()}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {children}
      </Alert>
    </Collapse>
  );
};

export default AlertCollapse;
