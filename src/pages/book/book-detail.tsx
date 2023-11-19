import {Divider} from '@mantine/core';
import {IconNotebook} from '@tabler/icons-react';
import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Navigate, generatePath, useParams} from 'react-router-dom';
import BookCarouselCard from '~/components/book/book-carousel-card';
import BookShowcase from '~/components/book/book-showcase';
import CarouselCustom from '~/components/carousel-custom';
import NoData from '~/components/no-data';
import {Path} from '~/config/path';
import {API, QueryKey} from '~/constants/service';
import {Head} from '~/layout/outlet/Head';
import type {ResponseData, Book, BooksResData} from '~/types';
import {http} from '~/util/http';

export default function BookDetail() {
  const {id: bookId} = useParams();
  const {t} = useTranslation();

  const {data: bookData} = useSuspenseQuery({
    queryKey: [QueryKey.BOOK_DETAIL, bookId],
    queryFn: () => http.get<ResponseData<Book>>(generatePath(API.BOOK_DETAIL, {id: bookId!})),
    select: ({body: bookData}) => bookData,
  });

  const {data: otherBooks} = useQuery({
    queryKey: [QueryKey.BOOKS],
    queryFn: () => http.get<BooksResData>(API.BOOKS),
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

  const bookFirstGenre = bookData.genre[0].id;

  const {data: sameGenre} = useQuery({
    queryKey: [QueryKey.BOOKS, bookFirstGenre],
    queryFn: () => http.get<BooksResData>(API.BOOKS, {params: {genre: bookFirstGenre}}),
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
    staleTime: undefined,
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
      <Head title={bookData.title || t('book.detail')} />
      <BookShowcase className="pt-8 xl:pt-20" bookData={bookData} />

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
