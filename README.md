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
