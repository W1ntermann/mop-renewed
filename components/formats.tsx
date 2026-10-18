import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formats } from '@/lib/site-data'

const values = [
  {
    title: 'Просвітницький проєкт',
    text: 'Для батьків, які шукають відповіді, підтримку та прості пояснення складних тем.',
  },
  {
    title: 'Спільнота фахівців',
    text: 'Готових стати вашими надійними супутниками на цьому особливому шляху.',
  },
  {
    title: 'Практичні поради',
    text: 'Перевірені рішення для повсякденного життя родини.',
  },
]

export function Formats() {
  return (
    <section id="formats" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex max-w-2xl flex-col gap-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Формати участі</p>
          <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
            Оберіть зручний для вашої родини час
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Форум розділений на три блоки, щоб діти не перевтомлювались, а простір залишався комфортним для кожного.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {formats.map((f) => (
            <li key={f.block} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 md:p-8">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                {f.block}
              </span>
              <p className="font-heading text-2xl font-semibold text-primary md:text-3xl">{f.time}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">Лекції: {f.lectures}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-secondary px-6 py-10 text-center">
          <h3 className="max-w-xl text-balance text-2xl font-semibold leading-tight">
            Оберіть свій блок — і зареєструйтеся за кілька хвилин
          </h3>
          <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
            Можна відвідати один блок або залишитися на весь день — ми підкажемо найзручніший варіант вашій родині.
          </p>
          <Link
            href="/register"
            className="mt-1 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Зареєструватися на форум
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-20 grid gap-8 border-t border-border pt-12 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-2">
              <h3 className="font-sans text-lg font-semibold">{v.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
