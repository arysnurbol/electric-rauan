import { MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { ContactForm } from "./ContactForm";
import { CopyPhone } from "./CopyPhone";
import { InstagramIcon, ThreadsIcon, WhatsAppIcon } from "./Icons";

export function FinalCTA({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="contacts" aria-labelledby="cta-title" className="bg-grid relative overflow-hidden border-t border-line">
      {/* Minimal technical graphic: conduit runs ending in a bend */}
      <svg aria-hidden="true" viewBox="0 0 400 400" fill="none" className="pointer-events-none absolute -top-10 -right-24 hidden w-[520px] opacity-60 lg:block">
        {[0, 14, 28].map((o) => (
          <path key={o} d={`M${40 + o} 0 V${220 - o} A${120 + o} ${120 + o} 0 0 0 ${160 + 2 * o} ${340} H400`} stroke="#2e353a" strokeWidth="5" />
        ))}
        <path d="M54 0 V206 A134 134 0 0 0 188 340 H400" stroke="var(--color-volt)" strokeWidth="3" strokeOpacity=".7" />
      </svg>

      <div className="container-page relative grid gap-12 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="cta-title" className="font-display text-[clamp(2rem,5.4vw,4rem)] font-extrabold leading-[1.02]">
            {t.cta.title}
          </h2>
          <p className="mt-6 max-w-[30rem] text-lg text-muted">{t.cta.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={waLink(t, t.wa.general)} target="_blank" rel="noopener noreferrer" data-source="final_cta" className="btn btn-primary btn-lift text-base">
              <WhatsAppIcon size={20} />
              {t.cta.whatsapp}
            </a>
            <a href={`tel:${SITE.phoneE164}`} data-source="final_cta" className="btn btn-ghost text-base">
              <Phone size={18} aria-hidden="true" />
              {t.cta.call}
            </a>
          </div>

          <address className="mt-12 grid gap-4 not-italic">
            <p className="font-display text-lg font-bold">
              <span translate="no">{SITE.brand}</span>
              <span className="block text-base font-medium text-muted">{t.common.owner}</span>
            </p>
            <span className="flex items-center gap-2">
              <a href={`tel:${SITE.phoneE164}`} data-source="contacts" className="flex items-center gap-3 text-lg font-semibold tabular-nums hover:text-volt">
                <Phone size={18} aria-hidden="true" className="text-volt" />
                {SITE.phoneDisplay}
              </a>
              <CopyPhone locale={locale} />
            </span>
            <p className="flex items-center gap-3 text-muted">
              <MapPin size={18} aria-hidden="true" className="text-volt" />
              {t.common.area}
            </p>
            <div className="flex gap-2 pt-2">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.cta.instagram}
                className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-volt hover:text-volt"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={SITE.threads}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.cta.threads}
                className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-volt hover:text-volt"
              >
                <ThreadsIcon size={19} />
              </a>
            </div>
          </address>
        </div>

        <div className="lg:col-span-7">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
