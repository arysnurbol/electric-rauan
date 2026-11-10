import type { Metadata, Viewport } from "next";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getSiteUrl } from "@/lib/site";
import { Analytics } from "./Analytics";
import { ClickTracker } from "./ClickTracker";

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: "ELECTRIC RAUAN",
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const rootViewport: Viewport = {
  themeColor: "#101214",
  colorScheme: "dark",
};

/** Shared <html>/<body> for both locale root layouts. */
export function RootDocument({
  locale,
  fontClasses,
  children,
}: {
  locale: Locale;
  fontClasses: string;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);
  return (
    <html lang={LOCALE_META[locale].htmlLang} className={fontClasses}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-[var(--radius-sm)] bg-volt px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.common.skip}
        </a>
        {children}
        <ClickTracker />
        <Analytics />
      </body>
    </html>
  );
}
