import Image from "next/image";
import { ADVANTAGES } from "@/data/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export function Advantages({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="advantages" aria-labelledby="advantages-title" className="section border-t border-line">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="advantages-title" className="font-display text-[clamp(1.75rem,5vw,3.4rem)] font-bold">
              {t.advantages.title}
            </h2>
            <figure className="mt-10 hidden sm:block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border border-line">
                <Image
                  src="/images/projects/dva-raspredelitelnyh-shchita.jpg"
                  alt={t.advantages.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">{t.advantages.caption}</figcaption>
            </figure>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {ADVANTAGES.map((a, i) => (
            <li
              key={a.title.ru}
              className="group grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-line py-7 first:border-t-0 first:pt-0 sm:grid-cols-[4.5rem_1fr] lg:py-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-[1.75rem] font-bold leading-none text-volt tabular-nums transition-transform duration-300 group-hover:translate-x-1 sm:text-[2.25rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[1.35rem] font-bold sm:text-[1.75rem]">{a.title[locale]}</h3>
                <p className="mt-2 max-w-[38rem] text-[1.05rem] text-muted sm:text-lg">{a.text[locale]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
