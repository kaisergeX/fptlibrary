import {Badge, Tooltip} from '@mantine/core';
import {
  IconRating12Plus,
  IconRating18Plus,
  IconRating21Plus,
  type TablerIconsProps,
} from '@tabler/icons-react';
import type {ReactNode} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import type {AgeTag} from '~/types';
import {classNames} from '~/util';

type AgeTagsComponentProps =
  | {
      className?: string;
      data: AgeTag;
      type?: 'icon';
      iconProps?: TablerIconsProps;
      disabledTooltip?: boolean;
    }
  | {
      className?: string;
      data: AgeTag;
      type: 'badge';
      iconProps?: never;
      disabledTooltip?: never;
    };

const ageTagIcons = (iconProps?: TablerIconsProps): {name: string; icon: ReactNode}[] => [
  {
    name: 'teen',
    icon: (
      <IconRating12Plus
        {...iconProps}
        className={classNames('text-green-600', iconProps?.className || '')}
      />
    ),
  },
  {
    name: 'young_adults',
    icon: (
      <IconRating18Plus
        {...iconProps}
        className={classNames('text-cyan-600', iconProps?.className || '')}
      />
    ),
  },
  {name: 'adult', icon: <IconRating21Plus {...iconProps} />},
];

export default function AgeTags({
  className = '',
  data: {ageTagName},
  type = 'icon',
  iconProps,
  disabledTooltip = false,
}: AgeTagsComponentProps) {
  const {t} = useTranslation();

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
