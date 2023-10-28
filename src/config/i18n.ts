/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';
import {defaultLanguage} from './system';
import translationEn from './locales/en.json';
import translationVi from './locales/vi.json';
import {SupportedLanguage} from '~/types';

export const defaultNS = 'translation';
export const resources = {
  [SupportedLanguage.EN]: {[defaultNS]: translationEn},
  [SupportedLanguage.VI]: {[defaultNS]: translationVi},
} as const;

i18n
  // load translation using http
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(I18NextHttpBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    load: 'languageOnly',
    defaultNS,
    fallbackLng: defaultLanguage,
    resources,
  });

export default i18n;
