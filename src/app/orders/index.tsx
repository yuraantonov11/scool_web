import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { countOrders } from '../../state/orders/reducer';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../state/store';

const OrdersIndex = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  useEffect(() => {
    dispatch(countOrders());
  }, []);

  return <Outlet />;
};

export default OrdersIndex;
