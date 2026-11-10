import Link from "next/link";
import { LOCALES, LOCALE_META, localePath, type Locale } from "@/i18n/config";

/**
 * RU | KZ segmented switch. Each option links to the same page in the other
 * language (different root layouts → full navigation, which is expected).
 */
export function LangSwitch({
  locale,
  path = "/",
  label,
  size = "sm",
}: {
  locale: Locale;
  path?: string;
  label: string;
  size?: "sm" | "lg";
}) {
  return (
    <nav aria-label={label}>
      <ul className="flex rounded-full border border-line p-0.5">
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={localePath(l, path)}
                hrefLang={LOCALE_META[l].htmlLang}
                lang={LOCALE_META[l].htmlLang}
                aria-current={active ? "page" : undefined}
                title={LOCALE_META[l].label}
                className={`grid place-items-center rounded-full font-semibold transition-colors ${
                  size === "lg" ? "h-11 min-w-[4.5rem] px-4 text-[0.95rem]" : "h-8 min-w-11 px-2.5 text-xs tracking-wide"
                } ${active ? "bg-fg text-ink" : "text-muted hover:text-fg"}`}
              >
                {size === "lg" ? LOCALE_META[l].label : LOCALE_META[l].short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
