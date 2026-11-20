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
import UnauthorizedPage from '../pages/public/UnauthorizedPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage.jsx';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage.jsx';
import ProfilePage from '../pages/profile/ProfilePage.jsx';
import ProtectedRoute from '../components/auth/ProtectedRoute.jsx';
import HospitalLayout from '../layouts/HospitalLayout.jsx';
import HospitalDashboardPage from '../pages/hospital/HospitalDashboardPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<LandingPage />} />
    </Route>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Navigate to="/login/user" replace />} />
      <Route path="/login/user" element={<LoginPage expectedRole="USER" />} />
      <Route path="/login/driver" element={<LoginPage expectedRole="DRIVER" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Route>
    <Route element={<ProtectedRoute roles={['PATIENT']} />}>
      <Route path="/patient" element={<PatientLayout />}>
      <Route index element={<PatientDashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute roles={['DRIVER']} />}>
      <Route path="/driver" element={<DriverLayout />}>
      <Route index element={<DriverDashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute roles={['HOSPITAL']} />}>
      <Route path="/hospital" element={<HospitalLayout />}>
        <Route index element={<HospitalDashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute roles={['ADMIN']} />}>
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default AppRoutes;
