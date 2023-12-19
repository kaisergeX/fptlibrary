import {ActionIcon, Tooltip, useMantineColorScheme} from '@mantine/core';
import {IconMoonStars, IconSun} from '@tabler/icons-react';
import {useTranslation} from 'react-i18next';
import ThemeColors from '~/components/theme-colors';
import {SupportedLanguage} from '~/constants';
import AppLogo from '~/components/app-logo';
import AccountMenu from '~/components/account-menu';

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
        <AppLogo />

        <div className="flex items-center gap-4">
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
          <AccountMenu />
        </div>
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
      </main>
    </div>
  );
};

export default HiddenFeatures;
