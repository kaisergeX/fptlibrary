import {Card, Button, Image, type ImageProps, Badge} from '@mantine/core';
import {classNames, isMobile} from '~/util';
import type {Book} from '~/types';
import {Trans, useTranslation} from 'react-i18next';
import {usePersistStore} from '~/store';
import {IconBook2, IconCheck, IconTags} from '@tabler/icons-react';
import AgeTags from './age-tags';
import {BookStatus} from '~/constants';
import {useMemo} from 'react';

type BookCardProps = {
  className?: string;
  data: Book;
  onClick?: () => void;
  coverProps?: Omit<ImageProps, 'src'> & {alt?: string};
  horizontal?: boolean;
};

export default function BookCard({
  className = '',
  data: bookData,
  onClick,
  coverProps,
  horizontal = false,
}: BookCardProps) {
  const {id: bookId, title, cover, summary, ageTag, genre, status} = bookData;
  const {t} = useTranslation();
  const [isBookAdded, addBook] = usePersistStore((state) => [
    bookId ? state.books.includes(bookId) : false,
    state.addBook,
  ]);

  const renderGenres = useMemo(
    () =>
      (isMobile() ? genre.slice(0, 1) : genre).map(({id, genreName}) => (
        <Badge key={id} variant="outline">
          <Trans t={t}>genre.{genreName}</Trans>
        </Badge>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [genre],
  );

  return (
    <Card
      className={classNames(
        'card-primary',
        horizontal ? 'flex-row items-center' : 'sm-only:flex-row sm-only:items-center',
        className,
      )}
      padding={0}
      onClick={onClick}
    >
      <div className={classNames('max-sm:pl-2', horizontal ? 'basis-1/3' : 'sm-only:basis-1/3')}>
        <Image
          className="aspect-[1/1.5] rounded-lg object-cover object-center"
          src={cover}
          fallbackSrc={`https://placehold.co/300x450?text=${title}`}
          alt={`Book cover - ${title}`}
          loading="lazy"
          {...coverProps}
        />
      </div>

      <div
        className={classNames(
          'flex h-full min-w-0 flex-col p-2 sm:p-4',
          horizontal ? 'basis-2/3' : 'sm-only:basis-2/3',
        )}
      >
        <div className="flex justify-between gap-2">
          <h3 className="line-clamp-2 font-bold leading-normal">{title}</h3>
          <AgeTags
            data={ageTag}
            iconProps={{className: 'w-6 h-6 sm:w-7 sm:h-7', strokeWidth: 1.2}}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <IconTags size="1.2rem" />
          {renderGenres}
        </div>

        <article className="my-2 flex-1 sm:my-4">
          <p className="line-clamp-3 text-slate-500 max-sm:text-sm">
            {summary || t('common.contentUpdating')}
          </p>
        </article>

        <div>
          {isBookAdded ? (
            <Button
              leftSection={<IconCheck className="text-green-500" />}
              radius="md"
              fullWidth
              disabled
            >
              {t('book.selected')}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                addBook(bookId);
              }}
              leftSection={status === BookStatus.AVAILABLE && <IconBook2 />}
              radius="md"
              fullWidth
              disabled={status !== BookStatus.AVAILABLE}
            >
              {status === BookStatus.AVAILABLE ? t('book.select') : t('book.existed.rented')}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
