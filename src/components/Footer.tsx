import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE } from "@/lib/site";
import { BoltMark, InstagramIcon, ThreadsIcon } from "./Icons";
import { LangSwitch } from "./LangSwitch";

const FOOTER_NAV = ["services", "advantages", "process", "contacts"] as const;

/** `onHome` = rendered on the landing page (plain #anchors) vs. a sub-page. */
export function Footer({ locale, onHome = true }: { locale: Locale; onHome?: boolean }) {
  const t = getDictionary(locale);
  const home = localePath(locale);
  return (
    <footer className="border-t border-line bg-ink pb-24 md:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p translate="no" className="flex items-center gap-2.5 font-display font-bold tracking-[0.04em]">
            <span className="grid size-8 place-items-center rounded-[var(--radius-sm)] bg-volt text-ink">
              <BoltMark size={18} />
            </span>
            {SITE.brand}
          </p>
          <p className="mt-4 max-w-[26rem] text-sm text-muted">
            {t.footer.about} {t.common.area}.
          </p>
          <div className="mt-6">
            <LangSwitch locale={locale} path={onHome ? "/" : "/privacy"} label={t.common.language} />
          </div>
        </div>
        <nav aria-label={t.nav.footer} className="md:col-span-3">
          <ul className="grid gap-2">
            {FOOTER_NAV.map((id) => (
              <li key={id}>
                {onHome ? (
                  <a href={`#${id}`} className="inline-flex min-h-[32px] items-center text-muted hover:text-fg">
                    {t.nav[id]}
                  </a>
                ) : (
                  <Link href={`${home}#${id}`} className="inline-flex min-h-[32px] items-center text-muted hover:text-fg">
                    {t.nav[id]}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid content-start gap-2 md:col-span-4">
          <a href={`tel:${SITE.phoneE164}`} data-source="footer" className="font-semibold tabular-nums hover:text-volt">
            {SITE.phoneDisplay}
          </a>
          <span className="text-sm text-muted">{t.common.owner}</span>
          <div className="mt-2 flex gap-4 text-sm">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-[32px] items-center gap-2 text-muted hover:text-fg">
              <InstagramIcon size={16} /> Instagram
            </a>
            <a href={SITE.threads} target="_blank" rel="noopener noreferrer" className="flex min-h-[32px] items-center gap-2 text-muted hover:text-fg">
              <ThreadsIcon size={16} /> Threads
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:justify-between">
          <p>{t.footer.copyright}</p>
          <Link href={localePath(locale, "/privacy")} className="hover:text-fg">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
