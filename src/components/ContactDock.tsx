import { Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";

/**
 * Mobile: sticky bottom bar (call + WhatsApp).
 * Tablet/desktop: floating WhatsApp button. Never both at once.
 */
export function ContactDock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const href = waLink(t, t.wa.general);
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a href={`tel:${SITE.phoneE164}`} data-source="mobile_bar" className="btn btn-ghost !px-3" aria-label={`${t.dock.call} ${SITE.phoneDisplay}`}>
            <Phone size={18} aria-hidden="true" />
            {t.dock.call}
          </a>
          <a href={href} target="_blank" rel="noopener noreferrer" data-source="mobile_bar" className="btn btn-primary !px-3" aria-label={t.dock.whatsappAria}>
            <WhatsAppIcon size={18} />
            {t.dock.whatsapp}
          </a>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-source="floating"
        aria-label={t.dock.whatsappAria}
        className="group fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-volt text-ink shadow-[0_8px_30px_rgb(0_0_0/0.45)] transition-transform duration-200 hover:scale-105 md:grid"
      >
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-volt/50 motion-safe:animate-[ping_2.4s_ease-out_3]" />
        <WhatsAppIcon size={28} className="relative" />
      </a>
    </>
  );
}
