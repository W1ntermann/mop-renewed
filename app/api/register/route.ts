import { NextResponse } from 'next/server'
import { sendRegistrationEmails } from '@/lib/notify'
import { parseRegistration } from '@/lib/registration'
import { appendRegistration } from '@/lib/sheets'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Некоректний запит.' }, { status: 400 })
  }

  const parsed = parseRegistration(body)
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, errors: parsed.errors }, { status: 400 })
  }

  const { data } = parsed
  const registeredAt = new Date()

  try {
    await appendRegistration([
      registeredAt.toLocaleString('uk-UA', {
        timeZone: 'Europe/Kyiv',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      data.name,
      data.phone,
      data.email,
      data.adults,
      data.children || '—',
      data.block,
      'Нова',
      'Сайт',
    ])
  } catch (error) {
    console.error('[register] Не вдалося записати заявку в Google Таблицю:', error)
    return NextResponse.json(
      { ok: false, error: 'Не вдалося зберегти заявку. Спробуйте ще раз або зателефонуйте нам.' },
      { status: 502 },
    )
  }

  // Листи — best-effort: якщо Resend недоступний, заявка вже збережена в таблиці.
  try {
    await sendRegistrationEmails(data, registeredAt)
  } catch (error) {
    console.error('[register] Не вдалося надіслати листи сповіщення:', error)
  }

  return NextResponse.json({ ok: true })
}
