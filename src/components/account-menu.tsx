import {ActionIcon, Avatar, Menu, Tooltip} from '@mantine/core';
import {
  IconUser,
  IconUserQuestion,
  IconLayoutDashboard,
  IconSettings,
  IconLogout,
  IconLogin2,
  IconHome,
} from '@tabler/icons-react';
import {t} from 'i18next';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import useAuth from '~/hook/useAuth';
import {usePersistStore} from '~/store';
import {Role} from '~/types/store';

export default function AccountMenu() {
  const navigate = useNavigate();
  const {isAuthenticated, resetAuthStore} = usePersistStore();
  const {userInfo} = useAuth();
  const {pathname} = useLocation();

  const handleLogout = () => {
    resetAuthStore(); // this will remove user info, selected books from storage and call googleLogout function too.
    navigate(Path.HOMEPAGE);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        {isAuthenticated ? (
          <Avatar
            className="[&>.mantine-Avatar-placeholder]:text-theme cursor-pointer hover:bg-[--mantine-color-dark-light-hover]"
            variant="transparent"
            color="inherit"
            size={34}
            src={userInfo.avatar}
          >
            <IconUser />
          </Avatar>
        ) : (
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            aria-label="User Management"
            className="dark:text-inherit"
          >
            <IconUserQuestion />
          </ActionIcon>
        )}
      </Menu.Target>

      <Menu.Dropdown>
        {isAuthenticated && (
          <>
            <div className="px-3 py-2">
              <h3 className="truncate text-base font-bold">{userInfo.name}</h3>
              <Tooltip label={userInfo.email} openDelay={1000}>
                <p className="truncate text-xs text-slate-500 dark:text-inherit">
                  {userInfo.email}
                </p>
              </Tooltip>
            </div>
            <Menu.Divider />
          </>
        )}

        {isAuthenticated && (
          <>
            {userInfo.role === Role.ADMIN && (
              <Menu.Item
                leftSection={<IconLayoutDashboard size="1.2rem" />}
                className="link-unstyled"
                component={Link}
                to={Path.CMS_DASHBOARD}
              >
                {t('common.management')}
              </Menu.Item>
            )}
            <Menu.Item
              leftSection={<IconUser size="1.2rem" />}
              className="link-unstyled"
              component={Link}
              to={Path.PERSONAL}
            >
              {t('account.pageTitle')}
            </Menu.Item>
          </>
        )}

        <Menu.Label>{t('common.features')}</Menu.Label>
        <Menu.Item
          leftSection={<IconHome size="1.2rem" />}
          className="link-unstyled"
          component={Link}
          to={Path.HOMEPAGE}
        >
          {t('home.pageTitle')}
        </Menu.Item>

        <Menu.Item
          leftSection={<IconSettings size="1.2rem" />}
          component={Link}
          className="link-unstyled"
          to={Path.SETTING}
        >
          {t('setting.pageTitle')}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>{t('common.account')}</Menu.Label>
        {isAuthenticated ? (
          <Menu.Item color="red" leftSection={<IconLogout size="1.2rem" />} onClick={handleLogout}>
            {t('auth.signOut')}
          </Menu.Item>
        ) : (
          <Menu.Item
            className="font-semibold"
            color="teal"
            leftSection={<IconLogin2 size="1.2rem" />}
            onClick={() =>
              navigate({
                pathname: Path.LOGIN,
                search: `${SEARCH_PARAMS.REDIRECT_URL}=${pathname}`,
              })
            }
          >
            {t('auth.login')}
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
