import { useStore } from "./useStore";
import { rupiah } from "../data/games";
import { translate, localizedDescription } from "../data/translations";

export function useI18n() {
  const { language, setLanguage } = useStore();
  return {
    language,
    setLanguage,
    locale: language === "en" ? "en-US" : "id-ID",
    t: (key, values) => translate(language, key, values),
    money: (value) => rupiah(value, language),
    gameDescription: (game) => localizedDescription(game, language),
  };
}
