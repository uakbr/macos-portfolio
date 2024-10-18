import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from './locales/en/translation.json';
// Import other translations as needed

// Initialize i18n
i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      // Add other languages here
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // If language detector fails
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
