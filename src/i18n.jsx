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

      // leaderboard
      save: "Save",
      isLimited: "Limit exceeded",
      placeholder: "Enter your name to the leaderboard",
      leaderboard: "Leaderboard",
      resetData: "Reset",
      noResults: "No results",
      victory: "Winner!"
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

      // leaderboard
      save: "Сохранить",
      isLimited: "Превышен лимит",
      placeholder: "Введите имя в таблицу рекордов",
      leaderboard: "Таблица рекордов",
      resetData: "Очистить данные",
      noResults: "Нет результатов",
      victory: "Победа!"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;