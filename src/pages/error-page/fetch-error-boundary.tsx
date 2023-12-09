import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorPage from './error-page';
import {IconRefresh, IconSatellite} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import type {AxiosError} from 'axios';
import {ErrorCode} from '~/types/notification';
import {useLocation} from 'react-router-dom';

const FetchErrorBoundary = ({children}: PropsWithChildren) => {
  const {reset} = useQueryErrorResetBoundary();
  const {t} = useTranslation();
  const {pathname} = useLocation();

  return (
    <ErrorBoundary
      key={pathname} // reset error boundary when route changes
      onReset={reset}
      fallbackRender={({error, resetErrorBoundary}) => {
        const errorExpose = error as AxiosError;

        return (
          <ErrorPage
            icon={<IconSatellite size="4rem" />}
            message={
              Object.values<unknown>(ErrorCode).includes(errorExpose?.code)
                ? errorExpose?.message || undefined
                : undefined
            }
          >
            <div className="text-center">
              <button
                className="button-secondary w-32 justify-center"
                onClick={() => resetErrorBoundary()}
              >
                <IconRefresh size="1rem" /> {t('common.tryAgain')}
              </button>
            </div>
          </ErrorPage>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default FetchErrorBoundary;
