import {IconLoader2} from '@tabler/icons-react';
import type {PropsWithChildren, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {classNames} from '~/util';

const CommonLoading = ({
  className = '',
  image,
  children,
}: PropsWithChildren<{className?: string; image?: ReactNode}>) => {
  const {t} = useTranslation();

  return (
    <div className={classNames('flex-center flex-col gap-2', className)}>
      {image || <IconLoader2 className="animate-spin" />}
      <p>{children || t('common.loading')}</p>
    </div>
  );
};

export default CommonLoading;
