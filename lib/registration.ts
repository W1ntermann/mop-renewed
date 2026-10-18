export type Registration = {
  name: string
  phone: string
  email: string
  adults: string
  children: string
  block: string
}

export type ParseResult =
  | { ok: true; data: Registration }
  | { ok: false; errors: Record<string, string> }

export const blockLabels: Record<string, string> = {
  '1': 'Блок 1 — лекції та знайомство',
  '2': 'Блок 2 — активності та ігри',
  '3': 'Блок 3 — творчість і спілкування',
}

export function blockLabel(block: string): string {
  return blockLabels[block] ?? `Блок ${block}`
}

const PHONE_RE = /^\+?[\d\s()\-.]{9,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ADULTS_RE = /^[1-4]$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function parseRegistration(body: unknown): ParseResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: { form: 'Некоректні дані форми.' } }
  }

  const raw = body as Record<string, unknown>
  const data: Registration = {
    name: asString(raw.name),
    phone: asString(raw.phone),
    email: asString(raw.email),
    adults: asString(raw.adults),
    children: asString(raw.children),
    block: asString(raw.block),
  }

  const errors: Record<string, string> = {}

  if (data.name.length < 2) errors.name = 'Вкажіть, будь ласка, ваше імʼя.'
  if (!PHONE_RE.test(data.phone)) errors.phone = 'Вкажіть коректний номер телефону.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Вкажіть коректний e-mail.'
  if (!ADULTS_RE.test(data.adults)) errors.adults = 'Оберіть кількість дорослих.'
  if (!(data.block in blockLabels)) errors.block = 'Оберіть блок участі.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, data }
}
