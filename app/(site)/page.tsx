import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Zones } from '@/components/zones'

export const metadata: Metadata = {
  title: 'Моя особлива планета — форум для дітей з особливостями розвитку та їх батьків',
  description:
    'Форум «Моя особлива планета» 24 травня 2026, Одеса, Зелений театр. Лекції провідних фахівців для батьків, ігрові та сенсорні зони для дітей. Реєстрація обовʼязкова.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Zones preview />
      <section className="px-4 pb-20 md:px-6 md:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-[2rem] border border-border bg-card px-6 py-12 text-center shadow-sm md:px-12">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight md:text-4xl">
            Програма, зони та формати участі — на одній сторінці
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Загляніть у розклад лекцій, познайомтеся з ігровими зонами для дітей і оберіть зручний блок участі.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/program"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Переглянути програму
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-7 py-4 font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Зареєструватися
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}