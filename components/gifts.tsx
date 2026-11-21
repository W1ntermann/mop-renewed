'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Phone, ShieldCheck } from 'lucide-react'
import { event } from '@/lib/site-data'

const familyCategoryOptions: { value: string; label: string }[] = [
  { value: 'vpo', label: 'Сім\'я ВПО (внутрішньо переміщені особи)' },
  { value: 'manyChildren', label: 'Багатодітна сім\'я' },
  { value: 'disability', label: 'Сім\'я, що виховує дитину з інвалідністю' },
  { value: 'other', label: 'Інше / сім\'я в складних життєвих обставинах' },
]

export function Gifts() {
  const [form, setForm] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    childDobOrAge: '',
    familyCategory: '',
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          consent: form.consent ? 'on' : '',
        }),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setSubmitted(true)
    } catch {
      setError('Не вдалося надіслати заявку. Перевірте з\'єднання та спробуйте ще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="gifts" className="px-3 pb-16 pt-10 sm:px-4 sm:pb-20 md:px-6 md:pb-28 md:pt-16">
      <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-[1.5rem] bg-accent p-4 text-accent-foreground shadow-xl shadow-accent/20 sm:gap-10 sm:rounded-[2rem] sm:p-10 lg:grid-cols-2 lg:p-14">
        <div className="flex min-w-0 flex-col gap-5">
          <h2 className="max-w-xl break-words text-pretty text-[clamp(1.55rem,7.5vw,2.25rem)] font-semibold leading-[1.12] md:text-4xl">
            Різдво — час чудес, тепла та щирих усмішок
          </h2>
          <p className="break-words text-pretty leading-relaxed">
            Благодійний фонд «Моя особлива планета» відкриває реєстрацію на святкову роздачу подарунків для дітей. Ми хочемо підтримати родини та подарувати кожній особливой дитині трохи казки й віри у добро.
          </p>
          <p className="break-words text-pretty leading-relaxed mt-4">
            Будь ласка, заповніть форму нижче, щоб зареєструвати вашу дитину.
          </p>
          <div className="mt-auto rounded-2xl border border-accent-foreground/20 p-5 text-sm leading-relaxed">
            <strong>Потрібна допомога?</strong>
            <p className="mt-1 opacity-80">Зателефонуйте нам — із радістю відповімо на ваші запитання.</p>
            {event.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className="mt-3 flex items-center gap-2 font-semibold hover:underline">
                <Phone className="size-4" aria-hidden="true" /> {phone.label}
              </a>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-2xl bg-card p-4 text-card-foreground shadow-lg sm:rounded-3xl sm:p-6 md:p-8">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-5 size-16 text-primary" aria-hidden="true" />
              <h3 className="text-2xl font-semibold">Дякуємо за реєстрацію!</h3>
              <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
                Вашу заявку успішно прийнято. Найближчим часом наші волонтери зв\'яжуться з вами за вказаним номером телефону для уточнення деталей де і коли можна забрати подарунок. Нехай Різдво принесе світло та радість у ваш дім!
              </p>
              <p className="mt-2 text-sm font-medium">З теплом, команда фонду «Моя особлива планета»</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mb-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Реєстрація на Різдво</p>
                <h3 className="mt-2 text-2xl font-semibold">Заявка на отримання подарунка</h3>
              </div>

              <label className="grid min-w-0 gap-2 text-sm font-medium">
                ПІБ батька / матері або законного представника
                <input
                  required
                  value={form.parentName}
                  onChange={(e) => updateField('parentName', e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Іван Іванов Іванов"
                />
              </label>

              <label className="grid min-w-0 gap-2 text-sm font-medium">
                Контактний номер телефону
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="+38 (0__) --_"
                />
              </label>

              <label className="grid min-w-0 gap-2 text-sm font-medium">
                E-mail
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                />
              </label>

              <label className="grid min-w-0 gap-2 text-sm font-medium">
                Ім'я дитини
                <input
                  required
                  value={form.childName}
                  onChange={(e) => updateField('childName', e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Марія"
                />
              </label>

              <label className="grid min-w-0 gap-2 text-sm font-medium">
                Дата народження дитини / вік
                <input
                  required
                  type="date"
                  value={form.childDobOrAge}
                  onChange={(e) => updateField('childDobOrAge', e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Це допоможе підібрати подарунок за віком.
                </p>
              </label>

              <label className="grid min-w-0 gap-2 text-sm font-medium">
                Категорія родини (за необхідності)
                <select
                  value={form.familyCategory}
                  onChange={(e) => updateField('familyCategory', e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none focus:border-primary"
                >
                  <option value="">Не вказувати</option>
                  {familyCategoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-start gap-2 text-sm font-medium">
                <input
                  required
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateField('consent', e.target.checked)}
                  className="mt-0.5 size-4 rounded border-border bg-background text-primary focus:ring-primary"
                />
                <span className="leading-relaxed">
                  Я даю згоду на обробку персональних даних та фото-/відеозйомку під час заходу.
                </span>
              </label>

              <button
                disabled={isSubmitting}
                className="mt-2 flex h-13 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-70"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                {isSubmitting ? 'Надсилаємо…' : 'Зареєструватися на свято'}
              </button>
              {error && (
                <p role="alert" className="text-center text-sm font-medium text-destructive">{error}</p>
              )}
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних для організації святкової роздачі подарунків.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}