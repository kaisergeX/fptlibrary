import {Navigate, Outlet} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';

const PrivateOutlet = () => {
  const permissionDenied = false;
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: Path.LOGIN,
          search: `${SEARCH_PARAMS.REDIRECT_URL}=${location.pathname}`,
        }}
        replace
      />
    );
  }

  if (permissionDenied) {
    return <Navigate to={Path.PERMISSION_DENIED} replace />;
  }

  return <Outlet />;
};

export default PrivateOutlet;
