import {Badge} from '@mantine/core';
import {
  IconRating12Plus,
  IconRating18Plus,
  IconRating21Plus,
  type TablerIconsProps,
} from '@tabler/icons-react';
import type {ReactNode} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import type {AgeTag} from '~/types';

type AgeTagsComponentProps =
  | {
      className?: string;
      data: AgeTag;
      type?: 'icon';
      iconProps?: TablerIconsProps;
    }
  | {
      className?: string;
      data: AgeTag;
      type: 'badge';
      iconProps?: never;
    };

const ageTagIcons = (iconProps?: TablerIconsProps): {name: string; icon: ReactNode}[] => [
  {name: 'teen', icon: <IconRating12Plus {...iconProps} />},
  {name: 'young_adults', icon: <IconRating18Plus {...iconProps} />},
  {name: 'adult', icon: <IconRating21Plus {...iconProps} />},
];

export default function AgeTags({
  className = '',
  data: {ageTagName},
  type = 'icon',
  iconProps,
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

    return (
      ageTagIcons(iconProps).find(({name}) => name === ageTagName)?.icon || (
        <Badge variant="outline" className="cursor-default">
          <Trans t={t}>ageTag.{ageTagName}</Trans>
        </Badge>
      )
    );
  };

  return <div className={className}>{renderAgeTags()}</div>;
}
