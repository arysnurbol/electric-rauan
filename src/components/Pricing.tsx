import { PRICE_EXAMPLES, PRICE_FACTORS } from "@/data/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE, formatKzt } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

export function Pricing({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.pricing;
  const price = formatKzt(SITE.pricePerM2);
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section border-t border-line bg-ink-2">
      <div className="container-page">
        <h2 id="pricing-title" className="font-display text-[clamp(1.75rem,5vw,3.6rem)] font-bold">
          {p.title}
        </h2>

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-12">
          <div className="relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-volt p-6 text-ink sm:p-10 lg:col-span-7">
            {/* faint conduit bend, echoing the hero */}
            <svg aria-hidden="true" viewBox="0 0 200 200" fill="none" className="pointer-events-none absolute -top-6 -right-6 w-44 opacity-[0.13] sm:w-56">
              {[20, 34, 48, 62].map((r) => (
                <path key={r} d={`M200 ${100 - r} H${120} A${r} ${r} 0 0 0 ${120 - r} ${100} V200`} stroke="#101214" strokeWidth="7" />
              ))}
            </svg>
            <h3 className="relative font-display text-xl font-bold sm:text-2xl">{p.card}</h3>
            <p className="relative mt-6 font-display font-extrabold leading-none tracking-[-0.03em]">
              {t.common.fromPrefix && <span className="align-top text-2xl sm:text-3xl">{t.common.fromPrefix} </span>}
              <span className="text-[clamp(3.2rem,11vw,6.5rem)] whitespace-nowrap tabular-nums">{price}</span>
              <span className="whitespace-nowrap text-2xl sm:text-3xl">
                {" "}
                {p.unit}
                {t.common.fromSuffix && <span className="text-xl font-bold sm:text-2xl"> {t.common.fromSuffix}</span>}
              </span>
            </p>
            <p className="relative mt-6 max-w-[30rem] text-[1.02rem] leading-relaxed text-ink/80">{p.note}</p>

            <div className="relative mt-8">
              <p className="text-sm font-semibold">{p.examples}</p>
              <dl className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] bg-ink/15 sm:grid-cols-4">
                {PRICE_EXAMPLES.map((e) => (
                  <div key={`${e.label.ru}-${e.area}`} className="bg-volt/95 px-3 py-3">
                    <dt className="text-xs font-semibold text-ink/70">
                      {e.label[locale]}, {e.area}&nbsp;м²
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold whitespace-nowrap tabular-nums">
                      {t.common.fromPrefix && <span className="text-xs font-semibold">{t.common.fromPrefix} </span>}
                      {formatKzt(e.area * SITE.pricePerM2)}&nbsp;₸
                      {t.common.fromSuffix && <span className="text-xs font-semibold"> {t.common.fromSuffix}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-ink/70">{p.examplesNote}</p>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-8">
              <a
                href={waLink(t, t.wa.pricing)}
                target="_blank"
                rel="noopener noreferrer"
                data-source="pricing"
                className="btn bg-ink text-fg hover:bg-[#2a3035]"
              >
                <WhatsAppIcon size={18} />
                {p.cta}
              </a>
              <a href="#calculator" className="btn border border-ink/30 text-ink hover:border-ink">
                {p.calc}
              </a>
            </div>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-line p-6 sm:p-10 lg:col-span-5">
            <h3 className="font-display text-xl font-bold sm:text-2xl">{p.factors}</h3>
            <ul className="mt-6 divide-y divide-line">
              {PRICE_FACTORS.map((f) => (
                <li key={f.ru} className="flex items-center gap-3 py-3.5">
                  <span aria-hidden="true" className="h-px w-4 shrink-0 bg-volt" />
                  {f[locale]}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{p.other}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
