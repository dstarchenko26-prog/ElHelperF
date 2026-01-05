import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import Spinner from '../ui/feedback/Spinner';

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size='xl'/>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};

export default AdminRoute;