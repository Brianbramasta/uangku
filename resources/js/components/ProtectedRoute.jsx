import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('token');

  // Save current path before redirecting to login
  if (!isAuthenticated) {
    // Don't save login page as lastPath
    if (location.pathname !== '/login') {
      localStorage.setItem('lastPath', location.pathname);
      console.log('Saving lastPath:', location.pathname); // Debug log
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
