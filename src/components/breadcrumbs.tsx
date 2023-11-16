import {Breadcrumbs, Button} from '@mantine/core';
import {Link} from 'react-router-dom';
import type {BreadcrumbsOptions} from '~/types';
import {classNames} from '~/util';

const BreadcrumbsCustom = ({
  className = '',
  data,
  separator,
}: {className?: string} & BreadcrumbsOptions) => {
  const renderBreadcrumb = data.map(({title, url}, index) => (
    <Button
      key={index}
      className={url ? '' : 'dark:text-gray-400'}
      component={Link}
      to={url || '#'}
      size="compact-sm"
      variant="subtle"
      disabled={!url}
    >
      {title}
    </Button>
  ));

  return (
    <Breadcrumbs className={classNames('mb-4', className)} separator={separator}>
      {renderBreadcrumb}
    </Breadcrumbs>
  );
};

export default BreadcrumbsCustom;
