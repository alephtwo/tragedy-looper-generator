const langs = ["en", "fr"] as const;

export default langs;
export type SupportedLanguage = (typeof langs)[number];
