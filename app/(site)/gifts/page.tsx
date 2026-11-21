import type { Metadata } from 'next'
import { Gifts } from '@/components/gifts'

export const metadata: Metadata = {
  title: 'Реєстрація на святкову роздачу подарунків | Моя особлива планета',
  description:
    'Благодійний фонд «Моя особлива планета» відкриває реєстрацію на Різдвianу роздачу подарунків для дітей. Зареєструйте свою дитину, щоб отримати подарунок на свято.',
  alternates: { canonical: '/gifts' },
}

export default function GiftsPage() {
  return <Gifts />
}