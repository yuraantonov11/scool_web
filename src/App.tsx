import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound/NotFound';

/**
 * Top level application router
 *
 * @returns {Component}
 */
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      {/*<Route path='/create-account' element={<CreateAccount />} />*/}
      <Route path='/login' element={<LoginPage />} />
      {/* Private Route */}
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default App;
