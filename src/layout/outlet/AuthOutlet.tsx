import {Navigate, Outlet, useSearchParams} from 'react-router-dom';
import AppLogo from '~/components/app-logo';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';

const AuthOutlet = () => {
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get(SEARCH_PARAMS.REDIRECT_URL) || Path.HOMEPAGE;

  if (isAuthenticated) {
    return <Navigate to={redirectUrl} replace />;
  }

  return (
    <main className="bg-theme flex-center h-full flex-col">
      <div className="p-4 sm:w-full sm:max-w-lg">
        <AppLogo className="text-center" />

        <Outlet />
      </div>
    </main>
  );
};

export default AuthOutlet;
