import {Navigate, Outlet} from 'react-router-dom';
import {Path} from '~/config/path';

const PrivateOutlet = () => {
  const role = 'admin';
  const permissionDenied = role !== 'admin';
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={Path.LOGIN} replace />;
  }

  if (permissionDenied) {
    return <Navigate to={Path.PERMISSION_DENIED} replace />;
  }

  return <Outlet />;
};

export default PrivateOutlet;
