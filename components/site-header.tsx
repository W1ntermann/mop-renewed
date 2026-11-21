'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site-data'
import { Logo } from '@/components/logo'

function isActivePath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Моя особлива планета — на головну">
          <Logo />
        </Link>

        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 p-1.5 shadow-sm">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Зареєструватися
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Мобільна навігація">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-xl border-b border-border/60 px-3 py-4 text-base font-medium transition-colors ${
                      active ? 'bg-secondary text-primary' : 'hover:bg-secondary/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="py-4">
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
              >
                Зареєструватися
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
