import {ThemeIcon, NavLink} from '@mantine/core';
import {Link, useLocation, useResolvedPath} from 'react-router-dom';
import type {NavbarLink} from '~/types/layout';
import {renderNavbarItem} from './NavbarItem';

const LinksGroup = ({
  icon: Icon,
  label: groupLabel,
  link: groupLink,
  children: groupChildren,
  content: groupContent,
  disabled: groupDisabled,
  ...props
}: NavbarLink) => {
  const {pathname} = useLocation();
  const {pathname: pathNameGroupResolved} = useResolvedPath(groupLink || '#');
  const isGroupActive =
    pathname === pathNameGroupResolved ||
    (pathname.startsWith(pathNameGroupResolved) &&
      pathname.charAt(pathNameGroupResolved.length) === '/');

  if (groupContent) {
    return <>{groupContent}</>;
  }

  if (groupDisabled || !groupLink) {
    return (
      <NavLink
        className="mb-0.5 py-3 font-medium text-inherit"
        classNames={{label: 'text-base'}}
        label={groupLabel}
        leftSection={
          <ThemeIcon variant="light" size="1.8rem">
            <Icon size="1.5rem" />
          </ThemeIcon>
        }
        disabled
      />
    );
  }

  return (
    <NavLink
      className="mb-0.5 mt-1 py-3 font-medium"
      classNames={{label: 'text-base'}}
      component={Link}
      to={groupLink}
      label={groupLabel}
      childrenOffset="1.5rem"
      leftSection={
        <ThemeIcon variant={isGroupActive ? 'white' : 'light'} size="1.8rem">
          <Icon size="1.5rem" />
        </ThemeIcon>
      }
      variant={groupChildren ? 'light' : 'filled'}
      active={isGroupActive}
      defaultOpened={isGroupActive}
      referrerPolicy="no-referrer"
      {...props}
    >
      {renderNavbarItem(groupLink, groupChildren)}
    </NavLink>
  );
};

export default LinksGroup;
