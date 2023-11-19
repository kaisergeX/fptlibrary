import {Card, Button, Image, type ImageProps, Badge} from '@mantine/core';
import {classNames} from '~/util';
import type {Book} from '~/types';
import {Trans, useTranslation} from 'react-i18next';
import {usePersistStore} from '~/store';
import {IconBook2, IconCheck, IconTags} from '@tabler/icons-react';
import AgeTags from './age-tags';
import {BookStatus} from '~/constants';

type BookCardProps = {
  className?: string;
  data: Book;
  onClick?: () => void;
  coverProps?: Omit<ImageProps, 'src'> & {alt?: string};
  hozizontal?: boolean;
};

export default function BookCard({
  className = '',
  data: bookData,
  onClick,
  coverProps,
  hozizontal = false,
}: BookCardProps) {
  const {id: bookId, title, cover, summary, ageTag, genre, status} = bookData;
  const {t} = useTranslation();
  const [isBookAdded, addBook] = usePersistStore((state) => [
    bookId ? state.books.includes(bookId) : false,
    state.addBook,
  ]);

  return (
    <Card
      className={classNames(
        'card-primary',
        hozizontal ? 'flex-row items-center' : 'sm-only:flex-row sm-only:items-center',
        className,
      )}
      padding={0}
      onClick={onClick}
    >
      <div className={hozizontal ? 'basis-1/3' : 'sm-only:basis-1/3'}>
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
          'flex h-full min-w-0 flex-col p-4',
          hozizontal ? 'basis-2/3' : 'sm-only:basis-2/3',
        )}
      >
        <div className="flex justify-between gap-2">
          <h3 className="line-clamp-2 font-bold leading-normal">{title}</h3>
          <AgeTags data={ageTag} iconProps={{size: '2rem', strokeWidth: 1.2}} />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <IconTags size="1.2rem" />
          {genre.map(({id, genreName}) => (
            <Badge key={id} variant="outline">
              <Trans t={t}>genre.{genreName}</Trans>
            </Badge>
          ))}
        </div>

        <article className="my-4 flex-1">
          <p className="line-clamp-3 text-slate-500">{summary || t('common.contentUpdating')}</p>
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
