import {Badge, Button, Image, type ImageProps} from '@mantine/core';
import {IconCheck, IconTags} from '@tabler/icons-react';
import {IconBook2} from '@tabler/icons-react';
import {Trans, useTranslation} from 'react-i18next';
import {Link, generatePath} from 'react-router-dom';
import {Path} from '~/config/path';
import {usePersistStore} from '~/store';
import type {Book} from '~/types';
import {classNames, strReplaceSpace} from '~/util';
import AgeTags from './age-tags';

type BookCarouselCardProps = {
  className?: string;
  data: Book;
  coverProps?: Omit<ImageProps, 'src'> & {alt?: string};
  onActionClick?: () => void;
};

const BookCarouselCard = ({
  className = '',
  data,
  onActionClick,
  coverProps,
}: BookCarouselCardProps) => {
  const {t} = useTranslation();
  const {id, title, author, cover, description, genre, ageTag} = data;
  const [isBookAdded, addBook] = usePersistStore((state) => [
    state.books.includes(id),
    state.addBook,
  ]);

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
      <div className="flex basis-2/5 items-center self-center sm:h-full sm:basis-1/2">
        <Image
          className="max-h-full rounded-lg"
          src={cover}
          fallbackSrc={`https://placehold.co/300x500?text=${strReplaceSpace(title, {
            everyNthSpace: 2,
          })}`}
          alt={`Book cover - ${title}`}
          loading="lazy"
          {...coverProps}
        />
      </div>
      <article
        className={classNames(
          'flex w-80 flex-col justify-between gap-4 rounded-lg p-2 transition-colors duration-300 sm:p-4',
          'bg-zinc-50/10 text-black hover:bg-slate-100 dark:bg-zinc-900/10 dark:text-zinc-200 dark:hover:bg-[#1a1a1a] lg:bg-transparent',
          'basis-3/5 sm:basis-1/2 lg:h-[calc(100%-4rem)]',
        )}
      >
        <div>
          <div className="flex justify-between gap-2">
            <Link className="link-secondary" to={{pathname: generatePath(Path.BOOK_DETAIL, {id})}}>
              <h3 className="line-clamp-2 text-base font-bold lg:line-clamp-3 lg:text-xl">
                {title}
              </h3>
            </Link>
            <AgeTags data={ageTag[0]} iconProps={{className: 'sm:h-8 sm:w-8', strokeWidth: 1.5}} />
          </div>
          {author && <div className="italic">{author}</div>}

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <IconTags size="1.2rem" />
            {genre.map(({id, genreName}) => (
              <Badge key={id} className="cursor-default" variant="outline">
                <Trans t={t}>genre.{genreName}</Trans>
              </Badge>
            ))}
          </div>

          <p className="mt-4 line-clamp-2 cursor-default text-gray-500 lg:line-clamp-6">
            {description}
          </p>
        </div>

        {isBookAdded ? (
          <Button leftSection={<IconCheck className="text-green-500" />} radius="md" disabled>
            {t('book.picked')}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleAction} leftSection={<IconBook2 />} radius="md">
            {t('common.rent')}
          </Button>
        )}
      </article>
    </div>
  );
};

export default BookCarouselCard;
