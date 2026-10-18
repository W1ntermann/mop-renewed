import { Heart, Sparkles } from 'lucide-react'
import { donate } from '@/lib/site-data'

export function DonateButton() {
  return (
    <a
      href={donate.href}
      target="_blank"
      rel="noopener noreferrer"
      className="donate-float group fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--primary),transparent_20%)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:bottom-7 sm:right-7 sm:px-5"
      aria-label="Підтримати проєкт донатом"
    >
      <span className="relative flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Heart className="size-4 fill-current" aria-hidden="true" />
        <Sparkles className="absolute -right-2 -top-2 size-3 text-accent" aria-hidden="true" />
      </span>
      <span>Підтримати донатом</span>
    </a>
  )
}
