import {ActionIcon, Tooltip, useMantineColorScheme} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import CarouselCustom from '~/components/CarouselCustom';
import {IconMoonStars, IconSun} from '@tabler/icons-react';
import {SERVICE_NAME} from '~/config/system';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
];

const Homepage = () => {
  const {t} = useTranslation();
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <div>
      <div className="flex-center-between gap-4 p-4">
        <h1>{SERVICE_NAME}</h1>
        <Tooltip
          className="capitalize"
          withArrow
          label={t(`common.theme.mode`, {theme: colorScheme})}
          openDelay={500}
        >
          <ActionIcon
            variant="outline"
            size="lg"
            radius="xl"
            color={isDarkMode ? 'yellow' : ''}
            onClick={() => toggleColorScheme()}
          >
            {isDarkMode ? <IconMoonStars size={18} /> : <IconSun size={18} />}
          </ActionIcon>
        </Tooltip>
      </div>

      <div className="container mx-auto">
        <h2 className="my-4">{t('common.hello')}</h2>

        <CarouselCustom
          images={images}
          imageProps={{h: '24rem', alt: 'Carousel images'}}
          slideSize="50%"
          autoPlay={5000}
        />
      </div>
    </div>
  );
};

export default Homepage;
