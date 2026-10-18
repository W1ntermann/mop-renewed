import { Baby, HeartHandshake, Check } from 'lucide-react'
import { experts } from '@/lib/site-data'

const forKids = ['Цікаві майстер-класи', 'Ігрові зони та активності', 'Фотозони та памʼятні світлини', 'Подарунки та сюрпризи']

const forParents = [
  'Живі лекції та зустрічі з провідними фахівцями',
  'Прості пояснення складних тем',
  'Можливість поставити питання й отримати відповідь',
  'Спілкування з родинами, які вас розуміють',
]

export function About() {
  return (
    <section id="about" className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Про форум</p>
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-4xl">
              Простір підтримки, де кожна дитина особлива, а кожна родина важлива
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Ми створюємо подію, де кожен маленький відвідувач відчує радість, увагу та підтримку, а батьки отримають
              корисну та зрозумілу інформацію про здоровʼя і розвиток своєї дитини. Приходьте всією родиною — буде
              тепло, цікаво і по-справжньому цінно.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <AudienceCard icon={<Baby className="size-6" aria-hidden="true" />} title="Для дітей" items={forKids} tone="accent" />
            <AudienceCard
              icon={<HeartHandshake className="size-6" aria-hidden="true" />}
              title="Для батьків"
              items={forParents}
              tone="primary"
            />
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-secondary p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h3 className="max-w-xs text-balance text-xl font-semibold">Своїм досвідом поділяться фахівці з напрямів:</h3>
            <ul className="flex flex-wrap gap-2 md:max-w-2xl md:justify-end">
              {experts.map((e) => (
                <li key={e} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function AudienceCard({
  icon,
  title,
  items,
  tone,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
  tone: 'primary' | 'accent'
}) {
  const iconClass = tone === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-border bg-background p-6 md:p-8">
      <span className={`flex size-12 items-center justify-center rounded-2xl ${iconClass}`}>{icon}</span>
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 leading-relaxed">
            <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
