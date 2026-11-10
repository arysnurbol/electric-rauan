import { TRUST_POINTS } from "@/data/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { TrustGlyph } from "./Icons";

export function TrustBar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="trust" aria-labelledby="trust-title" className="border-y border-line bg-ink-2">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <h2 id="trust-title" className="font-display text-[clamp(1.75rem,4vw,2.6rem)] font-bold lg:col-span-4 lg:max-w-[14ch]">
          {t.trust.title}
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {TRUST_POINTS.map((p) => (
            <li key={p.icon} className="group flex gap-4 bg-ink-2 p-6 transition-colors duration-300 hover:bg-[#1d2226] lg:p-7">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-volt transition-colors duration-300 group-hover:border-volt">
                <TrustGlyph name={p.icon} size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{p.title[locale]}</h3>
                <p className="mt-1.5 text-[0.95rem] text-muted">{p.text[locale]}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
