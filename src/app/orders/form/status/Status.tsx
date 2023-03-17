import { FC, useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Card,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { readAllOrderStatus } from '../../../../state/orders/reducer';
import { RootState } from '../../../../state/store';

import OrderStatusDB from '../../../../interfaces/OrderStatusDB';

import CardHeader from '../../../shared/card-header/CardHeader';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

interface FormStatusProps {
  onChange: (status?: OrderStatusDB) => void;
  error?: string | boolean;
  initStatus?: OrderStatusDB;
}

const FormStatus: FC<FormStatusProps> = ({
  error,
  onChange,
  initStatus,
}) => {
  const [status, setStatus] = useState<OrderStatusDB | undefined>(initStatus);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const orderStatus = useSelector<RootState, OrderStatusDB[]>(
    (state) => state.orders.order_status
  );

  useEffect(() => {
    dispatch(readAllOrderStatus());
  }, []);

  return (
    <Box>
      <Card elevation={1}>
        <CardHeader>
          <Typography variant="h6" sx={{ display: 'flex' }}>
            Estado
          </Typography>
          <Autocomplete
            options={orderStatus}
            getOptionLabel={(status) => status.name}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <span>{option.name}</span>
              </li>
            )}
            renderInput={(params) => <TextField {...params} />}
            sx={{ maxWidth: 300, width: '100%' }}
            value={status}
            onChange={(e, value) => {
              setStatus(value || undefined);
              onChange(value || undefined);
            }}
          />
        </CardHeader>
      </Card>
      {error && (
        <InputLabel error sx={{ mt: 1 }}>
          {error}
        </InputLabel>
      )}
    </Box>
  );
};

export default FormStatus;
