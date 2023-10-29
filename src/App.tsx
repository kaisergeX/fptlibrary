import {ActionIcon, MantineProvider} from '@mantine/core';
import {useTranslation} from 'react-i18next';
import {mantineThemeOverride} from './config/system';
import {SupportedLanguage} from './types';
import CarouselCustom from './components/CarouselCustom';
import {Head} from './layout/outlet/Head';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
];

const countryFlag = {
  [SupportedLanguage.EN]: 'https://flagsapi.com/US/flat/32.png',
  [SupportedLanguage.VI]: 'https://flagsapi.com/VN/flat/32.png',
} as const;

function App() {
  const {t, i18n} = useTranslation();

  const renderLanguage = Object.values(SupportedLanguage).map((language) => (
    <ActionIcon
      key={language}
      className="[&:disabled]:opacity-20"
      variant="transparent"
      onClick={() => void i18n.changeLanguage(language)}
      disabled={i18n.resolvedLanguage === language}
      aria-label={language}
    >
      <img src={countryFlag[language]} alt={language} />
    </ActionIcon>
  ));

  return (
    <MantineProvider theme={mantineThemeOverride}>
      <Head />
      <div className="container mx-auto">
        <h1 className="font-bold">{t('common.hello')}</h1>
        <h2 className="mb-2 mt-4">{t('common.changeLang')}</h2>
        <div className="flex gap-2">{renderLanguage}</div>

        <CarouselCustom images={images} imageProps={{h: '24rem'}} slideSize="50%" autoPlay={5000} />
      </div>
    </MantineProvider>
  );
}

export default App;
