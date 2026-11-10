import type { Metadata } from "next";
import { BoltMark } from "@/components/Icons";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | ELECTRIC RAUAN",
  robots: { index: false },
};

/** Bilingual: the locale of an unmatched URL is unknown. */
export default function GlobalNotFound() {
  return (
    <html lang="ru">
      <body className="bg-grid">
        {/* system fonts: importing a next/font set here would leak it into every page's CSS */}
        <main className="container-page grid min-h-dvh content-center gap-8 py-16 [font-family:system-ui,sans-serif]">
          <span className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-volt text-ink">
            <BoltMark size={26} />
          </span>
          <h1 className="font-display text-[clamp(2.4rem,8vw,5rem)] font-extrabold leading-none">404</h1>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="font-display text-xl font-bold">Страница не найдена</p>
              <p className="mt-2 text-muted">Возможно, ссылка устарела. Вернитесь на главную — там все услуги и контакты.</p>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-not-found renders outside the router */}
              <a href="/" className="btn btn-primary mt-5">
                На главную
              </a>
            </div>
            <div lang="kk">
              <p className="font-display text-xl font-bold">Бет табылмады</p>
              <p className="mt-2 text-muted">Сілтеме ескірген болуы мүмкін. Басты бетке оралыңыз — онда барлық қызметтер мен байланыс бар.</p>
              <a href="/kk" className="btn btn-ghost mt-5">
                Басты бетке
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
