import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { DonateSection } from '@/components/donate-section'
import { Contacts } from '@/components/contacts'
import { DonateButton } from '@/components/donate-button'

export const metadata: Metadata = {
  title: 'Моя особлива планета — форум для дітей з особливостями розвитку та їх батьків',
  description:
    'Форум «Моя особлива планета» 24 травня 2026, Одеса, Зелений театр. Лекції провідних фахівців для батьків, ігрові та сенсорні зони для дітей. Реєстрація обовʼязкова.',
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <DonateSection />
      <Contacts />
      <DonateButton />
    </>
  )
}
