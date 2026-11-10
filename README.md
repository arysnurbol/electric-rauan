# ELECTRIC RAUAN — сайт электромонтажа в Алматы

Одностраничный сайт-лендинг для Рауана Туганбая: электромонтаж под ключ, сборка электрощитов,
умный дом и слаботочные системы. Next.js 16 (App Router, Turbopack), React 19, TypeScript,
Tailwind CSS 4, lucide-react. Все страницы статические.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run start      # запуск production-сборки
npm run lint
```

Node.js 20.9+.

## Деплой на Vercel

1. Залить репозиторий на GitHub и импортировать его в Vercel. Фреймворк определится автоматически.
2. В Settings → Environment Variables задать `NEXT_PUBLIC_SITE_URL=https://ваш-домен.kz`
   (см. `.env.example`). Без неё используется production-домен Vercel.
3. Подключить домен в Settings → Domains.
4. После публикации: добавить сайт в Google Search Console и Яндекс Вебмастер и отправить
   `/sitemap.xml`.

## Языки (RU / KZ)

- Русский — `/`, `/privacy`; казахский — `/kk`, `/kk/privacy`. Два root layout:
  `src/app/(ru)` и `src/app/(kk)` (свой `<html lang>`, свои шрифты, hreflang, sitemap).
- Тексты интерфейса — `src/i18n/ru.ts` (источник типа) и `src/i18n/kk.ts`: TypeScript не даст
  собрать проект, если в казахском словаре пропущен ключ.
- Тексты услуг, FAQ, портфолио — в `src/data/*` в виде `{ ru, kk }` рядом с каждой записью.
- Казахский перевод стоит вычитать носителю языка перед запуском.

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, ссылки, цена за м², опыт | `src/lib/site.ts` |
| Услуги | `src/data/services.ts` |
| Портфолио (фото + категории) | `src/data/projects.ts`, фото в `public/images/projects/` |
| FAQ | `src/data/faq.ts` |
| Преимущества, этапы, факторы цены | `src/data/content.ts` |
| Тексты WhatsApp-сообщений | `src/lib/whatsapp.ts` |
| SEO (title, description, JSON-LD) | `src/lib/seo.tsx` |
| Политика конфиденциальности | `src/app/privacy/page.tsx` |

**Добавить фото в портфолио:** сжать до ~1440 px по длинной стороне (JPG), положить в
`public/images/projects/` с понятным латинским именем и добавить запись в `PROJECTS`.
Категории без фото в фильтре не показываются.

## Аналитика

События: `whatsapp_click`, `phone_click`, `service_inquiry`, `calculator_submit`,
`lead_form_submit`, `portfolio_view` (`src/lib/analytics.ts`). Персональные данные в события
не передаются. GTM / GA4 / Meta Pixel подключаются только при
`NEXT_PUBLIC_ANALYTICS_ENABLED=true` и заданных ID (`src/components/Analytics.tsx`).

## Форма заявки

Сайт не имеет сервера для заявок: после проверки полей открывается WhatsApp с готовым
сообщением. Заявка доходит до Рауана только после нажатия «Отправить» в WhatsApp — об этом
прямо сказано пользователю.
