import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Lectures } from '@/components/lectures'
import { Zones } from '@/components/zones'
import { Formats } from '@/components/formats'

export const metadata: Metadata = {
  title: 'Програма форуму — лекції, зони та формати участі | Моя особлива планета',
  description:
    'Розклад лекцій форуму «Моя особлива планета» 24 травня 2026: 7 лекцій від фахівців, ігрові та сенсорні зони для дітей, три блоки участі.',
  alternates: { canonical: '/program' },
}

export default function ProgramPage() {
  return (
    <>
      <Lectures />
      <Zones />
      <Formats />
      <section className="px-4 pb-20 md:px-6 md:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-[2rem] bg-primary px-6 py-12 text-center text-primary-foreground md:px-12">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight md:text-4xl">
            Обрали блок? Закріпіть участь — місць у зонах небагато
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-primary-foreground/75">
            Реєстрація допомагає нам підготувати достатню кількість матеріалів і подарунків для кожної дитини.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            Зареєструватися на форум
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}