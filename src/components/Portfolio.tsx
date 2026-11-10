"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { track } from "@/lib/analytics";

type Filter = "all" | ProjectCategory;

const SIZE_CLASS = { tall: "row-span-2", wide: "col-span-2", normal: "" } as const;
const CATEGORY_KEYS = Object.keys(PROJECT_CATEGORIES) as ProjectCategory[];

export function Portfolio({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).portfolio;
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  // Only offer categories that actually have photos
  const categories = useMemo(() => CATEGORY_KEYS.filter((c) => PROJECTS.some((p) => p.category === c)), []);
  const items = useMemo(() => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter]);
  const counts = useMemo(() => {
    const m = new Map<Filter, number>([["all", PROJECTS.length]]);
    for (const p of PROJECTS) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, []);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
    track("portfolio_view", { category: items[i].category, image: items[i].src.split("/").pop() });
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => setIndex(null);
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : items[index];
  const neighbour = index === null ? null : items[(index + 1) % items.length];

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section border-t border-line bg-ink-2">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="portfolio-title" className="font-display text-[clamp(1.75rem,5vw,3.6rem)] font-bold lg:col-span-6">
            {t.title}
          </h2>
          <p className="max-w-[34rem] text-lg text-muted lg:col-span-6 lg:justify-self-end">{t.lead}</p>
        </div>

        <div
          role="group"
          aria-label={t.filter}
          className="mt-10 -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {(["all", ...categories] as Filter[]).map((c) => {
            const pressed = filter === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(c)}
                className={`flex min-h-[44px] shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-[0.92rem] font-semibold transition-colors ${
                  pressed ? "border-volt bg-volt text-ink" : "border-line text-muted hover:border-fg hover:text-fg"
                }`}
              >
                {c === "all" ? t.all : PROJECT_CATEGORIES[c][locale]}
                <span className={`text-xs tabular-nums ${pressed ? "text-ink/60" : "text-muted/70"}`}>{counts.get(c)}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] md:grid-cols-3 lg:auto-rows-[260px] lg:grid-cols-4 lg:gap-4">
          {items.map((p, i) => (
            <li key={p.src} className={`motion-safe:animate-[rise_500ms_var(--ease-out-quart)_both] ${SIZE_CLASS[p.size ?? "normal"]}`}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block size-full overflow-hidden rounded-[var(--radius-md)] border border-line bg-ink text-left"
                aria-label={t.open(p.caption[locale])}
              >
                <Image
                  src={p.src}
                  alt={p.alt[locale]}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100"
                />
                <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                  <span>
                    <span className="block text-xs font-semibold text-volt">{PROJECT_CATEGORIES[p.category][locale]}</span>
                    <span className="mt-0.5 line-clamp-2 block text-sm leading-snug font-medium">{p.caption[locale]}</span>
                  </span>
                  <span className="hidden size-8 shrink-0 place-items-center rounded-full bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100 sm:grid">
                    <Maximize2 size={14} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={current ? current.caption[locale] : t.viewer}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg"
      >
        {current && (
          <div className="flex h-full flex-col p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted tabular-nums" aria-live="polite">
                {index! + 1} / {items.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full border border-line bg-ink hover:border-fg"
                aria-label={t.close}
                autoFocus
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <figure
              className="relative my-4 min-h-0 flex-1 touch-pan-y"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt[locale]}
                fill
                sizes="100vw"
                className="object-contain motion-safe:animate-[rise_300ms_ease-out_both]"
              />
              {/* warm the cache for the next photo */}
              {neighbour && neighbour !== current && (
                <Image src={neighbour.src} alt="" aria-hidden="true" fill sizes="100vw" className="invisible" />
              )}
            </figure>
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-ink hover:border-fg"
                aria-label={t.prev}
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <p className="text-center text-sm sm:text-base">
                <span className="text-volt">{PROJECT_CATEGORIES[current.category][locale]}.</span> {current.caption[locale]}
                <span className="mt-1 block text-xs text-muted">{t.swipe}</span>
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-ink hover:border-fg"
                aria-label={t.next}
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
