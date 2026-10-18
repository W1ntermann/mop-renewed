#!/usr/bin/env node
/**
 * Надсилає тестовий лист сповіщення через Resend —
 * перевіряє, що ключ API та шаблони працюють.
 *
 * Використання: pnpm notify:test [email]
 * Потрібні змінні: RESEND_API_KEY, RESEND_FROM (необовʼязково), NOTIFY_EMAIL
 */
const apiKey = process.env.RESEND_API_KEY
if (!apiKey) {
  console.error('❌ RESEND_API_KEY не задано у .env — див. .env.example')
  process.exit(1)
}

const { Resend } = await import('resend')
const resend = new Resend(apiKey)

const to = process.argv[2] ?? process.env.NOTIFY_EMAIL ?? 'osoblyva.planeta@gmail.com'
const from = process.env.RESEND_FROM ?? 'Моя особлива планета <onboarding@resend.dev>'

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: 'Тест: сповіщення про реєстрацію працює 🪐',
  html: `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2430;">
      <h2 style="margin:0 0 12px;">Тестовий лист сповіщення</h2>
      <p style="margin:0 0 8px;">Канал Resend налаштовано правильно. Листи учасникам та організатору про реєстрацію працюватимуть.</p>
      <p style="margin:0;color:#8a8fa3;font-size:13px;">Форум «Моя особлива планета» · 24 травня 2026 · Одеса</p>
    </div>
  `,
})

if (error) {
  console.error('❌ Помилка надсилання:', error)
  process.exit(1)
}

console.log(`✅ Тестового листа надіслано на ${to} (id: ${data?.id})`)
