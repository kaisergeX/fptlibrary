import {Navigate, Outlet} from 'react-router-dom';
import {Path} from '~/constants/path';
import {useAuth} from '~/hooks';

const PrivateOutlet = () => {
  const {isAuthenticated} = useAuth();
  const permissionDenied = false;

  // if (!isAuthenticated) {
  //   return <Navigate to={Path.LOGIN_PAGE} replace />;
  // }

  if (permissionDenied) {
    return <Navigate to={Path.PERMISSION_DENIED_PAGE} replace />;
  }

  return <Outlet />;
};

export default PrivateOutlet;
