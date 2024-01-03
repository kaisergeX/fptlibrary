import {memo, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import AppLogo from '../components/app-logo';
import BooksPopover from '../components/book/books-popover';
import AccountMenu from '~/components/account-menu';
import NavbarSearchButton from '~/components/navbar-search-button';
import {Path} from '~/config/path';
import {classNames} from '~/util';
import ModalMembership from '~/components/modals/modal-membership';
import {useTranslation} from 'react-i18next';
import {openNavbarMembershipModal} from '~/store';

export default memo(function Navbar() {
  const {pathname} = useLocation();
  const isBookBrowsingPage = pathname.toLowerCase() === Path.BOOK_BROWSING.toLowerCase();
  const {t} = useTranslation();

  useEffect(() => {
    return () => {
      if (openNavbarMembershipModal.value) {
        openNavbarMembershipModal.value = false;
      }
    };
  }, []);

  return (
    <nav
      className={classNames(
        'flex-center-between sticky inset-x-0 top-0 z-10 gap-4 px-4',
        isBookBrowsingPage ? '' : 'glass',
      )}
    >
      <AppLogo />

      <div className="flex-center gap-4 py-4">
        {isBookBrowsingPage || <NavbarSearchButton />}

        <BooksPopover />

        <AccountMenu />
      </div>

      <ModalMembership
        title={t('users.extendExpireDate')}
        opened={openNavbarMembershipModal.value}
        onClose={() => (openNavbarMembershipModal.value = false)}
        zIndex={301}
      />
    </nav>
  );
});
