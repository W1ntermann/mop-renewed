'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Phone, ShieldCheck } from 'lucide-react'
import { event } from '@/lib/site-data'

const initialForm = {
  name: '',
  phone: '',
  adults: '1',
  children: '',
  block: '1',
}

export function Register() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 650)
  }

  return (
    <section id="register" className="px-3 pb-16 pt-10 sm:px-4 sm:pb-20 md:px-6 md:pb-28 md:pt-16">
      <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-[1.5rem] bg-accent p-4 text-accent-foreground shadow-xl shadow-accent/20 sm:gap-10 sm:rounded-[2rem] sm:p-10 lg:grid-cols-2 lg:p-14">
        <div className="flex min-w-0 flex-col gap-5">
          <p className="inline-flex w-fit max-w-full items-center gap-2 rounded-2xl bg-card px-3.5 py-2 text-xs font-bold leading-tight text-card-foreground sm:rounded-full sm:px-4 sm:py-1.5 sm:text-sm">
            <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Реєстрація обовʼязкова</span>
          </p>
          <h2 className="max-w-xl break-words text-pretty text-[clamp(1.55rem,7.5vw,2.25rem)] font-semibold leading-[1.12] md:text-4xl">
            Зареєструйтесь заздалегідь — нам важливо врахувати всіх
          </h2>
          <p className="break-words text-pretty leading-relaxed">
            Заповніть коротку форму. Поки це демонстраційний режим — після підключення скриптів заявки будуть приходити на пошту та в Google Таблиці.
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
              <h3 className="text-2xl font-semibold">Дякуємо за заявку!</h3>
              <p className="mt-3 max-w-sm text-muted-foreground">Це демонстраційне підтвердження. Після підключення інтеграцій ми надішлемо дані на пошту та збережемо їх у таблиці.</p>
              <button type="button" onClick={() => { setSubmitted(false); setForm(initialForm) }} className="mt-7 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary">
                Подати ще одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="mb-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{event.date} · {event.time}</p>
                <h3 className="mt-2 text-2xl font-semibold">Заявка на участь</h3>
                <p className="mt-1 text-sm text-muted-foreground">Залиште контакти — ми підтвердимо реєстрацію.</p>
              </div>
              <label className="grid min-w-0 gap-2 text-sm font-medium">Імʼя батьків
                <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Ваше імʼя" />
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-medium">Номер телефону
                <input required type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="+380 00 000 00 00" />
              </label>
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                <label className="grid min-w-0 gap-2 text-sm font-medium">Дорослих
                  <select value={form.adults} onChange={(e) => updateField('adults', e.target.value)} className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none focus:border-primary">
                    {[1, 2, 3, 4].map((number) => <option key={number}>{number}</option>)}
                  </select>
                </label>
                <label className="grid min-w-0 gap-2 text-sm font-medium">Дітей та їх вік
                  <input value={form.children} onChange={(e) => updateField('children', e.target.value)} className="h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 outline-none focus:border-primary" placeholder="2 (5, 8 років)" />
                </label>
              </div>
              <label className="grid min-w-0 gap-2 text-sm font-medium">Блок участі
                <select value={form.block} onChange={(e) => updateField('block', e.target.value)} className="h-12 w-full min-w-0 truncate rounded-xl border border-border bg-background px-4 outline-none focus:border-primary">
                  <option value="1">Блок 1 — лекції та знайомство</option>
                  <option value="2">Блок 2 — активності та ігри</option>
                  <option value="3">Блок 3 — творчість і спілкування</option>
                </select>
              </label>
              <button disabled={isSubmitting} className="mt-2 flex h-13 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-70">
                {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                {isSubmitting ? 'Надсилаємо…' : 'Зареєструватися'}
              </button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних для організації події.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
