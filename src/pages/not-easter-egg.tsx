import {
  Divider,
  Blockquote,
  Alert,
  Button,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  Card,
} from '@mantine/core';
import {DatePicker} from '@mantine/dates';
import {showNotification, updateNotification} from '@mantine/notifications';
import {
  IconAlertCircle,
  IconCheck,
  IconInfoCircle,
  IconMoonStars,
  IconNotification,
  IconSun,
} from '@tabler/icons-react';

import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import CarouselCustom from '~/components/carousel-custom';
import ThemeColors from '~/components/theme-colors';
import {exampleNavbarConfig} from '~/config/admin-navbar';
import {Path} from '~/config/path';
import {SERVICE_NAME} from '~/config/system';
import LinksGroup from '~/layout/admin-navbar/NavbarItemGroup';
import {SupportedLanguage} from '~/types';

const images = [
  'https://source.unsplash.com/user/jswords',
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

  const renderExampleNavbar = exampleNavbarConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

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
        <h2 className="mb-8">{t('setting.showcase')}</h2>

        <div className="flex gap-4 divide-x py-4">
          <div className="w-64">
            <h3 className="mb-4">Nested navbar</h3>
            {renderExampleNavbar}
          </div>

          <div className="flex-1 px-4">
            <Blockquote
              className="my-8"
              cite="- Forrest Gump"
              radius="md"
              icon={<IconInfoCircle />}
              iconSize="2rem"
            >
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
            <Card className="card-primary mx-auto mb-8 max-w-xs">
              <Card.Section>
                <CarouselCustom
                  images={images}
                  imageProps={{h: '12rem', alt: 'Carousel images'}}
                  slideSize="auto"
                  autoPlay={3000}
                  withIndicators
                  loop
                />
              </Card.Section>

              <div className="flex-center-between mt-4 font-semibold">
                <span className="text-lg">Membership Pack</span>
                <span className="text-sm">⭐ 4.78</span>
              </div>

              <p className="text-sm text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut neque repudiandae, quod,
                officia incidunt error vero accusantium, ratione maxime voluptatibus quia officiis.
                Laborum quisquam, libero delectus tempora sit eligendi modi?
              </p>

              <div className="flex-center-between mt-4">
                <div>
                  <span className="text-xl font-semibold">399$</span>
                  <span className="text-sm text-slate-500"> / year</span>
                </div>

                <Button radius="md">Purchase</Button>
              </div>
            </Card>

            <DatePicker className="mx-auto w-fit" defaultValue={new Date()} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HiddenFeatures;
