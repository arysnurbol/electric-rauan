"use client";

import { useId, useState } from "react";
import { Calculator, Check, ChevronDown } from "lucide-react";
import type { CalcPreset } from "@/data/services";

export const CALC_PRESET_EVENT = "calc:preset";

/** Hands a preset to the calculator, then lets the anchor scroll to it. */
export function CalcLink({ preset, label, service }: { preset: CalcPreset; label: string; service: string }) {
  return (
    <a
      href="#calculator"
      data-service-calc={service}
      onClick={() => window.dispatchEvent(new CustomEvent<CalcPreset>(CALC_PRESET_EVENT, { detail: preset }))}
      className="inline-flex min-h-[44px] items-center gap-2 text-[0.92rem] font-semibold text-muted underline decoration-line underline-offset-4 transition-colors hover:text-fg hover:decoration-volt"
    >
      <Calculator size={16} aria-hidden="true" className="text-volt" />
      {label}
    </a>
  );
}

/** Included-items list: collapsible on phones, always open from sm up. */
export function ServiceItems({ items, label, columns = false }: { items: string[]; label: string; columns?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-5 mb-6 sm:mb-7">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between rounded-[var(--radius-sm)] border border-line px-4 text-[0.95rem] font-semibold sm:hidden"
      >
        <span>
          {label} <span className="text-muted">({items.length})</span>
        </span>
        <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <ul
        id={id}
        className={`${open ? "grid" : "hidden"} mt-3 gap-2 sm:mt-0 sm:grid ${columns ? "sm:grid-cols-2 lg:grid-cols-1" : ""}`}
      >
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[0.95rem]">
            <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-volt" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
