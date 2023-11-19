import {ActionIcon, Menu} from '@mantine/core';
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
  const resetUserStore = useStorage((state) => state.resetUserStore);

  const handleLogout = () => {
    resetAuthStore();
    resetUserStore();
    setBooks([]);
    navigate(Path.HOMEPAGE);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          size="lg"
          radius="xl"
          aria-label="User Management"
          className="dark:text-inherit"
        >
          {isAuthenticated ? <IconUser /> : <IconUserQuestion />}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
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
              leftSection={<IconLayoutDashboard size="1.2rem" />}
              className="link-unstyled"
              component={Link}
              to={Path.CMS_DASHBOARD}
            >
              {t('common.management')}
            </Menu.Item>
            <Menu.Item
              leftSection={<IconUser size="1.2rem" />}
              className="link-unstyled"
              component={Link}
              to={Path.CMS_DASHBOARD}
              disabled
            >
              {t('account.pageTitle')}
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
