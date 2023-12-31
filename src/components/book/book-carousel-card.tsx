import {Badge, Button, Image, type ImageProps} from '@mantine/core';
import {IconCheck, IconTags} from '@tabler/icons-react';
import {IconBook2} from '@tabler/icons-react';
import {Trans, useTranslation} from 'react-i18next';
import {Link, generatePath} from 'react-router-dom';
import {Path} from '~/config/path';
import {usePersistStore} from '~/store';
import type {Book, Genre} from '~/types';
import {classNames, strReplaceSpace} from '~/util';
import AgeTags from './age-tags';
import {BookStatus} from '~/constants';
import {useMemo} from 'react';

type BookCarouselCardProps = {
  className?: string;
  data: Book;
  priorityGenre?: Genre['id'];
  coverProps?: Omit<ImageProps, 'src'> & {alt?: string};
  onActionClick?: () => void;
};

const BookCarouselCard = ({
  className = '',
  data,
  priorityGenre,
  onActionClick,
  coverProps,
}: BookCarouselCardProps) => {
  const {t} = useTranslation();
  const {id, title, author, cover, summary, genre, ageTag, status} = data;
  const [isBookAdded, addBook] = usePersistStore((state) => [
    state.books.includes(id),
    state.addBook,
  ]);

  const renderGenres = useMemo(() => {
    const processedGenres: Genre[] = genre.slice();
    const priorityGenreIndex = genre.findIndex(({id}) => id === priorityGenre);
    if (priorityGenreIndex > -1) {
      processedGenres.unshift(processedGenres.splice(priorityGenreIndex, 1)[0]); // move `priorityGenre` to the first
    }

    return processedGenres.slice(0, 2).map(({id, genreName}) => (
      <Badge key={id} className="max-w-[32vw] cursor-default" variant="outline">
        <Trans t={t}>genre.{genreName}</Trans>
      </Badge>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, priorityGenre]);

  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
      return;
    }

    addBook(id);
  };

  return (
    <div
      className={classNames(
        'book-card relative flex w-full items-stretch transition-shadow lg:items-center',
        className,
      )}
    >
      <Link
        className="flex-center basis-2/5 self-center sm:h-full sm:basis-1/2"
        to={{pathname: generatePath(Path.BOOK_DETAIL, {id})}}
      >
        <Image
          className="aspect-[1/1.5] max-h-full w-full rounded-lg object-cover object-center"
          src={cover}
          fallbackSrc={`https://placehold.co/300x450?text=${strReplaceSpace(title, {
            everyNthSpace: 2,
          })}`}
          alt={`Book cover - ${title}`}
          loading="lazy"
          {...coverProps}
        />
      </Link>
      <article
        className={classNames(
          'flex w-80 flex-col justify-between gap-4 rounded-lg p-2 transition-colors duration-300 sm:min-h-[calc(40vh-4rem)] sm:p-4',
          'bg-zinc-50/10 text-black hover:bg-slate-100 dark:bg-zinc-900/10 dark:text-zinc-200 dark:hover:bg-[#1a1a1a] lg:bg-transparent',
          'basis-3/5 sm:basis-1/2',
        )}
      >
        <div>
          <div className="flex justify-between gap-2">
            <Link className="link-secondary" to={{pathname: generatePath(Path.BOOK_DETAIL, {id})}}>
              <h3 className="line-clamp-2 text-base font-bold lg:line-clamp-3 lg:text-xl">
                {title}
              </h3>
            </Link>
            <AgeTags data={ageTag} iconProps={{className: 'sm:h-8 sm:w-8', strokeWidth: 1.5}} />
          </div>
          {author && <div className="italic">{author}</div>}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <IconTags size="1.2rem" />
            {renderGenres}
          </div>

          <p className="mt-4 line-clamp-2 cursor-default text-gray-500 max-sm:text-sm 2xl:line-clamp-6">
            {summary}
          </p>
        </div>

        {isBookAdded ? (
          <Button leftSection={<IconCheck className="text-green-500" />} radius="md" disabled>
            {t('book.selected')}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleAction}
            leftSection={status === BookStatus.AVAILABLE && <IconBook2 />}
            radius="md"
            disabled={status !== BookStatus.AVAILABLE}
          >
            {status === BookStatus.AVAILABLE ? t('book.select') : t('book.existed.rented')}
          </Button>
        )}
      </article>
    </div>
  );
};

export default BookCarouselCard;
