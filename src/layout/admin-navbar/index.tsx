import {AppShell, ScrollArea} from '@mantine/core';
import {adminNavbarConfig} from '~/config/admin-navbar';
import LinksGroup from './NavbarItemGroup';

export default function AdminNavbar() {
  const renderNavbarItems = adminNavbarConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <AppShell.Navbar>
      <AppShell.Section grow component={ScrollArea}>
        {renderNavbarItems}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
