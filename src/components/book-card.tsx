import {Image, type ImageProps} from '@mantine/core';
import {IconBook2} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {classNames} from '~/util';

type BookCardProps = {
  className?: string;
  name: string;
  author?: string;
  summary?: string;
  cover: string;
  coverProps?: Omit<ImageProps, 'src'> & {alt?: string};
  onActionClick?: () => void;
};

const BookCard = ({
  className = '',
  name,
  author,
  cover,
  summary,
  onActionClick,
  coverProps,
}: BookCardProps) => {
  const {t} = useTranslation();

  return (
    <div className={classNames('flex items-stretch sm:items-center', className)}>
      <div className="flex items-center sm-only:flex-1 sm:h-full">
        <Image
          className="max-h-full rounded-lg"
          src={cover}
          fallbackSrc={`https://placehold.co/600x400?text=${name}`}
          alt={`Book cover - ${name}`}
          loading="lazy"
          {...coverProps}
        />
      </div>
      <article
        className={classNames(
          'flex w-80 flex-col justify-between gap-4 rounded-r-lg p-4 transition-colors duration-300 sm:h-[calc(100%-4rem)] sm:shadow-md',
          'hover:bg-slate-100 dark:shadow dark:hover:bg-[#1a1a1a] sm:dark:shadow-slate-100/20',
          'sm-only:flex-1',
        )}
      >
        <div>
          <Link className="text-inherit hover:text-blue-400" to="#">
            <h3 className="line-clamp-2 font-bold sm:line-clamp-3 sm:text-xl">{name}</h3>
          </Link>
          {author && (
            <Link className="italic text-inherit hover:text-blue-400" to="#">
              {author}
            </Link>
          )}
          {summary && <p className="mt-4 line-clamp-2 text-gray-500 sm:line-clamp-6">{summary}</p>}
        </div>

        <button className="button-secondary justify-center" type="button" onClick={onActionClick}>
          <IconBook2 /> {t('common.rent')}
        </button>
      </article>
    </div>
  );
};

export default BookCard;
