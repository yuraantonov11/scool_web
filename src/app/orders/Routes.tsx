import { Navigate, Route, Routes } from 'react-router-dom';
import OrdersIndex from '.';
import OrderAddIndex from './add';
import OrderEditIndex from './edit';
import Orders from './orders';

const OrdersRoutes = () => (
  <Routes>
    <Route path="/" element={<OrdersIndex />}>
      <Route index element={<Orders />} />
      <Route path="new" element={<OrderAddIndex />} />
      <Route path="edit/:id" element={<OrderEditIndex />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  </Routes>
);

export default OrdersRoutes;
