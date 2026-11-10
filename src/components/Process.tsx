import { PROCESS_STEPS } from "@/data/content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

/**
 * Work stages drawn as modules on a DIN rail with a numbered marking strip —
 * the same strip Rauan labels his panels with. Steps are a real sequence,
 * so the numbering carries meaning.
 */
export function Process({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section id="process" aria-labelledby="process-title" className="section border-t border-line">
      <div className="container-page">
        <h2 id="process-title" className="max-w-[20ch] font-display text-[clamp(1.75rem,5vw,3.6rem)] font-bold">
          {t.process.title}
        </h2>

        <div className="relative mt-12 lg:mt-16">
          {/* Marking strip — desktop only, mirrors the panel label strips */}
          <div
            aria-hidden="true"
            className="hidden overflow-hidden rounded-[4px] border-2 border-volt bg-[#0b0c0d] lg:grid lg:grid-cols-5"
          >
            {PROCESS_STEPS.map((_, i) => (
              <div key={i} className="border-r border-[#2a3035] py-1.5 text-center font-display text-sm font-semibold text-volt last:border-r-0">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Rail */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[19px] w-[6px] rounded-full bg-gradient-to-b from-[#5b646a] via-[#3d454a] to-[#5b646a] lg:top-[86px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[6px] lg:w-auto lg:bg-gradient-to-r"
          />

          <ol className="relative grid gap-5 lg:mt-5 lg:grid-cols-5 lg:gap-0">
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.title.ru} className="group relative pl-14 lg:pl-0">
                <div className="lg:mx-1.5 lg:h-full">
                  {/* Module body */}
                  <div className="absolute top-1 left-0 grid size-11 place-items-center rounded-[var(--radius-sm)] border border-line bg-ink-2 transition-[border-color,translate] duration-300 group-hover:border-volt lg:static lg:mx-auto lg:h-[88px] lg:w-[72px] lg:content-between lg:py-3 lg:group-hover:-translate-y-1">
                    <span className="hidden font-display text-xs font-semibold text-muted lg:block">0{i + 1}</span>
                    <span
                      className="rail-led size-2.5 rounded-full bg-volt shadow-[0_0_10px_2px_rgb(223_255_0/0.45)]"
                      aria-hidden="true"
                    />
                    <span className="hidden h-5 w-3 rounded-[3px] bg-[#c9cfd2] lg:block" aria-hidden="true" />
                  </div>
                  <div className="lg:mt-8 lg:border-t lg:border-line lg:pt-6 lg:pr-6">
                    <h3 className="font-display text-xl font-bold">
                      <span className="text-muted lg:hidden">{i + 1}. </span>
                      {s.title[locale]}
                    </h3>
                    <p className="mt-2 text-muted">{s.text[locale]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
