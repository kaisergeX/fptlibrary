import {useWindowScroll} from '@mantine/hooks';
import type {PropsWithChildren} from 'react';
import BreadcrumbsCustom from '~/components/breadcrumbs';
import type {BreadcrumbsOptions} from '~/types';

const CommonHeader = ({
  title,
  children,
  breadcrumbData,
}: PropsWithChildren<{title?: string; breadcrumbData?: BreadcrumbsOptions['data']}>) => {
  const [{y}] = useWindowScroll();

  return (
    <div
      className={`sticky top-[calc(var(--mantine-header-height)-3rem)] z-10
        -mx-4 -mt-4 bg-white p-4 transition-[top] hover:top-[calc(var(--mantine-header-height))] dark:bg-[#1A1B1E]${
          y > 48 ? ' shadow-[0_8px_5px_-5px] shadow-slate-100 dark:shadow-none' : ''
        }`}
    >
      {breadcrumbData && <BreadcrumbsCustom className="-ml-2" data={breadcrumbData} />}
      <div className="flex-center-between">
        <h2 className="font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default CommonHeader;
