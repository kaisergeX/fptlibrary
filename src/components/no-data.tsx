import {IconDatabaseSearch} from '@tabler/icons-react';
import type {PropsWithChildren, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from '~/util';

const NoData = ({
  className = '',
  image,
  children,
}: PropsWithChildren<{className?: string; image?: ReactNode}>) => {
  const {t} = useTranslation();

  return (
    <div className={classNames('text-center', className)}>
      {image || <IconDatabaseSearch className="my-4 inline-block opacity-50" size="4rem" />}
      <p>{children || t('common.noData')}</p>
    </div>
  );
};

export default NoData;
