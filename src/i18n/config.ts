export const LOCALES = ["ru", "kk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ru";

/** Localised value: one entry per locale. */
export type L<T = string> = Record<Locale, T>;

/** Russian lives at the root, Kazakh under /kk. */
export const localePrefix = (locale: Locale) => (locale === DEFAULT_LOCALE ? "" : `/${locale}`);
export const localePath = (locale: Locale, path = "/") => {
  const p = localePrefix(locale) + (path === "/" ? "" : path);
  return p === "" ? "/" : p;
};

export const LOCALE_META: Record<Locale, { htmlLang: string; og: string; label: string; short: string }> = {
  ru: { htmlLang: "ru", og: "ru_KZ", label: "Русский", short: "RU" },
  kk: { htmlLang: "kk", og: "kk_KZ", label: "Қазақша", short: "KZ" },
};
