import {
  Divider,
  Blockquote,
  Alert,
  Button,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import {DatePicker} from '@mantine/dates';
import {showNotification, updateNotification} from '@mantine/notifications';
import {
  IconAlertCircle,
  IconCheck,
  IconMoonStars,
  IconNotification,
  IconSun,
} from '@tabler/icons-react';

import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import CarouselCustom from '~/components/carousel-custom';
import ThemeColors from '~/components/theme-colors';
import {Path} from '~/config/path';
import {SERVICE_NAME} from '~/config/system';
import {SupportedLanguage} from '~/types';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
];

const countryFlag = {
  [SupportedLanguage.VI]: 'https://flagsapi.com/VN/flat/32.png',
  [SupportedLanguage.EN]: 'https://flagsapi.com/US/flat/32.png',
} as const;

const HiddenFeatures = () => {
  const {t, i18n} = useTranslation();
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const renderLanguage = Object.values(SupportedLanguage).map((language) => (
    <ActionIcon
      key={language}
      className="[&:disabled]:opacity-20"
      variant="transparent"
      size="lg"
      onClick={() => void i18n.changeLanguage(language)}
      disabled={i18n.resolvedLanguage === language}
      aria-label={language}
    >
      <img src={countryFlag[language]} alt={language} />
    </ActionIcon>
  ));

  return (
    <div className="relative">
      <header className="glass flex-center-between sticky inset-x-0 top-0 z-10 gap-4 p-4">
        <Link to={Path.HOMEPAGE} className="link-unstyled">
          <h1 className="font-handwriting font-normal transition-all hover:drop-shadow-md">
            {SERVICE_NAME}
          </h1>
        </Link>

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
      </header>

      <main className="container mx-auto p-4">
        <h1>{t('setting.pageTitle')}</h1>
        <h2 className="mb-2 mt-6">{t('common.changeLang')}</h2>
        <div className="flex gap-2">{renderLanguage}</div>

        <h2 className="mb-2 mt-6 capitalize">{t(`common.theme.mode`, {theme: colorScheme})}</h2>
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

        <h2 className="mb-2 mt-6 capitalize">{t('common.theme.color')}</h2>
        <ThemeColors className="flex-wrap" />

        <Divider my="xl" variant="dashed" />
        <h2>{t('setting.showcase')}</h2>
        <Blockquote cite="- Forrest Gump" radius="md" className="my-8">
          Life is like an npm install - you never know what you are going to get.
        </Blockquote>

        <Alert
          className="mb-8"
          icon={<IconAlertCircle size={16} />}
          title={t('common.error.sthWrong.normal')}
          radius="md"
        >
          {t('common.error.sthWrong.action')}
        </Alert>

        <DatePicker className="mx-auto w-fit" defaultValue={new Date()} />

        <Divider my="xl" variant="dashed" />
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            leftSection={<IconNotification />}
            onClick={() =>
              showNotification({
                title: 'Default notification',
                message: 'Hey there! 👋',
              })
            }
          >
            Show notification
          </Button>

          <Button
            variant="gradient"
            gradient={{from: 'teal', to: 'lime', deg: 105}}
            onClick={() => {
              showNotification({
                id: 'load-data',
                loading: true,
                title: 'Loading your data',
                message: 'Data will be loaded in 5 seconds, you cannot close this yet',
                autoClose: false,
                withCloseButton: true,
              });

              setTimeout(() => {
                updateNotification({
                  id: 'load-data',
                  color: 'teal',
                  title: 'Data was loaded',
                  message:
                    'Notification will close in 3 seconds, you can close this notification now',
                  icon: <IconCheck size={16} />,
                  autoClose: 3000,
                  loading: false,
                });
              }, 5000);
            }}
          >
            Show update notification
          </Button>
        </div>

        <Divider my="xl" variant="dashed" />
        <CarouselCustom
          images={images}
          imageProps={{h: '40vh', alt: 'Carousel images'}}
          slideSize="auto"
          autoPlay={5000}
          withIndicators
          loop
        />
      </main>
    </div>
  );
};

export default HiddenFeatures;
