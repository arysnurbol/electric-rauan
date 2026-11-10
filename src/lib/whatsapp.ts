import type { Dictionary } from "@/i18n";
import { SITE } from "./site";

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Greeting + one sentence, the shape of every short prefilled message. */
export const waText = (t: Dictionary, body: string) => `${t.wa.greeting} ${body}`;
export const waLink = (t: Dictionary, body: string) => whatsappUrl(waText(t, body));

/** Builds a multi-line message from labelled parts, skipping empty values. */
export function composeMessage(intro: string, lines: Array<[string, string | undefined | null]>, outro?: string) {
  const body = lines
    .filter(([, v]) => v && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v!.trim()}`);
  return [intro, ...body, outro].filter(Boolean).join("\n");
}
