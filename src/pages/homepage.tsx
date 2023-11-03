import {useTranslation} from 'react-i18next';
import CarouselCustom, {type CarouselCustomProps} from '~/components/carousel-custom';
import {SERVICE_NAME} from '~/config/system';
import {Link} from 'react-router-dom';
import {Path} from '~/config/path';
import BookCard from '~/components/book-card';
import ScrollTopButton from '~/components/scroll-top-button';
import {ActionIcon, Indicator} from '@mantine/core';
import {IconBooks, IconChevronRight, IconSearch} from '@tabler/icons-react';
import {classNames} from '~/util';

const parallaxPainting = Math.random() < 0.5; // 50% probability of getting true

const images = [
  'https://source.unsplash.com/user/jswords',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
];

const horrorGenreBooks: CarouselCustomProps['items'] = [
  {
    id: '1',
    content: (
      <BookCard
        name="MARIANA"
        author="Bailey Dupont"
        summary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum ea minus fugit totam."
        cover="https://marketplace.canva.com/EAFZfrpK8D4/1/0/1003w/canva-dark-minimalist-vintage-portrait-photo-ripped-paper-book-cover-TDLQ377Qb9o.jpg"
      />
    ),
  },
  {
    id: '2',
    content: (
      <BookCard
        name="WALK INTO THE SHADOW"
        author="Estelle Darcy"
        summary={`Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellendus in deserunt nulla esse, omnis veritatis quas rem tempora natus quia dolores, quo inventore minus nesciunt quae tempore quisquam error doloremque!`}
        cover="https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg"
      />
    ),
  },
  {
    id: '3',
    content: (
      <BookCard
        name="The SPIRIT"
        author="Lorna Alvarado"
        cover="https://marketplace.canva.com/EAFSOdPodiY/1/0/1003w/canva-colorful-dark-modern-photo-the-spirit-novel-book-cover-lZO8zJtHB88.jpg"
      />
    ),
  },
  {
    id: '4',
    content: (
      <BookCard
        className="lg:h-[40vh]"
        name="THE WOODS"
        author="Sebastian Bennett"
        summary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum ea minus fugit totam."
        cover="https://marketplace.canva.com/EAFfP_ahICA/1/0/1003w/canva-gray-brown-minimalist-mysterious-thriller-book-cover-ChwIM5U8GOA.jpg"
      />
    ),
  },
  {
    id: '5',
    content: (
      <BookCard
        name="THE SOUND OF SILENCE"
        author="Sebastian Bennett"
        cover="https://marketplace.canva.com/EAFfP1ZZJ0s/1/0/1003w/canva-gray-white-minimalist-thriller-book-cover-4qsGN0bADV4.jpg"
      />
    ),
  },
];

const cookBooks: CarouselCustomProps['items'] = [
  {
    id: '1',
    content: (
      <BookCard
        name="Ultimate Book of Recipes - Dishes of every shape for every occasion"
        author="Isabel Mercado"
        summary="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum ea minus fugit totam."
        cover="https://marketplace.canva.com/EADao-bRSSQ/1/0/1003w/canva-red-and-white-cookbook-book-cover-rrJOs158M0U.jpg"
      />
    ),
  },
  {
    id: '2',
    content: (
      <BookCard
        name="Launch Recipe for today"
        cover="https://marketplace.canva.com/EAFnqIURljo/1/0/1003w/canva-green-photo-food-recipe-book-cover-Ao7bLRHIO5Q.jpg"
      />
    ),
  },
  {
    id: '3',
    content: (
      <BookCard
        name="COOKING MADE SIMPLE"
        author="Isabel Mercado & Claudia Alves"
        cover="https://marketplace.canva.com/EAFK_7GQdBQ/1/0/1003w/canva-gray-dark-contemporary-modern-photo-cookbook-recipe-book-cover-rImuYf0Dit4.jpg"
      />
    ),
  },
];

const Homepage = () => {
  const {t} = useTranslation();

  return (
    <div className="relative h-full">
      <header className="glass flex-center-between sticky inset-x-0 top-0 z-10 gap-4 p-4">
        <Link to={Path.HOMEPAGE} className="link-unstyled">
          <h1 className="font-handwriting font-normal transition-all hover:drop-shadow-md">
            {SERVICE_NAME}
          </h1>
        </Link>

        <div className="flex-center gap-2">
          <ActionIcon
            variant="subtle"
            size="lg"
            radius="xl"
            aria-label="Search book"
            className="dark:text-inherit"
          >
            <IconSearch />
          </ActionIcon>
          <Indicator label="3" color="green" size={16}>
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Rent books"
              className="dark:text-inherit"
            >
              <IconBooks />
            </ActionIcon>
          </Indicator>
        </div>
      </header>

      <section
        id="hero-section"
        className={classNames(
          'bg-watermark parallax h-[50vh] px-4 before:bg-[url(/image/wave.svg)] dark:before:bg-[url(/image/wave-dark.svg)] sm-only:[&>img]:hidden',
          'dark:[&>img]:hue-rotate-180 dark:[&>img]:invert',
        )}
      >
        {parallaxPainting ? (
          <>
            <div className="absolute -bottom-32 z-[1] w-1/6 place-self-end overflow-x-hidden pl-8 opacity-20 parallax-speed-[25]">
              <img
                className="ml-28 w-40 lg:w-96"
                src="/image/parallax/book_painting1.svg"
                alt="the painting book image at the bottom-right"
              />
            </div>
            <img
              className="z-[2] mr-96 mt-40 w-1/6 place-self-center opacity-10 parallax-speed-10 dark:opacity-30 dark:!filter-none"
              src="/image/parallax/book_painting2.svg"
              alt="the painting book image in the center"
            />
          </>
        ) : (
          <>
            <img
              className="z-[1] mt-10 w-20 justify-self-end opacity-20 parallax-speed-30 lg:w-40"
              src="/image/parallax/book3.svg"
              alt="the book image on the top-right"
            />
            <img
              className="z-[1] w-20 self-end opacity-40 parallax-speed-[18] lg:w-40"
              src="/image/parallax/book2.svg"
              alt="the book image at the bottom-left"
            />
            <img
              className="z-[1] ml-40 mt-40 w-20 place-self-center opacity-20 parallax-speed-10 lg:w-40"
              src="/image/parallax/book1.svg"
              alt="the book image in the center"
            />
            <img
              className="z-[1] ml-20 w-20 self-center opacity-10 parallax-speed-[40] lg:w-40"
              src="/image/parallax/book4.svg"
              alt="the book image on the center-left"
            />

            <img
              className="z-[2] -mt-8 mr-[20%] w-20 justify-self-center opacity-20 lg:w-40"
              src="/image/parallax/book5.svg"
              alt="the book image at the top-center"
            />
          </>
        )}

        <h2 className="z-10 place-self-center text-center text-xl sm:text-2xl xl:text-6xl">
          {t('common.introduce')}
        </h2>
      </section>

      <main className="bg-theme relative pb-4 [&>section]:container [&>section]:relative [&>section]:mx-auto [&>section]:px-4 [&>section]:py-6 lg:[&>section]:py-16 [&_h2]:my-4 [&_h2]:font-bold">
        <CarouselCustom
          images={images}
          imageProps={{alt: 'Carousel images'}}
          slideSize={{base: '70%', lg: '40%', xl: '30%'}}
          height="40vh"
          autoPlay={5000}
          withIndicators
          loop
        />

        <section>
          <div className="flex-center-between">
            <h2>{t('book.genre.horror')}</h2>
            <Link className="flex-center text-inherit hover:text-blue-400" to="#">
              {t('common.viewMore')} <IconChevronRight />
            </Link>
          </div>
          <div
            className="text-watermark -top-2 left-14 text-9xl font-black text-slate-300 sm-only:hidden dark:text-zinc-800/50 lg:text-[12rem]"
            aria-hidden="true"
          >
            {t('book.genre.horror')}
          </div>

          <CarouselCustom
            className="lg:[&_.book-card]:h-[40vh]"
            items={horrorGenreBooks}
            slideSize={{base: '70%', sm: '55%', lg: '45%'}}
            slideGap={{base: 'sm', lg: 'xl'}}
            align="start"
            loop
          />
        </section>

        <section>
          <div className="flex-center-between">
            <h2>{t('book.genre.cookBooks')}</h2>
            <Link className="flex-center text-inherit hover:text-blue-400" to="#">
              {t('common.viewMore')} <IconChevronRight />
            </Link>
          </div>
          <div
            className="text-watermark -top-2 left-14 -z-10 text-9xl font-black text-slate-200 sm-only:hidden dark:text-zinc-800/50 lg:text-[12rem]"
            aria-hidden="true"
          >
            {t('book.genre.cookBooks')}
          </div>

          <CarouselCustom
            className="lg:[&_.book-card]:h-[40vh]"
            items={cookBooks}
            slideSize={{base: '70%', sm: '55%', lg: '45%'}}
            slideGap={{base: 'sm', lg: 'xl'}}
            align="start"
            loop
          />
        </section>
      </main>

      <ScrollTopButton />
      <footer className="bg-[#d6dbdc80] p-4 dark:bg-inherit sm:h-[40vh]">Footer content</footer>
    </div>
  );
};

export default Homepage;
