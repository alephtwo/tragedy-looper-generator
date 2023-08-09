import * as i18n from "i18next";
import { default as HttpBackend } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import SupportedLanguages from "./@types/SupportedLanguages";

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    supportedLngs: SupportedLanguages,
    fallbackLng: "en",
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
  })
  .catch((e) => console.error(e));

export default i18n;
