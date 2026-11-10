import Image from "next/image";
import { ArrowDown, Check, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE, formatKzt } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/**
 * Concentric conduit bends — the signature detail of Rauan's routing
 * (parallel lines that turn with one shared centre). Drawn once on load.
 */
function CableRoute({ className = "" }: { className?: string }) {
  // Lines leave the photo downward, then turn left with one shared centre.
  const W = 1600;
  const cx = W - 110;
  const cy = 18;
  const radii = [26, 40, 54, 68, 82, 96];
  return (
    <svg width={W} height={cy + 104} viewBox={`0 0 ${W} ${cy + 104}`} fill="none" aria-hidden="true" className={className}>
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M${cx + r} 0 V${cy} A${r} ${r} 0 0 1 ${cx} ${cy + r} H0`}
          pathLength={1}
          stroke={i === 2 ? "var(--color-volt)" : "#3a4248"}
          strokeWidth={i === 2 ? 4 : 5}
          strokeLinecap="round"
          className="cable-path"
          style={{ "--len": 1, animationDelay: `${150 + i * 90}ms` } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.hero;
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-grid relative overflow-hidden pt-[72px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,transparent,var(--color-ink)_75%)]"
      />
      <div className="container-page relative grid gap-10 pt-10 pb-14 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-36">
        <div className="lg:col-span-7 lg:pr-4">
          <p className="hero-rise flex items-center gap-2.5 text-[0.95rem] font-medium text-muted">
            <span className="relative flex size-2.5" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-volt opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-volt" />
            </span>
            {h.kicker}
          </p>

          <h1
            id="hero-title"
            className="hero-rise mt-6 font-display text-[clamp(1.9rem,9.2vw,4.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] [overflow-wrap:normal] [animation-delay:80ms] lg:text-[clamp(2rem,calc(6vw-8px),4.6rem)]"
          >
            {h.title.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < h.title.length - 1 && <span className="sr-only"> </span>}
              </span>
            ))}
          </h1>

          <p className="hero-rise mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-muted [animation-delay:160ms] sm:text-lg">
            {h.lead}
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <a
              href={waLink(t, t.wa.hero)}
              target="_blank"
              rel="noopener noreferrer"
              data-source="hero"
              className="btn btn-primary btn-lift text-base sm:!px-7"
            >
              <WhatsAppIcon size={20} />
              {h.cta}
            </a>
            <a href={`tel:${SITE.phoneE164}`} data-source="hero" className="btn btn-ghost text-base">
              <Phone size={18} aria-hidden="true" />
              {h.call}
            </a>
          </div>

          <a
            href="#pricing"
            className="hero-rise group mt-9 block max-w-[34rem] border-l-2 border-volt pl-5 [animation-delay:320ms]"
          >
            <span className="block font-display text-xl font-semibold sm:text-2xl">
              {h.priceLabel}{" "}
              <span className="whitespace-nowrap underline decoration-line decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-volt">
                {t.common.from(`${formatKzt(SITE.pricePerM2)} ₸/м²`)}
              </span>
            </span>
            <span className="mt-1 block text-sm text-muted">{h.priceNote}</span>
          </a>
        </div>

        <div className="relative lg:col-span-5">
          {/* On desktop the photo stretches to the text column so the cable
              route below it never crosses the copy. */}
          <figure className="relative z-10 lg:h-full">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-ink-2 sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[460px]">
              <Image
                src="/images/projects/kabelnaya-trassa-chernaya-gofra.jpg"
                alt={h.photoAlt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1320px) 520px, (min-width: 1024px) 40vw, 100vw"
                className="parallax-img object-cover"
              />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 to-transparent" />
            </div>
            <figcaption className="absolute right-4 bottom-4 left-4 text-sm">
              <span className="inline-block rounded-[var(--radius-sm)] bg-ink/80 px-3 py-1.5 backdrop-blur">{h.photoCaption}</span>
            </figcaption>
            <CableRoute className="absolute top-[calc(100%-2px)] right-[calc(50%-60px)] -z-10 hidden max-w-none lg:block" />
          </figure>
        </div>
      </div>

      <div className="container-page relative pb-10">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-6 sm:flex sm:flex-wrap sm:gap-x-8">
          {h.trust.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.95rem] font-medium">
              <Check size={18} aria-hidden="true" className="shrink-0 text-volt" />
              {item}
            </li>
          ))}
        </ul>
        <a href="#trust" className="mt-8 hidden items-center gap-2 text-sm text-muted transition-colors hover:text-fg sm:inline-flex">
          <span className="grid size-9 place-items-center rounded-full border border-line">
            <ArrowDown size={16} aria-hidden="true" className="motion-safe:animate-bounce" />
          </span>
          {h.scroll}
        </a>
      </div>
    </section>
  );
}
