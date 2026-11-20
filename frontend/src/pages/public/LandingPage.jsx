import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../../components/common/Loader.jsx';

const LandingPage = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return <Navigate to={user ? `/${user.role.toLowerCase()}` : '/login'} replace />;
};
export default LandingPage;
