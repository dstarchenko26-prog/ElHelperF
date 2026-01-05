import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import ukTranslation from './locales/uk/uk.json';
import enTranslation from './locales/en/en.json';

const resources = {
  en: {
    translation: enTranslation
  },
  uk: {
    translation: ukTranslation
  }
};

i18n
  // .use(Backend) <-- 2. Видаляємо це (Backend більше не треба)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uk',
    
    react: {
        useSuspense: false 
    },
    
    interpolation: {
      escapeValue: false
    }
  });

// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'uk',
//     debug: false,
//     backend: {
//       loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/translation.json`,
//     },
//     interpolation: {
//       escapeValue: false,
//     },
//   });

export default i18n;