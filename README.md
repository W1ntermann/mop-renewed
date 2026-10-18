# Моя особлива планета 🪐

Сайт форуму **«Моя особлива планета»** — події для дітей з особливостями розвитку та їхніх батьків.

🌐 [mop.com.ua](https://mop.com.ua)

> 24 травня 2026, Одеса, Зелений театр. Лекції провідних фахівців для батьків, ігрові та сенсорні зони для дітей. Реєстрація обовʼязкова.

## Стек

- [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- [TypeScript 5.7](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- Компоненти на базі [shadcn](https://ui.shadcn.com/) та [@base-ui/react](https://base-ui.com/), іконки — [lucide-react](https://lucide.dev/)
- [pnpm](https://pnpm.io/) як менеджер пакетів
- [Vercel Analytics](https://vercel.com/docs/analytics)

## Швидкий старт

```bash
pnpm install   # встановити залежності
pnpm dev       # девсервер → http://localhost:3000
```

## Команди

| Команда         | Опис                                        |
| --------------- | ------------------------------------------- |
| `pnpm dev`      | Запуск девсервера (Turbopack)               |
| `pnpm build`    | Продакшн-збірка                             |
| `pnpm start`    | Запуск продакшн-сервера                     |
| `pnpm favicons` | Генерація фавіконів з `public/icon-512.png` |
| `pnpm sheet:setup` | Створення заголовка (базових колонок) у Google Таблиці реєстрацій |
| `pnpm notify:test` | Тестовий лист сповіщення через Resend |

## Реєстрація та сповіщення

Форма на `/register` надсилає заявку в `POST /api/register`, який:

1. валідує дані (`lib/registration.ts`);
2. додає рядок у Google Таблицю (`lib/sheets.ts`) — колонки: *Дата реєстрації, Імʼя, Телефон, Email, Дорослих, Дітей та вік, Блок участі, Статус, Джерело*;
3. надсилає два листи через Resend (`lib/notify.ts`): підтвердження учаснику та сповіщення організатору.

### Налаштування

1. Скопіюйте `.env.example` → `.env` і заповніть змінні.
2. **Google Sheets:** створіть [service account](https://console.cloud.google.com/) у Google Cloud Console, увімкніть *Google Sheets API*, завантажте JSON-ключ; створіть таблицю і надайте service account-пошті роль *Редактор*; впишіть `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` (допустимі `\n`) та `GOOGLE_SHEET_ID` (з URL таблиці).
3. Запустіть `pnpm sheet:setup` — створить закріплений заголовок із базовими колонками.
4. **Resend:** візьміть API-ключ; для продакшену верифікуйте домен і вкажіть `RESEND_FROM` (у тестовому режимі листи йдуть лише на вашу пошту Resend).
5. Перевірте канал: `pnpm notify:test`.

## Структура проєкту

```
app/
  (site)/            # сторінки сайту: головна, /program, /register
  layout.tsx         # кореневий layout, шрифти, метадані, SEO
  globals.css        # дизайн-токени та глобальні стилі
  robots.ts          # robots.txt
  sitemap.ts         # sitemap.xml
components/          # секції сайту (hero, lectures, zones, ...)
  ui/                # базові UI-компоненти (shadcn)
lib/
  site-data.ts       # централізовані дані сайту (тексти, дати, контакти)
  utils.ts           # хелпери (cn тощо)
scripts/
  generate-favicons.mjs
public/              # статичні асети та фавікони
```

## Ліцензія

Приватний проєкт. Усі права застережено.
