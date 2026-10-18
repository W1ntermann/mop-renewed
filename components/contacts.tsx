import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react'
import { credits, event, socials } from '@/lib/site-data'
import { Logo } from '@/components/logo'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Contacts() {
  const mapQuery = encodeURIComponent('Зелений театр, Маразліївська 1Е, Одеса')

  return (
    <footer id="contacts" className="bg-foreground text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-20">
        <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
          <Logo inverted />
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">Контакти</h2>
          <ul className="flex flex-col gap-5 sm:gap-6">
            <li className="flex items-start gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm text-primary-foreground/60">Адреса</p>
                <p className="font-semibold leading-relaxed">
                  {event.city}, {event.address}
                  <br />
                  {event.venue}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="flex flex-col">
                <p className="text-sm text-primary-foreground/60">Телефони</p>
                {event.phones.map((p) => (
                  <a key={p.href} href={p.href} className="font-semibold leading-relaxed hover:text-accent">
                    {p.label}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm text-primary-foreground/60">E-mail</p>
                <a href={`mailto:${event.email}`} className="break-all font-semibold hover:text-accent">
                  {event.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <InstagramIcon className="mt-1 size-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm text-primary-foreground/60">Соцмережі</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => {
                    const Icon = social.label === 'Instagram' ? InstagramIcon : FacebookIcon
                    return (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-accent"
                      >
                        <Icon className="size-4" />
                        {social.label}
                      </a>
                    )
                  })}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative h-64 min-h-0 overflow-hidden rounded-2xl border border-primary-foreground/10 shadow-2xl sm:h-80 lg:h-auto lg:min-h-full lg:rounded-3xl">
          <iframe
            title="Карта: Зелений театр, Одеса"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>{'© 2026 «Моя особлива планета». Кожна дитина — особлива, кожна родина — важлива.'}</p>
          <p className="flex items-center gap-1.5">
            <span>{credits.label} —</span>
            <a
              href={credits.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-semibold text-primary-foreground transition-colors hover:text-accent"
            >
              {credits.name}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
