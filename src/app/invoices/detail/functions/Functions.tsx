import { FC, RefObject,useState } from 'react';

import { Box } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { LoadingButton } from '@mui/lab';

import { useReactToPrint } from 'react-to-print';
import LinkBack from '../../../shared/link-back/LinkBack';

const InvoicesDetailFunctions: FC<{ elementToPrint: RefObject<HTMLElement> }> = ({
  elementToPrint,
}) => {
  const [isLoadingPrint, setIsLoadingPrint] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => elementToPrint.current,
    onBeforePrint: () => setIsLoadingPrint(true),
    onAfterPrint: () => setIsLoadingPrint(false),
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <LinkBack>Повернутись</LinkBack>
      <LoadingButton
        onClick={handlePrint}
        variant="contained"
        startIcon={<PrintIcon />}
        loading={isLoadingPrint}
      >
        Imprimir
      </LoadingButton>
    </Box>
  );
};

export default InvoicesDetailFunctions;
