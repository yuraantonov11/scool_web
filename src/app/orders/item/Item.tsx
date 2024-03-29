import { FC, useCallback } from 'react';

import {
  Checkbox,
  Chip,
  IconButton,
  TableCell,
  TableRow as MuiTableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { useDispatch, useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import OrderDB from '../../../interfaces/OrderDB';
import OrderStatusColor from '../../../enums/OrderStatusColor';

import { openOrdersDrawer } from '../../../state/orders/slice';
import OrderStateDrawer from '../../../state/orders/interfaces/StateDrawer';
import { RootState } from '../../../state/store';
import toMoneyFormat from '../../../util/toMoneyFormat';
import { Link } from 'react-router-dom';

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '> td': {
    cursor: 'pointer',
    maxHeight: '95px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '> td:last-child': {
    cursor: 'default',
  },
  ':first-of-type': {
    '> td': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
}));

interface OrderListItemProps {
  onToggle: (id: EntityId) => void;
  checked?: boolean;
  order: OrderDB;
}

const OrderListItem: FC<OrderListItemProps> = ({
  onToggle,
  checked,
  order,
}) => {
  const dispatch = useDispatch();
  const { orderId, isOpen } = useSelector<RootState, OrderStateDrawer>(
    (state) => state.orders.drawer
  );
  const toggleDrawer = useCallback(() => {
    dispatch(openOrdersDrawer(order.id));
  }, []);

  return (
    <TableRow hover selected={order.id === orderId && isOpen}>
      <TableCell width={50}>
        <Checkbox checked={checked} onChange={() => onToggle(order.id)} />
      </TableCell>
      <TableCell onClick={toggleDrawer}>
        <Typography variant="body2">#{order.id}</Typography>
      </TableCell>
      <TableCell onClick={toggleDrawer}>
        <Typography variant="body2">
          {toMoneyFormat(
            order.products.reduce(
              (acum, product) =>
                acum + product.quantity * product.product.price,
              0
            )
          )}
        </Typography>
      </TableCell>
      {order?.user && (
        <TableCell onClick={toggleDrawer}>
          <Typography variant="body2">
            {order.user.first_name} {order.user?.last_name}
          </Typography>
        </TableCell>
      )}
      <TableCell onClick={toggleDrawer}>
        <Typography variant="body2">
          {format(new Date(order.updated_at), 'd/M/y', {
            locale: es,
          }).toLocaleUpperCase()}
        </Typography>
      </TableCell>
      <TableCell onClick={toggleDrawer} sx={{ pl: { xs: 0, md: 2 } }}>
        <Chip
          size="small"
          label={order.status.name}
          color={OrderStatusColor[order.status.name]}
        />
      </TableCell>
      <TableCell
        sx={{ display: 'flex', justifyContent: 'right', height: '75px' }}
      >
        <Link to={'/requests/edit/' + order.id}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={toggleDrawer}>
          <AssignmentIcon />
        </IconButton>
        <Link to={`/receipts/${order.id}/detail`}>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default OrderListItem;
