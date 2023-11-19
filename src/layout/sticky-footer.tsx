import {useWindowScroll} from '@mantine/hooks';
import type {PropsWithChildren} from 'react';
import {classNames} from '~/util';

const StickyFooter = ({className = '', children}: PropsWithChildren<{className?: string}>) => {
  const [{y}] = useWindowScroll();

  return (
    <div
      className={classNames(
        'bg-default sticky bottom-0 -mx-4 p-4 dark:shadow-none',
        y > 0 ? 'shadow-[0_-8px_5px_-5px] shadow-slate-100' : '',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default StickyFooter;
