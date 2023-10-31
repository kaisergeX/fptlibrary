import {useTranslation} from 'react-i18next';
import CarouselCustom, {type CarouselCustomProps} from '~/components/carousel-custom';
import {SERVICE_NAME} from '~/config/system';
import {Link} from 'react-router-dom';
import {Path} from '~/config/path';
import BookCard from '~/components/book-card';
import ScrollTopButton from '~/components/scroll-top-button';
import {ActionIcon, Indicator} from '@mantine/core';
import {IconBooks, IconChevronRight, IconSearch} from '@tabler/icons-react';

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
        className="sm:h-[40vh]"
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
        className="sm:h-[40vh]"
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
        className="sm:h-[40vh]"
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
        className="sm:h-[40vh]"
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
        className="sm:h-[40vh]"
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
        className="sm:h-[40vh]"
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
        className="sm:h-[40vh]"
        name="Launch Recipe for today"
        cover="https://marketplace.canva.com/EAFnqIURljo/1/0/1003w/canva-green-photo-food-recipe-book-cover-Ao7bLRHIO5Q.jpg"
      />
    ),
  },
  {
    id: '3',
    content: (
      <BookCard
        className="sm:h-[40vh]"
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
        className="bg-watermark flex-center h-[40vh] before:bg-[url(/image/wave.svg)] dark:before:bg-[url(/image/wave-dark.svg)]"
      >
        <h2>{t('common.introduce')}</h2>
      </section>

      <main className="bg-theme [&>section]:container [&>section]:relative [&>section]:mx-auto [&>section]:px-4 [&>section]:pb-8 [&_h2]:my-4 [&_h2]:font-bold">
        <CarouselCustom
          images={images}
          imageProps={{alt: 'Carousel images'}}
          slideSize={{base: '50%', xl: '30%'}}
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
            className="text-watermark -top-20 left-14 text-[12rem] font-black text-slate-300 sm-only:hidden dark:text-zinc-800/50"
            aria-hidden="true"
          >
            {t('book.genre.horror')}
          </div>

          <CarouselCustom
            items={horrorGenreBooks}
            slideSize={{base: '70%', sm: '45%'}}
            slideGap={{base: 'sm', sm: 'xl'}}
            align="start"
            loop={false}
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
            className="text-watermark -top-24 left-14 -z-10 text-[12rem] font-black text-slate-200 sm-only:hidden dark:text-zinc-800/50"
            aria-hidden="true"
          >
            {t('book.genre.cookBooks')}
          </div>

          <CarouselCustom
            items={cookBooks}
            slideSize={{base: '70%', sm: '45%'}}
            slideGap={{base: 'sm', sm: 'xl'}}
            align="start"
            loop={false}
          />
        </section>
      </main>

      <ScrollTopButton />
      <footer className="p-4 sm:h-[40vh]">Footer content</footer>
    </div>
  );
};

export default Homepage;
