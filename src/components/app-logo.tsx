import {Badge, type BadgeProps} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {Link, type To} from 'react-router-dom';
import {Path} from '~/config/path';
import {SERVICE_NAME} from '~/config/system';
import {classNames} from '~/util';

type AppLogoProps = {
  className?: string;
  badge?: string;
  navigateTo?: To;
};

const badgeVariantConfigs: {
  variant?: BadgeProps['variant'];
  gradient?: BadgeProps['gradient'];
}[] = [
  {variant: 'gradient', gradient: {from: 'grape', to: 'indigo', deg: 171}},
  {variant: 'outline'},
];

const badgeProps = badgeVariantConfigs[Math.floor(Math.random() * badgeVariantConfigs.length)];

const AppLogo = ({className = '', badge, navigateTo = Path.HOMEPAGE}: AppLogoProps) => {
  const {t} = useTranslation();

  return (
    <h1 className={classNames(badge ? 'gap-2 leading-none sm:flex' : '', className)}>
      <Link
        to={navigateTo}
        className="link-unstyled font-handwriting font-normal transition-all hover:drop-shadow-md"
      >
        {t('common.appName') || SERVICE_NAME}
      </Link>
      {badge && (
        <Badge
          className="hidden cursor-default self-end opacity-80 hover:opacity-100 sm:block"
          size="sm"
          radius="sm"
          {...badgeProps}
        >
          {badge}
        </Badge>
      )}
    </h1>
  );
};

export default AppLogo;
