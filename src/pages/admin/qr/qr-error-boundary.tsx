import {IconRefresh, IconQrcodeOff, IconChevronLeft} from '@tabler/icons-react';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary';
import {useTranslation} from 'react-i18next';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Path} from '~/config/path';
import ErrorPage from '~/pages/error-page';

export default function QRErrorBoundary() {
  const {reset} = useQueryErrorResetBoundary();
  const {t} = useTranslation();
  const {pathname} = useLocation();
  const navigate = useNavigate();

  return (
    <ErrorBoundary
      key={pathname} // reset error boundary when route changes
      onReset={reset}
      fallbackRender={({error: _, resetErrorBoundary}) => (
        <ErrorPage
          className="bg-default"
          icon={<IconQrcodeOff size="4rem" />}
          message={t('common.error.invalidQR.title')}
          description={t('common.error.invalidQR.message')}
        >
          <div className="flex-center gap-4">
            <button className="button" onClick={() => navigate(Path.CMS_BOOK)}>
              <IconChevronLeft size="1rem" /> {t('bookBrowsing.pageTitle')}
            </button>
            <button
              className="button-secondary w-32 justify-center"
              onClick={() => resetErrorBoundary()}
            >
              <IconRefresh size="1rem" /> {t('common.tryAgain')}
            </button>
          </div>
        </ErrorPage>
      )}
    >
      <Outlet />
    </ErrorBoundary>
  );
}
