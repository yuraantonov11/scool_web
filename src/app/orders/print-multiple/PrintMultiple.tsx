import {
  Fragment,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { useReactToPrint } from 'react-to-print';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { RootState } from '../../../state/store';

import InvoicesDetailInvoice from '../../invoices/detail/invoice/Invoice';
import { useGetOrdersQuery } from '../../../state/orders/endpoints';
import OrderState from '../../../state/orders/interfaces/OrderState';

const OrdersPrintMultiple: FC<{ orders: EntityId[] }> = ({
  orders: selectedOrders,
}) => {
  const [print, setPrint] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const {
    table: { rowsPerPage, page },
  } = useSelector<RootState, OrderState>((state) => state.orders);
  const ref = useRef<HTMLDivElement>(null);
  const hookPrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => setIsPrinting(false),
    onBeforePrint: () => setIsPrinting(true),
    documentTitle: `Comprobante ${format(new Date(), 'P', { locale: es })}`,
  });
  const { data: orders } = useGetOrdersQuery({
    limit: rowsPerPage,
    offset: rowsPerPage * page,
  });

  const handlePrint = () => {
    setPrint(true);
  };

  useEffect(() => {
    if (print) {
      hookPrint();
      setPrint(false);
    }
  }, [print]);

  return (
    <>
      <LoadingButton loading={isPrinting} size="small" onClick={handlePrint}>
        Imprimir
      </LoadingButton>
      <Box sx={{ display: 'none' }}>
        <div ref={ref}>
          {print &&
            (orders || [])
              .filter((order) => selectedOrders.includes(order.id))
              .map((order) => (
                <Fragment key={order.id}>
                  <div className="page-break" />
                  <InvoicesDetailInvoice key={order.id} order={order} />
                </Fragment>
              ))}
        </div>
      </Box>
    </>
  );
};

export default OrdersPrintMultiple;
