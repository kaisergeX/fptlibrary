import {Suspense} from 'react';
import {LoadingOverlay} from '@mantine/core';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';
import Navbar from '../navbar';
import useAuth from '~/hook/useAuth';

// Private Outlet for all authenticated users (any roles).
const PrivateOutlet = () => {
  const location = useLocation();
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);
  const {userInfo, isLoadingUserInfo} = useAuth();
  const permissionDenied = isLoadingUserInfo ? false : !userInfo.id;

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

  return (
    <main className="flex h-[100dvh] flex-col">
      <Navbar />

      <Suspense
        fallback={
          <LoadingOverlay overlayProps={{opacity: 0.3}} transitionProps={{duration: 500}} visible />
        }
      >
        <div className="h-full">
          <Outlet />
        </div>
      </Suspense>
    </main>
  );
};

export default PrivateOutlet;
