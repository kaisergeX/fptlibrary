import {AppShell, Burger, LoadingOverlay} from '@mantine/core';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore} from '~/store';
import {useDisclosure} from '@mantine/hooks';
import AppLogo from '~/components/app-logo';
import AccountMenu from '~/components/account-menu';
import AdminNavbar from '../admin-navbar';
import {Suspense} from 'react';
import useAuth from '~/hook/useAuth';
import {Role} from '~/types/store';

const CMSOutlet = () => {
  const isAuthenticated = usePersistStore((state) => state.isAuthenticated);
  const {userInfo, isLoadingUserInfo} = useAuth();
  const permissionDenied = isLoadingUserInfo ? false : userInfo.role !== Role.ADMIN;
  const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
  const {pathname} = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: Path.LOGIN,
          search: `${SEARCH_PARAMS.REDIRECT_URL}=${pathname}`,
        }}
        replace
      />
    );
  }

  if (permissionDenied) {
    return <Navigate to={Path.PERMISSION_DENIED} replace />;
  }

  return (
    <AppShell
      header={{height: 60}}
      navbar={{
        width: {base: 250},
        breakpoint: 'sm',
        collapsed: {mobile: !mobileOpened},
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className="flex-center-between h-full gap-4 px-4">
          <div className="flex h-full items-center gap-4">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <AppLogo
              className="xl:text-3xl"
              navigateTo={Path.CMS_DASHBOARD}
              badge="Portal"
              showText
            />
          </div>

          <AccountMenu />
        </div>
      </AppShell.Header>

      <AdminNavbar />

      <AppShell.Main className="h-[100dvh]">
        <Suspense
          fallback={
            <LoadingOverlay
              overlayProps={{opacity: 0.3}}
              transitionProps={{duration: 500}}
              visible
            />
          }
        >
          <div className="container m-auto h-full">
            <Outlet />
          </div>
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};

export default CMSOutlet;
