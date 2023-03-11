import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {AuthState} from './types/auth.types';

interface RootState {
  auth: AuthState;
  // Other slices of state...
}
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();

  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
