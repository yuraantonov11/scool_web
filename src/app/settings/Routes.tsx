import { Navigate, Route, Routes } from 'react-router-dom';
import UserSettings from './user';

const SettingsRoutes = () => (
  <Routes>
    <Route path="/">
      <Route path="user" element={<UserSettings />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  </Routes>
);

export default SettingsRoutes;
