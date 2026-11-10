import type { Metadata } from "next";
import { FAQ } from "@/data/faq";
import { SERVICES } from "@/data/services";
import { DEFAULT_LOCALE, LOCALES, LOCALE_META, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE, getSiteUrl } from "./site";

export const OG_IMAGE = "/og-image.jpg";

/** hreflang map for a path that exists in every locale. */
export function alternates(locale: Locale, path = "/"): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_META[l].htmlLang] = localePath(l, path);
  languages["x-default"] = localePath(DEFAULT_LOCALE, path);
  return { canonical: localePath(locale, path), languages };
}

export function homeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates(locale),
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].og,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_META[l].og),
      siteName: SITE.brand,
      title: t.meta.title,
      description: t.meta.description,
      url: localePath(locale),
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [OG_IMAGE] },
  };
}

/**
 * Only verified facts: no street address, opening hours, ratings or reviews.
 * Rauan is a service-area business (Almaty + Almaty Region).
 */
export function businessJsonLd(locale: Locale) {
  const url = getSiteUrl();
  const t = getDictionary(locale);
  const pageUrl = `${url}${localePath(locale) === "/" ? "" : localePath(locale)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Electrician",
        "@id": `${url}/#business`,
        name: SITE.brand,
        url: pageUrl,
        image: `${url}${OG_IMAGE}`,
        telephone: SITE.phoneE164,
        description: t.meta.description,
        founder: { "@type": "Person", name: t.common.owner },
        areaServed: [
          { "@type": "City", name: "Алматы" },
          { "@type": "AdministrativeArea", name: locale === "kk" ? "Алматы облысы" : "Алматинская область" },
        ],
        sameAs: [SITE.instagram, SITE.threads],
        knowsLanguage: ["ru", "kk"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.meta.catalog,
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title[locale],
              description: s.description[locale],
              areaServed: "Алматы",
            },
            ...(s.id === "turnkey"
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: SITE.pricePerM2,
                    priceCurrency: "KZT",
                    unitText: t.meta.unit,
                  },
                }
              : {}),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE.brand,
        inLanguage: ["ru", "kk"],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: LOCALE_META[locale].htmlLang,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q[locale],
          acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
        })),
      },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
