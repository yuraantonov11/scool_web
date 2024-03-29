import { FC } from 'react';

import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Card,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../state/store';
import {
  setTablePageOrder,
  setTableRowsPerPageOrder,
} from '../../../state/orders/slice';
import OrdersList from '../list/List';
import { Link } from 'react-router-dom';
import Pagination from '../../shared/pagination/Pagination';
import { useGetOrdersQuery } from '../../../state/orders/endpoints';
import OrderState from '../../../state/orders/interfaces/OrderState';

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<{ open?: boolean; drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  width: '100%',
  flexGrow: 1,
  zIndex: 1,
  padding: '64px 0 48px 0',
  [theme.breakpoints.up('md')]: {
    marginRight: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  },
}));

const OrdersContent: FC<{ drawerWidth: number }> = ({
  drawerWidth,
}) => {
  const dispatch = useDispatch();
  const {
    drawer,
    total_count,
    table: { rowsPerPage, page },
  } = useSelector<RootState, OrderState>((state) => state.orders);
  const { data, isFetching } = useGetOrdersQuery({
    limit: rowsPerPage,
    offset: rowsPerPage * page,
  });

  return (
    <Content drawerWidth={drawerWidth} open={drawer.isOpen}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4">Вчителі</Typography>
          <Box>
            <Link to="/requests/new">
              <Button variant="contained" startIcon={<AddIcon />}>
                Додати
              </Button>
            </Link>
          </Box>
        </Box>
        <Card>
          <Box
            sx={{
              height: 75 * rowsPerPage + 44.5,
              position: 'relative',
            }}
          >
            {!data || isFetching ? (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ) : (
              <OrdersList orders={data} />
            )}
          </Box>
          <Pagination
            totalCount={total_count}
            onRowsPerPageChange={(rowsPerPage) =>
              dispatch(setTableRowsPerPageOrder(rowsPerPage))
            }
            onPageChange={(page) => dispatch(setTablePageOrder(page))}
          />
        </Card>
      </Container>
    </Content>
  );
};

export default OrdersContent;
