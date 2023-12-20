import {Badge, Tooltip} from '@mantine/core';
import {
  IconMoodKid,
  IconRating12Plus,
  IconRating18Plus,
  IconRating21Plus,
  type TablerIconsProps,
} from '@tabler/icons-react';
import type {ReactNode} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import type {Book} from '~/types';
import {classNames} from '~/util';

type AgeTagsComponentProps =
  | {
      className?: string;
      data?: Book['ageTag'];
      type?: 'icon';
      iconProps?: TablerIconsProps;
      disabledTooltip?: boolean;
    }
  | {
      className?: string;
      data?: Book['ageTag'];
      type: 'badge';
      iconProps?: never;
      disabledTooltip?: never;
    };

const ageTagIcons = (iconProps?: TablerIconsProps): {name: string; icon: ReactNode}[] => [
  {
    name: 'children',
    icon: (
      <IconMoodKid
        {...iconProps}
        className={classNames('text-green-600', iconProps?.className || '')}
      />
    ),
  },
  {
    name: 'teen',
    icon: (
      <IconRating12Plus
        {...iconProps}
        className={classNames('text-cyan-600', iconProps?.className || '')}
      />
    ),
  },
  {
    name: 'young_adults',
    icon: (
      <IconRating18Plus
        {...iconProps}
        className={classNames('text-violet-400', iconProps?.className || '')}
      />
    ),
  },
  {name: 'adult', icon: <IconRating21Plus {...iconProps} />},
];

export default function AgeTags({
  className = '',
  data,
  type = 'icon',
  iconProps,
  disabledTooltip = false,
}: AgeTagsComponentProps) {
  const {t} = useTranslation();
  if (!data?.id) {
    return undefined;
  }

  const ageTagName = data.ageTagName;
  const renderAgeTags = () => {
    if (type === 'badge') {
      return (
        <Badge variant="outline" className="cursor-default">
          <Trans t={t}>ageTag.{ageTagName}</Trans>
        </Badge>
      );
    }

    const renderAgeTagIcons = ageTagIcons(iconProps).find(({name}) => name === ageTagName)?.icon;

    return renderAgeTagIcons ? (
      <Tooltip label={<Trans t={t}>ageTag.{ageTagName}</Trans>} disabled={disabledTooltip}>
        {renderAgeTagIcons}
      </Tooltip>
    ) : (
      <Badge variant="outline" className="cursor-default">
        <Trans t={t}>ageTag.{ageTagName}</Trans>
      </Badge>
    );
  };

  return <div className={className}>{renderAgeTags()}</div>;
}
