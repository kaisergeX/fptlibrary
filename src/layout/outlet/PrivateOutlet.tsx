import {Navigate, Outlet} from 'react-router-dom';
import {Path} from '~/config/path';
import {usePersistStore} from '~/store';

const PrivateOutlet = () => {
  const permissionDenied = false;
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={Path.LOGIN} replace />;
  }

  if (permissionDenied) {
    return <Navigate to={Path.PERMISSION_DENIED} replace />;
  }

  return <Outlet />;
};

export default PrivateOutlet;
