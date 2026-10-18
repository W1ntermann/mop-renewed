import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { zones } from '@/lib/site-data'

export function Zones({ preview = false }: { preview?: boolean }) {
  const visibleZones = preview ? zones.slice(0, 2) : zones

  return (
    <section id="zones" className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Зони форуму</p>
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
              Радість і користь для ваших малюків
            </h2>
          </div>
          <p className="max-w-sm text-pretty leading-relaxed text-primary-foreground/75">
            Кожна зона продумана так, щоб дитина гралася, розвивалася та почувалася в безпеці.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {visibleZones.map((zone, i) => (
            <li key={zone.title} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card text-card-foreground">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={zone.image || '/placeholder.svg'}
                    alt={zone.alt}
                    fill
                    sizes="(min-width: 1024px) 540px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-lg font-semibold">{zone.title}</h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{zone.lead}</p>
                  <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4 text-sm">
                    {zone.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 leading-relaxed">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
          {!preview && (
            <li className="md:col-span-2 lg:col-span-6">
              <p className="rounded-3xl border border-primary-foreground/20 px-6 py-5 text-center leading-relaxed text-primary-foreground/85">
                А також: бульбашкове шоу, фотозони, майстер-класи та подарунки для кожної дитини
              </p>
            </li>
          )}
        </ul>

        {preview ? (
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-pretty leading-relaxed text-primary-foreground/75">
              Ще три зони чекають на вас: аерохокей, творча майстерня та сенсорний куточок.
            </p>
            <Link
              href="/program#zones"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Дивитися всі зони
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-5 rounded-3xl bg-primary-foreground/5 px-6 py-10 text-center">
            <h3 className="max-w-xl text-balance text-2xl font-semibold leading-tight">
              Обирайте зони до вподоби — і реєструйтеся заздалегідь
            </h3>
            <p className="max-w-lg text-pretty leading-relaxed text-primary-foreground/75">
              Кількість місць у зонах обмежена, щоб кожна дитина отримувала увагу аніматорів і фахівців.
            </p>
            <Link
              href="/register"
              className="mt-1 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-accent-foreground transition-transform hover:scale-105"
            >
              Зареєструватися на форум
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
