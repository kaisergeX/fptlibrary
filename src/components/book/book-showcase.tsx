import {Divider, Badge, Button, Image, ThemeIcon} from '@mantine/core';
import {IconNotebook, IconTags, IconCheck, IconBook2, IconInfoCircle} from '@tabler/icons-react';
import {Trans, useTranslation} from 'react-i18next';
import ZoomImage from '../zoom-image';
import AgeTags from './age-tags';
import {usePersistStore} from '~/store';
import type {Book} from '~/types';
import {classNames} from '~/util';
import {BookStatus} from '~/constants';

type BookShowcaseProps = {
  bookData: Book;
  className?: string;
  adminView?: boolean;
  QRview?: boolean;
};

export default function BookShowcase({
  bookData,
  className = '',
  adminView = false,
  QRview = false,
}: BookShowcaseProps) {
  const {t} = useTranslation();
  const {
    id,
    title,
    cover,
    author,
    summary,
    episode,
    totalEpisode,
    ageTag,
    genre = [],
    status,
  } = bookData;

  const [isBookAdded, addBook] = usePersistStore((state) => [
    id ? state.books.includes(id) : false,
    state.addBook,
  ]);

  return (
    <div className={classNames('relative flex items-start gap-4 sm-only:flex-col', className)}>
      <div
        className={classNames(
          'mx-auto sm:sticky sm:basis-1/3',
          adminView ? 'top-[calc(var(--app-shell-header-height)+5rem)]' : 'top-8 xl:top-24',
        )}
      >
        <ZoomImage author={author} summary={summary}>
          <Image
            className="max-h-full rounded-lg"
            src={cover}
            fallbackSrc={`https://placehold.co/200x300?text=${title}`}
            alt={`Book cover - ${title}`}
            loading="lazy"
          />
        </ZoomImage>
      </div>

      <article
        className={classNames(
          'max-sm:w-full sm:basis-2/3',
          adminView ? 'sm:min-h-[50vh]' : 'sm:min-h-[80vh]',
        )}
      >
        <div className="flex items-start gap-2 max-sm:justify-between">
          <h2 className="font-bold sm:text-xl xl:text-3xl">{title}</h2>
          <AgeTags data={ageTag} iconProps={{size: '2rem', strokeWidth: 1.5}} />
        </div>
        <div>
          {t('book.author')}: <strong>{author || '-'}</strong>
        </div>

        <div className="group my-4 flex w-fit cursor-default items-center">
          <IconNotebook className="mr-1 opacity-80 transition-all duration-500 group-hover:mr-0 group-hover:w-0" />
          <div className="max-w-0 overflow-hidden transition-all duration-500 group-hover:mr-2 group-hover:max-w-xs">
            {t('book.episode')}
          </div>
          <div className="rounded-sm px-1 font-semibold outline outline-1 outline-slate-400">
            {episode}
          </div>
          <div className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-xs group-hover:pl-2">
            / {totalEpisode || 1}
          </div>
        </div>

        {QRview || (
          <>
            <Divider className="my-4 sm:my-8" variant="dashed" />
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <IconTags />
              {genre.map(({id, genreName}) => (
                <Badge key={id} className="cursor-default" variant="outline" size="lg">
                  <Trans t={t}>genre.{genreName}</Trans>
                </Badge>
              ))}
            </div>

            <h3 className="mb-2 font-bold">{t('common.description')}</h3>
            <p>{summary || t('common.updating')}</p>
          </>
        )}

        {adminView || (
          <>
            <Divider className="my-4 sm:my-8" variant="dashed" />
            <div className="sticky top-8 flex basis-1/3 items-center gap-2 xl:top-24">
              {isBookAdded ? (
                <Button leftSection={<IconCheck className="text-green-500" />} radius="md" disabled>
                  {t('book.selected')}
                </Button>
              ) : (
                <Button
                  onClick={() => addBook(id)}
                  leftSection={<IconBook2 />}
                  radius="md"
                  disabled={status !== BookStatus.AVAILABLE}
                >
                  {t('common.rent')}
                </Button>
              )}

              {status !== BookStatus.AVAILABLE && (
                <>
                  <ThemeIcon variant="white" radius="xl" size="sm">
                    <IconInfoCircle />
                  </ThemeIcon>
                  <span className="text-sm">{t('book.existed.rented')}</span>
                </>
              )}
            </div>
          </>
        )}
      </article>
    </div>
  );
}
