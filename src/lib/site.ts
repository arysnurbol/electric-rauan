
/**
 * Verified business facts only. Anything not confirmed by the owner
 * (address, opening hours, ratings, certificates) is intentionally absent.
 */
export const SITE = {
  brand: "ELECTRIC RAUAN",
  phoneDisplay: "+7 707 109 02 26",
  phoneE164: "+77071090226",
  whatsappNumber: "77071090226",
  experienceYears: 7,
  pricePerM2: 6000,
  instagram: "https://www.instagram.com/electric.rauan/",
  threads: "https://www.threads.com/@rauan_tuganbay",
} as const;

/**
 * Production URL. Set NEXT_PUBLIC_SITE_URL once the domain is known.
 * On Vercel the production hostname is used automatically as a fallback.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const NAV_IDS = ["services", "advantages", "process", "pricing", "about", "contacts"] as const;
export type NavId = (typeof NAV_IDS)[number];

/**
 * "510 000" with a non-breaking space — the grouping both Russian and Kazakh use.
 * Deliberately not Intl: Chrome ships no kk-KZ data and falls back to "510,000",
 * which also breaks hydration against Node's output.
 */
export const formatKzt = (value: number) =>
  Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
