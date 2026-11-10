"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated listener instead of turning every CTA into a client component.
 * WhatsApp / tel links report their placement via data-source.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const source = a.dataset.source ?? "unknown";
      if (href.startsWith("https://wa.me/")) {
        track("whatsapp_click", { source });
        if (a.dataset.service) track("service_inquiry", { service: a.dataset.service });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { source });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
