const langs = ["en"] as const;

export default langs;
export type SupportedLanguage = (typeof langs)[number];
