"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { NAV_IDS, SITE } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { CopyPhone } from "./CopyPhone";
import { WhatsAppIcon } from "./Icons";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Solid background after the hero edge; hide while reading down, reveal on the way up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const focusInside = headerRef.current?.contains(document.activeElement);
      if (y < 320 || focusInside) setHidden(false);
      else if (Math.abs(y - lastY) > 6) setHidden(y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport
  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const waHref = waLink(t, t.wa.general);

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,translate] duration-300 ${
        solid ? "border-b border-line bg-ink/90 backdrop-blur-md" : "border-b border-transparent"
      } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4 min-[94rem]:max-w-[1560px]">
        <Logo href={localePath(locale)} label={t.common.home} />

        <nav aria-label={t.nav.main} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV_IDS.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors hover:text-fg ${
                      isActive ? "text-fg" : "text-muted"
                    }`}
                  >
                    {t.nav[id]}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-volt transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* phone shares the bar with the nav only where both fit */}
          <span className="hidden items-center gap-1.5 lg:flex xl:hidden min-[94rem]:flex">
            <a
              href={`tel:${SITE.phoneE164}`}
              data-source="header"
              className="flex items-center gap-2 text-[0.95rem] font-semibold whitespace-nowrap tabular-nums transition-colors hover:text-volt"
            >
              <Phone size={16} aria-hidden="true" className="text-volt" />
              {SITE.phoneDisplay}
            </a>
            <CopyPhone locale={locale} />
          </span>
          <span className="hidden md:block">
            <LangSwitch locale={locale} label={t.common.language} />
          </span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-source="header"
            className="btn btn-primary hidden !min-h-[42px] shrink-0 !px-4 sm:inline-flex"
          >
            <WhatsAppIcon size={18} />
            {t.nav.cta}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid size-11 place-items-center rounded-[var(--radius-sm)] border border-line transition-colors hover:border-fg xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-ink xl:hidden">
        <nav aria-label={t.nav.mobile} className="container-page flex min-h-full flex-col py-6">
          <ul className="flex flex-col">
            {NAV_IDS.map((id, i) => (
              <li key={id} className="border-b border-line">
                <a
                  href={`#${id}`}
                  onClick={() => {
                    // unlock scrolling before the browser performs the anchor jump
                    document.body.style.overflow = "";
                    setOpen(false);
                  }}
                  className="flex min-h-[56px] items-center justify-between font-display text-2xl font-semibold motion-safe:animate-[rise_400ms_var(--ease-out-quart)_both]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {t.nav[id]}
                  {active === id && <span aria-hidden="true" className="size-2 rounded-full bg-volt" />}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <LangSwitch locale={locale} label={t.common.language} size="lg" />
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-8 pb-4">
            <a href={waHref} target="_blank" rel="noopener noreferrer" data-source="mobile_menu" className="btn btn-primary w-full">
              <WhatsAppIcon size={18} />
              {t.nav.ctaLong}
            </a>
            <a href={`tel:${SITE.phoneE164}`} data-source="mobile_menu" className="btn btn-ghost w-full tabular-nums">
              <Phone size={18} aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
