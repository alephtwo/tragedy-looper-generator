const langs = {
  en: "🇬🇧 EN",
} as const;

export default langs;
export type SupportedLanguage = keyof typeof langs;
