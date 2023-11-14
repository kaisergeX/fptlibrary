import {Badge, Button, Divider, Image, Tooltip} from '@mantine/core';
import {IconBook2, IconBooks, IconCheck, IconNotebook, IconTags} from '@tabler/icons-react';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {useLayoutEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Navigate, useParams} from 'react-router-dom';
import AgeTags from '~/components/book/age-tags';
import BookCarouselCard from '~/components/book/book-carousel-card';
import CarouselCustom from '~/components/carousel-custom';
import NoData from '~/components/no-data';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import {usePersistStore} from '~/store';
import type {ResponseData, Book, BooksResData} from '~/types';
import {buildUrl} from '~/util';
import {http} from '~/util/http';

export default function BookDetail() {
  const {id: bookId} = useParams();
  const {t} = useTranslation();
  const [isBookAdded, addBook] = usePersistStore((state) => [
    bookId ? state.books.includes(bookId) : false,
    state.addBook,
  ]);

  const {
    data: {title, cover, author, description, episode, totalEpisode, ageTag, genre = []},
  } = useSuspenseQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(buildUrl(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body: bookData}) => bookData,
  });

  const {data: otherBooks} = useQuery({
    queryKey: [QueryKey.BOOKS],
    queryFn: () => http.get<BooksResData>(buildUrl(API.BOOKS)),
    select: ({body: books}: BooksResData) => {
      if (!Array.isArray(books)) {
        return [];
      }

      const booksCarouselData = books.flatMap((bookData) =>
        bookData.id !== bookId
          ? {
              id: bookData.id,
              content: <BookCarouselCard data={bookData} />,
            }
          : [],
      );

      return (
        <CarouselCustom
          className="lg:[&_.book-card]:h-[40vh]"
          items={booksCarouselData}
          slideSize={{base: '70%', sm: '55%', lg: '45%'}}
          slideGap={{base: 'sm', lg: 'xl'}}
          align="start"
          loop
          noData={<NoData className="opacity-80" image={<IconNotebook size="4rem" />} />}
        />
      );
    },
    enabled: !!bookId,
  });

  const bookFirstGenre = genre[0].id;

  const {data: sameGenre} = useQuery({
    queryKey: [QueryKey.BOOKS, genre[0].id],
    queryFn: () => http.get<BooksResData>(buildUrl(API.BOOKS, {genre: bookFirstGenre})),
    select: ({body: books}: BooksResData) => {
      if (!Array.isArray(books)) {
        return [];
      }

      const booksCarouselData = books.flatMap((bookData) =>
        bookData.id !== bookId
          ? {
              id: bookData.id,
              content: <BookCarouselCard data={bookData} />,
            }
          : [],
      );

      return (
        <CarouselCustom
          className="lg:[&_.book-card]:h-[40vh]"
          items={booksCarouselData}
          slideSize={{base: '70%', sm: '55%', lg: '45%'}}
          slideGap={{base: 'sm', lg: 'xl'}}
          align="start"
          loop
          noData={
            <NoData className="opacity-80" image={<IconNotebook size="4rem" />}>
              {t('book.noData.genre')}
            </NoData>
          }
        />
      );
    },
    enabled: !!bookId && !!bookFirstGenre,
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [bookId]);

  if (!bookId) {
    return <Navigate to={Path.BOOK_BROWSING} replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative flex items-start gap-4 pt-8 sm-only:flex-col xl:pt-20">
        <div className="top-8 basis-1/3 sm:sticky xl:top-24">
          <Image
            className="max-h-full rounded-lg"
            src={cover}
            fallbackSrc={`https://placehold.co/200x300?text=${title}`}
            alt={`Book cover - ${title}`}
            loading="lazy"
          />
        </div>

        <article className="min-h-[80vh] basis-2/3">
          <div className="flex items-start gap-2">
            <h2 className="font-bold sm:text-xl xl:text-3xl">{title}</h2>
            <Tooltip label={<Trans t={t}>ageTag.{ageTag[0].ageTagName}</Trans>}>
              <div>
                <AgeTags data={ageTag[0]} iconProps={{size: '2rem', strokeWidth: 1.5}} />
              </div>
            </Tooltip>
          </div>
          <div>
            {t('author')}: <strong>{author || '-'}</strong>
          </div>

          <div className="group my-4 flex w-fit cursor-default items-center">
            <IconBooks className="mr-1 opacity-80 transition-all duration-500 group-hover:mr-0 group-hover:w-0" />
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
          <p>
            {description || t('common.updating')}
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti, blanditiis officiis
            consequatur fuga provident minima, voluptatibus accusamus suscipit autem, inventore
            incidunt animi voluptate totam vero ex saepe optio magni minus! Ab error nemo quisquam
            eaque molestiae quam, reiciendis incidunt fugiat earum sed ipsa odio laborum veniam
            aspernatur enim! Dolor numquam veritatis totam corporis vitae, nihil consectetur
            voluptatem perferendis et quidem. Sunt, deleniti eum sed, soluta quasi debitis possimus
            laboriosam dicta numquam non unde repellat perspiciatis nisi minima, labore
            necessitatibus explicabo excepturi eius eaque quas. Dolores laborum molestiae nesciunt
            perferendis vel. Repellendus minima ab facilis voluptatum deserunt nulla fuga possimus
            laboriosam ad nisi officiis, dolor unde soluta ipsa illo rem architecto suscipit, sit
            natus veniam consequatur! Ipsam, ipsa recusandae. Eligendi, totam? Consequatur nihil
            officia deleniti ducimus voluptatem possimus provident perspiciatis maxime sint pariatur
            ullam ipsum neque libero iusto quaerat voluptatibus, doloremque voluptatum ipsam dolores
            labore. Nihil aliquid placeat fuga blanditiis rerum!
          </p>

          <Divider className="my-4 sm:my-8" variant="dashed" />

          <div className="sticky top-8 basis-1/3 xl:top-24">
            {isBookAdded ? (
              <Button leftSection={<IconCheck className="text-green-500" />} radius="md" disabled>
                {t('book.picked')}
              </Button>
            ) : (
              <Button onClick={() => addBook(bookId)} leftSection={<IconBook2 />} radius="md">
                {t('common.rent')}
              </Button>
            )}
          </div>
        </article>
      </div>

      <Divider className="my-4 sm:my-8" variant="dashed" />

      <div>
        <h2 className="mb-4 font-bold">{t('book.sameGenre')}</h2>
        {sameGenre}
      </div>
      <Divider className="my-4 sm:my-8" variant="dashed" />

      <div>
        <h2 className="mb-4 font-bold">{t('book.otherList')}</h2>
        {otherBooks}
      </div>
    </div>
  );
}
