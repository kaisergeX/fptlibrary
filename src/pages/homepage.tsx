import {Trans, useTranslation} from 'react-i18next';
import CarouselCustom from '~/components/carousel-custom';
import {Link} from 'react-router-dom';
import BookCarouselCard from '~/components/book/book-carousel-card';
import ScrollTopButton from '~/components/scroll-top-button';
import {IconChevronRight, IconNotebook} from '@tabler/icons-react';
import {arrSamples, buildUrl, classNames} from '~/util';
import Navbar from '~/layout/navbar';
import type {BooksResData, GenresResData} from '~/types';
import {useQueries, useSuspenseQuery} from '@tanstack/react-query';
import {API, QueryKey} from '~/constants/service';
import {http} from '~/util/http';
import {Head} from '~/layout/outlet/Head';
import NoData from '~/components/no-data';
import type {ReactNode} from 'react';
import {HOME_GENRE_COUNT} from '~/config/system';
import Footer from '~/layout/footer';
import {Path, SEARCH_PARAMS} from '~/config/path';

const parallaxBgGroup = Math.floor(Math.random() * 3);
const heroParallaxGroup = [
  <>
    <img
      className="-ml-4 max-w-[20%] self-end opacity-40 parallax-speed-[15] dark:!filter-none xl:-mb-8"
      src="/image/hero-bg-left.png"
      alt="hero background - left part"
    />

    <div className="absolute -right-4 w-1/5 self-center justify-self-end overflow-x-hidden pl-8 opacity-40 parallax-speed-[12]">
      <img className="ml-8" src="/image/hero-bg-right.png" alt="hero background - right part" />
    </div>
  </>,
  <>
    <div className="absolute -bottom-32 z-[1] w-1/6 place-self-end overflow-x-hidden pl-8 opacity-20 parallax-speed-[15]">
      <img
        className="ml-16 w-40 lg:w-96"
        src="/image/parallax/book_painting1.png"
        alt="the painting book image at the bottom-right"
      />
    </div>
    <img
      className="z-[2] mr-[20%] mt-40 w-1/6 place-self-center opacity-10 parallax-speed-10 dark:opacity-30 dark:!filter-none"
      src="/image/parallax/book_painting2.png"
      alt="the painting book image in the center"
    />
  </>,
  <>
    <img
      className="z-[1] mt-10 w-20 justify-self-end opacity-20 parallax-speed-[15] lg:w-40 2xl:parallax-speed-[25]"
      src="/image/parallax/book3.svg"
      alt="the book image on the top-right"
    />
    <img
      className="z-[1] w-20 self-end opacity-40 parallax-speed-10 lg:w-40"
      src="/image/parallax/book2.svg"
      alt="the book image at the bottom-left"
    />
    <img
      className="z-[1] ml-40 mt-40 w-20 place-self-center opacity-20 parallax-speed-10 lg:w-40"
      src="/image/parallax/book1.svg"
      alt="the book image in the center"
    />
    <img
      className="z-[1] ml-20 w-20 self-center opacity-10 parallax-speed-[18] lg:w-40"
      src="/image/parallax/book4.svg"
      alt="the book image on the center-left"
    />

    <img
      className="z-[2] -mt-8 mr-[20%] w-20 justify-self-center opacity-20 lg:w-40"
      src="/image/parallax/book5.svg"
      alt="the book image at the top-center"
    />
  </>,
];

const images = [
  'https://source.unsplash.com/user/jswords',
  'https://source.unsplash.com/random/?tree',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
  'https://source.unsplash.com/user/francesco_ungaro',
  'https://source.unsplash.com/random/?natural',
];

const Homepage = () => {
  const {t} = useTranslation();
  const {data: sampledGenres} = useSuspenseQuery({
    queryKey: [QueryKey.GENRES],
    queryFn: () => http.get<GenresResData>(API.GENRES),
    select: ({body}) => arrSamples(body, HOME_GENRE_COUNT),
  });

  const bookByGenres = useQueries({
    queries: sampledGenres.map(({id: genreId, genreName}, index) => ({
      queryKey: [QueryKey.BOOKS, sampledGenres.length, index],
      queryFn: () => http.get<BooksResData>(buildUrl(API.BOOKS, {genre: genreId})),
      select: ({body: books}: BooksResData): ReactNode => {
        if (!Array.isArray(books)) {
          return [];
        }

        const booksCarouselData = books.map((bookData) => ({
          id: bookData.id,
          content: <BookCarouselCard data={bookData} />,
        }));

        return (
          <section key={genreId}>
            <div className="flex-center-between">
              <h2>
                <Trans t={t}>genre.{genreName}</Trans>
              </h2>

              {books.length > 2 && (
                <Link
                  className="link-secondary flex-center"
                  to={{pathname: Path.BOOK_BROWSING, search: `${SEARCH_PARAMS.GENRE}=${genreId}`}}
                >
                  {t('common.viewMore')} <IconChevronRight />
                </Link>
              )}
            </div>

            {!books.length || (
              <div
                className="text-watermark -top-2 left-14 whitespace-nowrap text-7xl font-black text-slate-300 sm-only:hidden dark:text-zinc-800/50 lg:text-[12rem]"
                aria-hidden="true"
              >
                <Trans t={t}>genre.{genreName}</Trans>
              </div>
            )}

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
          </section>
        );
      },
      enabled: !!sampledGenres.length,
    })),
    combine: (result) => result.flatMap(({data}) => data),
  });

  return (
    <div className="relative h-full">
      <Head title={t('home.pageTitle')} />
      <Navbar />

      <section
        id="hero-section"
        className={classNames(
          'bg-watermark parallax h-[50vh] px-4 before:bg-[url(/image/wave.svg)] dark:before:bg-[url(/image/wave-dark.svg)] sm-only:[&>img]:hidden',
          'dark:[&>img]:hue-rotate-180 dark:[&>img]:invert',
        )}
      >
        {heroParallaxGroup[parallaxBgGroup]}

        <h2 className="z-10 place-self-center text-center text-xl sm:text-2xl xl:text-4xl 2xl:text-6xl">
          {t('common.introduce')}
        </h2>
      </section>

      <main className="bg-theme relative min-h-[50vh] overflow-x-hidden pb-4 [&>section]:container 2xl:pb-28 [&>section]:relative [&>section]:mx-auto [&>section]:px-4 [&>section]:py-6 lg:[&>section]:py-16 [&_h2]:my-4 [&_h2]:font-bold">
        <CarouselCustom
          images={images}
          imageProps={{h: '40vh', alt: 'Carousel images'}}
          slideSize="auto"
          autoPlay={5000}
          withIndicators
          loop
        />

        {bookByGenres}
      </main>

      <Footer />

      <ScrollTopButton className="z-10" />
    </div>
  );
};

export default Homepage;
