import {useWindowScroll} from '@mantine/hooks';
import type {PropsWithChildren} from 'react';
import BreadcrumbsCustom from '~/components/breadcrumbs';
import type {BreadcrumbsOptions} from '~/types';
import {classNames} from '~/util';

type CommonHeaderProps = {
  className?: string;
  title?: string;
  breadcrumbData?: BreadcrumbsOptions['data'];
};
const CommonHeader = ({
  className = '',
  title,
  children,
  breadcrumbData,
}: PropsWithChildren<CommonHeaderProps>) => {
  const [{y}] = useWindowScroll();

  return (
    <div
      className={classNames(
        'sticky top-[calc(var(--app-shell-header-height)-3rem)] z-10 transition-[top] hover:top-[calc(var(--app-shell-header-height))]',
        '-mx-4 -mt-4 bg-white p-4 dark:bg-[#1A1B1E]',
        y > 48 ? ' shadow-[0_8px_5px_-5px] shadow-slate-100 dark:shadow-none' : '',
        className,
      )}
    >
      {breadcrumbData && (
        <BreadcrumbsCustom
          className={classNames('-ml-2 transition-[margin]', y > 48 ? 'mb-6' : '')}
          data={breadcrumbData}
        />
      )}
      <div className="flex-center-between">
        <h2 className="font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default CommonHeader;
