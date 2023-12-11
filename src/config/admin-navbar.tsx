import {Chip} from '@mantine/core';
import {
  IconBooks,
  IconCalendarStats,
  IconComponents,
  IconGauge,
  IconLock,
  IconUsers,
} from '@tabler/icons-react';
import {t} from 'i18next';
import GoogleLogo from '~/assets/GoogleLogo';
import {Path} from '~/config/path';
import {NavItemBadge, NavItemExternalLink} from '~/layout/admin-navbar/NavbarItemCustom';
import type {NavbarLink} from '~/types/layout';

export const adminNavbarConfig: NavbarLink[] = [
  {label: t('dashboard.pageTitle'), icon: IconGauge, link: Path.CMS_DASHBOARD},
  {
    label: t('bookBrowsing.pageTitle'),
    icon: IconBooks,
    link: Path.CMS_BOOK,
  },
  {
    label: t('users.pageTitle'),
    icon: IconUsers,
    link: Path.CMS_USERS,
  },
];

export const exampleNavbarConfig: NavbarLink[] = [
  {
    label: 'Demo UI',
    icon: IconComponents,
    link: Path.SETTING,
  },
  {
    label: 'Example',
    icon: IconCalendarStats,
    link: '/example',
    children: [
      {label: 'Upcoming example', link: '/upcoming', target: '_blank'},
      {
        label: 'A chip item 🤡',
        content: (
          <Chip className="py-4 pl-7" defaultChecked variant="filled">
            Some chip 🍟
          </Chip>
        ),
      },
      {
        label: 'Previous example',
        link: '/example/previous',
        disabled: true, // disable this item and all its children.
        children: [
          {
            label: 'A Tarnished of no renown. Cross the fog, to the Lands Between,...',
          },
        ],
      },
      {
        label: 'New example',
        link: '/example/new',
        children: [
          // prefer to use a full path instead? set isFullPath to true
          {label: 'Milestone', link: '/example/new/milestone', isFullPath: true},

          {label: 'Target', link: '/target'},
          {label: 'Others', link: '/others', disabled: true}, // disable deepest item.
        ],
      },
      {
        label: 'Nah, I prefer custom',
        link: '/custom-nav',

        // Allow to fully custom content of an item.
        // For case like need to show data from server, badge realtime notification, etc...
        content: NavItemBadge('Nah, I prefer CUSTOMIZATION.'),
      },
    ],
  },
  {
    label: 'Pending feature...',
    icon: IconLock,
    disabled: true, // disable the entire group.
    children: [
      {
        label: 'A child never sees the light.',
      },
    ],
  },
  {
    label: 'Google',
    icon: IconLock,
    content: NavItemExternalLink('LMGIFY', 'https://www.google.com/', <GoogleLogo />),
  },
];
