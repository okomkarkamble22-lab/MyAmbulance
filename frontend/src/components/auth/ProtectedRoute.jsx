import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../common/Loader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
