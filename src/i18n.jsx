import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// localization library

const resources = {
  en: {
    translation: {
      // header
      language_switch: "RU",
      moves: "Moves",
      time: "Time",
      top15: "Top-15",

      // footer
      start: "Start",
      pause: "Pause",
      continue: "Continue",
      exit: "Exit",
    }
  },
  ru: {
    translation: {
      // header
      language_switch: "EN",
      moves: "Ходы",
      time: "Время",
      top15: "Топ-15",

      // footer
      start: "Старт",
      pause: "Пауза",
      continue: "Продолжить",
      exit: "Выход",
    }
  }
};

i18n
  .use(initReactI18next) // подключаем react-i18next
  .init({
    resources,
    lng: 'ru', // язык по умолчанию
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React уже экранирует
    }
  });

export default i18n;