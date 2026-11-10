import type { Metadata } from "next";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { alternates } from "@/lib/seo";
import { Footer } from "./Footer";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";

export function privacyMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return { title: t.meta.privacyTitle, description: t.meta.privacyDescription, alternates: alternates(locale, "/privacy") };
}

/**
 * TODO(owner): review this text with a lawyer and add the operator's legal
 * details (ИП / БИН, contact e-mail) required by the Law of the Republic of
 * Kazakhstan «О персональных данных и их защите».
 */
export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <header className="border-b border-line">
        <div className="container-page flex h-[72px] items-center justify-between">
          <Logo href={localePath(locale)} label={t.common.home} />
          <LangSwitch locale={locale} path="/privacy" label={t.common.language} />
        </div>
      </header>
      <main id="main" className="container-page max-w-[52rem] py-16 lg:py-24">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold">{t.privacy.title}</h1>
        <div className="mt-10 grid gap-8 text-muted">
          {t.privacy.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl font-bold text-fg">{s.h}</h2>
              <p className="mt-3">{s.p}</p>
            </section>
          ))}
          <p className="text-sm">
            <Link href={localePath(locale)} className="text-fg underline underline-offset-2 hover:text-volt">
              {t.privacy.back}
            </Link>
          </p>
        </div>
      </main>
      <Footer locale={locale} onHome={false} />
    </>
  );
}
