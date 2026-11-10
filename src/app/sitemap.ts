import type { MetadataRoute } from "next";
import { LOCALES, LOCALE_META, localePath } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site";

const PAGES = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  const abs = (p: string) => `${url}${p === "/" ? "" : p}` || url;
  return PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: abs(localePath(locale, page.path)) || url,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      // every locale lists all alternates, including itself (hreflang reciprocity)
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [LOCALE_META[l].htmlLang, abs(localePath(l, page.path)) || url]),
        ),
      },
    })),
  );
}
