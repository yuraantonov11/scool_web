import { lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import LoginIndex from './auth/login';
import Page404 from './404';
import OrdersRoutes from './orders/Routes';

const ProductsRoutes = lazy(() => import('./products/Routes'));
const InvoicesRoutes = lazy(() => import('./invoices/Routes'));
const SettingsRoutes = lazy(() => import('./settings/Routes'));

import { Layout } from './shared/layout/components/Layout';
import Suspense from './shared/suspense/Suspense';
import RequireAuth from './shared/require-auth/RequireAuth';

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="requests/*" element={<OrdersRoutes />} />
        <Route
          path="products/*"
          element={
            <Suspense>
              <ProductsRoutes />
            </Suspense>
          }
        />
        <Route
          path="receipts/*"
          element={
            <Suspense>
              <InvoicesRoutes />
            </Suspense>
          }
        />
        <Route
          path="configuration/*"
          element={
            <Suspense>
              <SettingsRoutes />
            </Suspense>
          }
        />
        <Route index element={<Navigate to="requests" />} />
      </Route>
      <Route
        path="login"
        element={
          <Suspense>
            <LoginIndex />
          </Suspense>
        }
      />
      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Router;
