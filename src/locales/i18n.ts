import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr, jp } from "./translations";
import { Languages } from "../types/SettingsTypes";

const resources = {
  [Languages.English]: {
    translation: en,
  },
  [Languages.French]: {
    translation: fr,
  },
  [Languages.Japanese]: {
    translation: jp,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  //language to use if translations in user language are not available
  lng: Languages.English, // i
  fallbackLng: Languages.English, // use en if detected lng is not available
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
