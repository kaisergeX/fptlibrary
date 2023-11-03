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
    <div
      className={classNames(
        'book-card relative flex w-full items-stretch transition-shadow lg:items-center',
        className,
      )}
    >
      <div className="flex basis-2/5 items-center self-center sm:h-full sm:basis-1/2">
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
          'flex w-80 flex-col justify-between gap-4 rounded-lg p-4 transition-colors duration-300',
          'bg-zinc-50/10 text-black hover:bg-slate-100 dark:bg-zinc-900/10 dark:text-zinc-200 dark:hover:bg-[#1a1a1a] lg:bg-transparent',
          'basis-3/5 sm:basis-1/2 lg:h-[calc(100%-4rem)]',
        )}
      >
        <div>
          <Link className="text-inherit hover:text-blue-400" to="#">
            <h3 className="line-clamp-2 text-base font-bold lg:line-clamp-3 lg:text-xl">{name}</h3>
          </Link>
          {author && (
            <Link className="italic text-inherit hover:text-blue-400" to="#">
              {author}
            </Link>
          )}
          {summary && <p className="mt-4 line-clamp-2 text-gray-500 lg:line-clamp-6">{summary}</p>}
        </div>

        <button className="button-secondary justify-center" type="button" onClick={onActionClick}>
          <IconBook2 /> {t('common.rent')}
        </button>
      </article>
    </div>
  );
};

export default BookCard;
