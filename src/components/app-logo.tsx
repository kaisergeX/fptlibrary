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
  showText?: boolean;
};

const badgeVariantConfigs: {
  variant?: BadgeProps['variant'];
  gradient?: BadgeProps['gradient'];
}[] = [
  {variant: 'gradient', gradient: {from: 'grape', to: 'indigo', deg: 171}},
  {variant: 'outline'},
];

const badgeProps = badgeVariantConfigs[Math.floor(Math.random() * badgeVariantConfigs.length)];

const AppLogo = ({
  className = '',
  badge,
  navigateTo = Path.HOMEPAGE,
  showText = false,
}: AppLogoProps) => {
  const {t} = useTranslation();

  return (
    <h1
      className={classNames(badge ? 'flex h-full items-center gap-2 leading-none' : '', className)}
    >
      <Link
        to={navigateTo}
        className={classNames(
          'link-unstyled transition-all hover:drop-shadow-md',
          showText ? 'font-handwriting font-normal' : '',
        )}
      >
        {showText ? (
          t('common.appName') || SERVICE_NAME
        ) : (
          <img
            className="block h-full min-h-[2.5rem] object-contain object-center dark:invert"
            src="/image/cudek.svg"
            alt={SERVICE_NAME}
          />
        )}
      </Link>
      {badge && (
        <Badge
          className="mb-4 hidden cursor-default self-end opacity-80 hover:opacity-100 sm:block"
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
