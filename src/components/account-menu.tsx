import {ActionIcon, Avatar, Menu} from '@mantine/core';
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
import {Link, useNavigate} from 'react-router-dom';
import {Path, SEARCH_PARAMS} from '~/config/path';
import {usePersistStore, useStorage} from '~/store';

export default function AccountMenu() {
  const navigate = useNavigate();
  const {isAuthenticated, resetAuthStore, setBooks} = usePersistStore();
  const {userInfo, resetUserStore} = useStorage((state) => ({
    userInfo: state.userInfo,
    resetUserStore: state.resetUserStore,
  }));

  const handleLogout = () => {
    resetAuthStore();
    resetUserStore();
    setBooks([]);
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
            src={
              'https://lh3.googleusercontent.com/a/ACg8ocLqDxbDsaLm7Xn_v2DbMzPQ3sDK5sED6zNrgamQPaoUYGA=s96-c'
            }
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
          <div className="px-3 py-2">
            <h3 className="text-base font-bold">{userInfo.name || 'Kai'}</h3>
            <p className="text-sm text-slate-500 dark:text-inherit">
              {userInfo.email || 'test@gmail.com'}
            </p>
          </div>
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
        {isAuthenticated && (
          <>
            <Menu.Item
              leftSection={<IconUser size="1.2rem" />}
              className="link-unstyled"
              component={Link}
              to={Path.PERSONAL}
            >
              {t('account.pageTitle')}
            </Menu.Item>
            <Menu.Item
              leftSection={<IconLayoutDashboard size="1.2rem" />}
              className="link-unstyled"
              component={Link}
              to={Path.CMS_DASHBOARD}
            >
              {t('common.management')}
            </Menu.Item>
          </>
        )}

        <Menu.Item
          leftSection={<IconSettings size="1.2rem" />}
          component={Link}
          className="link-unstyled"
          to={Path.HIDDEN_FEATURES}
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
                search: `${SEARCH_PARAMS.REDIRECT_URL}=${location.pathname}`,
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
