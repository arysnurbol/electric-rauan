/**
 * Integration-ready analytics layer.
 * Events are pushed to whichever tools are actually loaded (GTM dataLayer,
 * GA4 gtag, Meta Pixel). Nothing is loaded until real IDs are configured and
 * NEXT_PUBLIC_ANALYTICS_ENABLED="true" — see src/components/Analytics.tsx.
 */
export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "service_inquiry"
  | "calculator_submit"
  | "lead_form_submit"
  | "portfolio_view";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Never put personal data (name, phone, comment) into params. */
export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
    window.fbq?.("trackCustom", event, params);
  } catch {
    /* analytics must never break the page */
  }
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params);
  }
}
