import Image from "next/image";
import { SERVICES, type Service } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { ServiceGlyph } from "./Icons";
import { CalcLink, ServiceItems } from "./ServiceBits";

/**
 * Asymmetric layout: services with real photos get photo panels, the rest are
 * text-led. Grid spans differ per row so no two rows look alike.
 */
const LAYOUT: Record<string, string> = {
  turnkey: "lg:col-span-7",
  panels: "lg:col-span-5",
  "smart-home": "lg:col-span-4",
  "low-voltage": "lg:col-span-4",
  houses: "lg:col-span-4",
  business: "lg:col-span-12",
};

function Actions({ s, t, locale }: { s: Service; t: Dictionary; locale: Locale }) {
  const title = s.title[locale];
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
      <a
        href={waLink(t, t.wa.service(title))}
        target="_blank"
        rel="noopener noreferrer"
        data-source="services"
        data-service={s.id}
        aria-label={t.services.ctaAria(title)}
        className="btn btn-ghost group-hover/card:border-volt group-hover/card:text-volt"
      >
        {t.services.cta}
      </a>
      {s.preset && <CalcLink preset={s.preset} label={t.services.calc} service={s.id} />}
    </div>
  );
}

function Heading({ s, locale }: { s: Service; locale: Locale }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-line text-volt transition-colors duration-300 group-hover/card:border-volt">
        <ServiceGlyph name={s.icon} size={22} />
      </span>
      <h3 className="font-display text-[1.3rem] font-bold leading-tight sm:text-2xl">{s.title[locale]}</h3>
    </div>
  );
}

export function Services({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="services-title" className="font-display text-[clamp(1.75rem,5vw,3.6rem)] font-bold lg:col-span-7">
            {t.services.title}
          </h2>
          <p className="max-w-[36rem] text-lg text-muted lg:col-span-5">{t.services.lead}</p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
          {SERVICES.map((s) => {
            const span = LAYOUT[s.id] ?? "lg:col-span-4";
            const wide = s.id === "business";
            // Photo beside text only where the card is wide enough (7 cols at xl)
            const side = s.id === "turnkey";
            return (
              <article
                key={s.id}
                id={`service-${s.id}`}
                className={`group/card relative flex overflow-hidden rounded-[var(--radius-lg)] border border-line bg-ink-2 transition-[border-color,background-color] duration-300 hover:border-[#4b555c] hover:bg-[#1c2124] ${span} ${
                  s.image ? `flex-col sm:flex-row lg:flex-col ${side ? "xl:flex-row" : ""}` : "flex-col"
                }`}
              >
                {s.image && (
                  <div
                    className={`relative aspect-[16/9] shrink-0 overflow-hidden sm:aspect-auto sm:w-[42%] lg:aspect-[16/10] lg:w-full ${
                      side ? "xl:aspect-auto xl:w-[44%]" : ""
                    }`}
                  >
                    <Image
                      src={s.image.src}
                      alt={s.image.alt[locale]}
                      fill
                      sizes="(min-width: 1280px) 300px, (min-width: 1024px) 45vw, (min-width: 640px) 40vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
                    />
                  </div>
                )}
                <div
                  className={`flex flex-1 flex-col p-5 sm:p-7 ${
                    wide ? "lg:grid lg:grid-cols-[1.1fr_1fr_auto] lg:items-start lg:gap-10 lg:p-9" : ""
                  }`}
                >
                  {wide ? (
                    <>
                      <div>
                        <Heading s={s} locale={locale} />
                        <p className="mt-4 text-muted">{s.description[locale]}</p>
                      </div>
                      <ServiceItems items={s.items[locale]} label={t.services.included} columns />
                      <div className="lg:self-center">
                        <Actions s={s} t={t} locale={locale} />
                      </div>
                    </>
                  ) : (
                    <>
                      <Heading s={s} locale={locale} />
                      <p className="mt-4 text-muted">{s.description[locale]}</p>
                      <ServiceItems items={s.items[locale]} label={t.services.included} />
                      <Actions s={s} t={t} locale={locale} />
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
