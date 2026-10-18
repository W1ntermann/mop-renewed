import Image from 'next/image'
import { lectures } from '@/lib/site-data'

export function Lectures() {
  return (
    <section id="lectures" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Програма для батьків</p>
          <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
            Пізнавальні лекції на актуальні теми розвитку та здоровʼя дітей
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Ми тут, щоб ділитися, надихати, допомагати і йти поруч. Бо кожен крок — важливий. А ви — не самі.
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/lecture.png"
              alt="Фахівчиня проводить лекцію для батьків у відкритому амфітеатрі"
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <ol className="flex flex-col lg:col-span-7">
          {lectures.map((lecture, i) => (
            <li key={lecture.time} className="group relative flex gap-5 pb-8 last:pb-0 md:gap-8">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-20 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground">
                  {lecture.time}
                </span>
                {i < lectures.length - 1 && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-border" />}
              </div>
              <article className="flex flex-1 flex-col gap-2 rounded-3xl border border-border bg-card p-5 transition-shadow group-hover:shadow-lg group-hover:shadow-primary/5 md:p-6">
                <p className="text-sm font-semibold text-primary">{lecture.role}</p>
                <h3 className="text-pretty font-sans text-lg font-semibold leading-snug">
                  {'«'}
                  {lecture.title}
                  {'»'}
                </h3>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
