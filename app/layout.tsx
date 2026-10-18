import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Unbounded } from 'next/font/google'
import { siteUrl } from '@/lib/site-data'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
})

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-unbounded',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Моя особлива планета — форум для дітей з особливостями розвитку та їх батьків',
  description:
    'Форум «Моя особлива планета» 24 травня 2026, Одеса, Зелений театр. Лекції провідних фахівців для батьків, ігрові та сенсорні зони для дітей. Реєстрація обовʼязкова.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: siteUrl,
    siteName: 'Моя особлива планета',
    title: 'Моя особлива планета — форум для родин',
    description:
      '24 травня 2026, Одеса, Зелений театр. Лекції фахівців для батьків, ігрові та сенсорні зони для дітей.',
    images: [{ url: '/images/logo.png', width: 2101, height: 2300, alt: 'Моя особлива планета' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Моя особлива планета — форум для родин',
    description: '24 травня 2026, Одеса. Лекції фахівців для батьків, ігрові зони для дітей.',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#25428f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${unbounded.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
