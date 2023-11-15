import {AppShell, ScrollArea} from '@mantine/core';
import {adminNavbarConfig, exampleNavbarConfig} from '~/config/admin-navbar';
import LinksGroup from './NavbarItemGroup';

export default function AdminNavbar() {
  const renderNavbarItems = adminNavbarConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const renderExampleNavbar = exampleNavbarConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <AppShell.Navbar>
      {/* <Navbar.Section className="overflow-y-auto" grow> */}
      <AppShell.Section grow component={ScrollArea}>
        {renderNavbarItems}
      </AppShell.Section>

      <AppShell.Section className="border-t border-neutral-200">
        <div className="m-4 font-semibold">⭐ Demo section</div>
        {renderExampleNavbar}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
