import type {ReactNode, HTMLAttributeAnchorTarget} from 'react';
import type {Icon as TablerIcon} from '@tabler/icons-react';

export type NavbarLinkChild = {
  label: string;
  content?: ReactNode;
  link?: string;
  target?: HTMLAttributeAnchorTarget;
  isFullPath?: boolean;

  children?: NavbarLinkChild[];
  disabled?: boolean;
};

export type NavbarLink = NavbarLinkChild & {
  icon: TablerIcon;
};
