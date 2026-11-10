import { MessageCircle, Plus } from "lucide-react";
import { FAQ as ITEMS } from "@/data/faq";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/** Native <details>: keyboard and screen-reader accessible, works without JS, crawlable. */
export function FAQ({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="faq" aria-labelledby="faq-title" className="section border-t border-line">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-title" className="font-display text-[clamp(1.75rem,5vw,3.4rem)] font-bold">
              {t.faq.title}
            </h2>
            <div className="mt-8 hidden rounded-[var(--radius-lg)] border border-line p-6 lg:block">
              <p className="font-display text-lg font-bold">{t.faq.moreTitle}</p>
              <p className="mt-2 text-sm text-muted">{t.faq.moreText}</p>
              <a
                href={waLink(t, t.wa.general)}
                target="_blank"
                rel="noopener noreferrer"
                data-source="faq_more"
                className="btn btn-primary mt-5"
              >
                <WhatsAppIcon size={18} />
                {t.faq.moreCta}
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {ITEMS.map((f) => (
              <details key={f.q.ru} name="faq" className="faq-item group border-b border-line">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-semibold transition-colors hover:text-volt sm:text-xl">
                  <h3>{f.q[locale]}</h3>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:border-volt group-open:text-volt">
                    <Plus size={18} aria-hidden="true" />
                  </span>
                </summary>
                <div className="max-w-[46rem] pb-6">
                  <p className="text-muted">{f.a[locale]}</p>
                  <a
                    href={waLink(t, t.wa.question(f.q[locale]))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-source="faq"
                    className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold underline decoration-line underline-offset-4 transition-colors hover:text-volt hover:decoration-volt"
                  >
                    <MessageCircle size={16} aria-hidden="true" className="text-volt" />
                    {t.faq.ask}
                  </a>
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line p-5 sm:flex-row sm:items-center sm:justify-between lg:hidden">
            <div>
              <p className="font-display text-lg font-bold">{t.faq.moreTitle}</p>
              <p className="mt-1 text-sm text-muted">{t.faq.moreText}</p>
            </div>
            <a href={waLink(t, t.wa.general)} target="_blank" rel="noopener noreferrer" data-source="faq_more" className="btn btn-primary">
              <WhatsAppIcon size={18} />
              {t.faq.moreCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
