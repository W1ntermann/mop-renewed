'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { event } from '@/lib/site-data'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 md:px-6 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Безкоштовний форум для родин · Одеса
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Моя особлива <span className="text-primary">планета</span>
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Ми створюємо середовище, де кожна дитина з особливостями в розвитку — у безпеці, прийнятті та турботі. А
            кожні батьки — в оточенні розуміння і підтримки.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Зареєструватися на форум
            </Link>
            <Link
              href="/program"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-4 font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Програма форуму
            </Link>
          </div>

          <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Дата</dt>
                <dd className="font-semibold">{event.date}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Час</dt>
                <dd className="font-semibold">{event.time}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Місце</dt>
                <dd className="font-semibold">{event.venue}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
          <div
            aria-hidden="true"
            className="animate-orbit absolute -inset-6 rounded-full border-2 border-dashed border-primary/20 md:-inset-10"
          >
            <span className="absolute left-1/2 top-0 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
            <span className="absolute bottom-[12%] left-[4%] size-3 rounded-full bg-primary" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-full border-8 border-card shadow-xl shadow-primary/10">
            <Image
              src="/images/hero.png"
              alt="Мама з дитиною граються разом із сенсорними іграшками на сімейному святі"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-0 rounded-2xl bg-card px-5 py-4 shadow-lg shadow-primary/10 md:left-4">
            <p className="font-heading text-2xl font-semibold text-primary">7 лекцій</p>
            <p className="text-sm text-muted-foreground">від провідних фахівців</p>
          </div>
        </div>
      </div>

    </section>
  )
}
