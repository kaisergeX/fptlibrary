import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorPage from './error-page';
import {IconRefresh, IconSatellite} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';

const FetchErrorBoundary = ({children}: PropsWithChildren) => {
  const {reset} = useQueryErrorResetBoundary();
  const {t} = useTranslation();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <ErrorPage icon={<IconSatellite size="4rem" />}>
          <div className="text-center">
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
      {children}
    </ErrorBoundary>
  );
};

export default FetchErrorBoundary;
