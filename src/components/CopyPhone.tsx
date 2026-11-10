"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE } from "@/lib/site";

/**
 * tel: links do nothing useful on most desktops, so mouse users get a
 * one-click copy next to the number. Hidden on touch devices.
 */
export function CopyPhone({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.phoneDisplay);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the number is still visible */
    }
  };

  return (
    <span className={`relative hidden pointer-fine:inline-flex ${className}`}>
      <button
        type="button"
        onClick={copy}
        aria-label={t.common.copyPhone}
        title={t.common.copyPhone}
        className={`grid size-9 place-items-center rounded-full border transition-colors ${
          copied ? "border-volt text-volt" : "border-line text-muted hover:border-fg hover:text-fg"
        }`}
      >
        {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-[var(--radius-sm)] bg-fg px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-ink transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? t.common.copied : ""}
      </span>
    </span>
  );
}
