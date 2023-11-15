import {ActionIcon} from '@mantine/core';
import {IconSearch} from '@tabler/icons-react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Path} from '~/config/path';
import AppLogo from '../components/app-logo';
import {memo} from 'react';
import BooksPopover from '../components/book/books-popover';
import AccountMenu from '~/components/account-menu';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <nav className="glass flex-center-between sticky inset-x-0 top-0 z-10 gap-4 p-4">
      <AppLogo />

      <div className="flex-center gap-4">
        {pathname.toLowerCase() === Path.BOOK_BROWSING.toLowerCase() || (
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            aria-label="Search book"
            className="dark:text-inherit"
            onClick={() => navigate(Path.BOOK_BROWSING)}
          >
            <IconSearch />
          </ActionIcon>
        )}

        <BooksPopover />

        <AccountMenu />
      </div>
    </nav>
  );
};

const Navbar = memo(NavbarComponent);
export default Navbar;
