import {Navigate, Outlet, useSearchParams} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';

const AuthOutlet = () => {
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get(SEARCH_PARAMS.REDIRECT_URL) || Path.HOMEPAGE;

  if (isAuthenticated) {
    return <Navigate to={redirectUrl} replace />;
  }

  return <Outlet />;
};

export default AuthOutlet;
