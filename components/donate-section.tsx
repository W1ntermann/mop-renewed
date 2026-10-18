import { Heart } from 'lucide-react'
import { donate } from '@/lib/site-data'

export function DonateSection() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-card p-6 shadow-lg shadow-primary/5 sm:p-10 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/15 blur-2xl"
          />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-10 size-52 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
                <Heart className="size-4 fill-current" aria-hidden="true" />
                Донати
              </span>
              <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">{donate.title}</h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">{donate.text}</p>
            </div>
            <a
              href={donate.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-[0_12px_32px_-10px_color-mix(in_oklab,var(--primary),transparent_25%)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Heart className="size-4 fill-current" aria-hidden="true" />
              </span>
              {donate.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}