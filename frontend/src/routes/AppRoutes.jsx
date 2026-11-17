// Declares placeholder routes grouped by interface type.
import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import PatientLayout from '../layouts/PatientLayout.jsx';
import DriverLayout from '../layouts/DriverLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import LandingPage from '../pages/public/LandingPage.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import PatientDashboardPage from '../pages/patient/PatientDashboardPage.jsx';
import DriverDashboardPage from '../pages/driver/DriverDashboardPage.jsx';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import NotFoundPage from '../pages/public/NotFoundPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<LandingPage />} />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
    <Route path="/patient" element={<PatientLayout />}>
      <Route index element={<PatientDashboardPage />} />
    </Route>
    <Route path="/driver" element={<DriverLayout />}>
      <Route index element={<DriverDashboardPage />} />
    </Route>
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
    </Route>
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default AppRoutes;
