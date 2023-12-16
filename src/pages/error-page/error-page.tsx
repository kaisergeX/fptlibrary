import {IconFileAlert} from '@tabler/icons-react';
import type {PropsWithChildren, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {Head} from '~/layout/outlet/Head';
import {classNames} from '~/util';

type ErrorPageProps = {
  className?: string;
  message?: string;
  icon?: ReactNode;
  description?: ReactNode;
};

const ErrorPage = ({
  className = '',
  message = 'Oops!',
  icon,
  description,
  children,
}: PropsWithChildren<ErrorPageProps>) => {
  const {t} = useTranslation();

  return (
    <>
      <Head title={t('common.error.sthWrong.normal')} />
      <div className={classNames('flex-center h-full flex-col gap-3 p-3', className || 'bg-theme')}>
        <header className="text-center [&>*:first-child]:mx-auto">
          {icon || <IconFileAlert size="4rem" />}
          <h2 className="my-0">{message}</h2>
        </header>

        <main>
          <div className="mb-6 text-center">
            {description || <p className="mt-0">{t('common.error.sthWrong.action')}</p>}
          </div>

          {children}
        </main>
      </div>
    </>
  );
};

export default ErrorPage;
