import {Badge, Button} from '@mantine/core';
import type {ReactNode} from 'react';

export const NavItemExternalLink = (label: string, link: string, leftSection?: ReactNode) => (
  <Button
    component="a"
    href={link}
    className="text-base"
    size="lg"
    leftSection={leftSection}
    variant="subtle"
    target="_blank"
    referrerPolicy="no-referrer"
    fullWidth
  >
    {label}
  </Button>
);

export const NavItemBadge = (label: string) => (
  <div className="py-2 pl-7 pr-4">
    <Badge variant="gradient" gradient={{from: 'teal', to: 'lime', deg: 105}} fullWidth>
      {label}
    </Badge>
  </div>
);
