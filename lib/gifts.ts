export type GiftRegistration = {
  parentName: string
  phone: string
  email: string
  childName: string
  childDobOrAge: string
  familyCategory: string
  consent: string
}

export type GiftParseResult =
  | { ok: true; data: GiftRegistration }
  | { ok: false; errors: Record<string, string> }

export const familyCategoryLabels: Record<string, string> = {
  vpo: "Сім'я ВПО (внутрішньо переміщені особи)",
  manyChildren: "Багатодітна сім'я",
  disability: "Сім'я, що виховує дитину з інвалідністю",
  other: "Інше / сім'я в складних життєвих обставинах",
}

export function familyCategoryLabel(category: string): string {
  return familyCategoryLabels[category] ?? category
}

const PHONE_RE = /^\+?[\d\s().\-]{9,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function parseGiftRegistration(body: unknown): GiftParseResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, errors: { form: 'Некоректні дані форми.' } }
  }

  const raw = body as Record<string, unknown>
  const data: GiftRegistration = {
    parentName: asString(raw.parentName),
    phone: asString(raw.phone),
    email: asString(raw.email),
    childName: asString(raw.childName),
    childDobOrAge: asString(raw.childDobOrAge),
    familyCategory: asString(raw.familyCategory),
    consent: asString(raw.consent),
  }

  const errors: Record<string, string> = {}

  if (data.parentName.length < 2) errors.parentName = 'Вкажіть, будь ласка, ваше ПІБ.'
  if (!PHONE_RE.test(data.phone)) errors.phone = 'Вкажіть коректний номер телефону.'
  if (!EMAIL_RE.test(data.email)) errors.email = 'Вкажіть коректний e-mail.'
  if (data.childName.length < 1) errors.childName = "Вкажіть ім'я дитини."
  if (data.childDobOrAge.length < 1)
    errors.childDobOrAge = 'Вкажіть дату народження або вік дитини.'
  if (data.familyCategory && !(data.familyCategory in familyCategoryLabels)) {
    errors.familyCategory = 'Оберіть категорію родини.'
  }
  if (data.consent !== 'on') {
    errors.consent = 'Необхідно надати згоду на обробку персональних даних.'
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, data }
}