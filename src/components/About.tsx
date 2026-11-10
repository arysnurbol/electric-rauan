import Image from "next/image";
import { MapPin } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/**
 * TODO(owner): add a personal photo of Rauan to public/images/rauan.jpg and
 * swap the image below. A work photo is used until a real portrait is provided.
 */
export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.about;
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-line bg-ink-2">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-line sm:aspect-[4/5]">
              <Image
                src="/images/projects/spuski-kabelya-k-rozetkam.jpg"
                alt={a.photoAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">{a.caption}</figcaption>
          </figure>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:pt-4">
          <h2 id="about-title" className="font-display text-[clamp(1.75rem,5vw,3.4rem)] font-bold">
            {a.title}
          </h2>

          <div className="mt-8 grid max-w-[40rem] gap-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            <p>
              <span className="text-fg">{a.intro}</span> {a.paragraphs[0]}
            </p>
            {a.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 grid max-w-[40rem] grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line">
            {a.facts.map((f) => (
              <div key={f.k} className="bg-ink-2 p-4 sm:p-5">
                <dt className="font-display text-base font-bold sm:text-lg">{f.k}</dt>
                <dd className="mt-1 text-xs text-muted sm:text-sm">{f.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a href={waLink(t, t.wa.about)} target="_blank" rel="noopener noreferrer" data-source="about" className="btn btn-primary btn-lift">
              <WhatsAppIcon size={18} />
              {a.cta}
            </a>
            <span className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} aria-hidden="true" />
              {a.travel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
