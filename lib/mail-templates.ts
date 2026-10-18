import type { Registration } from '@/lib/registration'
import { blockLabel } from '@/lib/registration'
import { event } from '@/lib/site-data'

export type Mail = { subject: string; html: string }

function layout(title: string, content: string) {
  return `<!doctype html>
<html lang="uk">
  <body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#1f2430;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;">
          <tr><td style="background:#5b5bd6;padding:28px 32px;">
            <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff;">${event.name} 🪐</p>
            <p style="margin:6px 0 0;font-size:13px;color:#e7e7ff;">${event.date} · ${event.city}, ${event.venue}</p>
          </td></tr>
          <tr><td style="padding:32px;">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${title}</h1>
            ${content}
          </td></tr>
          <tr><td style="padding:20px 32px 28px;border-top:1px solid #ececf2;">
            <p style="margin:0;font-size:12px;color:#8a8fa3;">Якщо у вас виникли запитання, телефонуйте:</p>
            ${event.phones.map((phone) => `<p style="margin:4px 0 0;font-size:13px;font-weight:bold;"><a href="${phone.href}" style="color:#5b5bd6;text-decoration:none;">${phone.label}</a></p>`).join('')}
            <p style="margin:8px 0 0;font-size:13px;"><a href="mailto:${event.email}" style="color:#5b5bd6;text-decoration:none;">${event.email}</a></p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`
}

function detailsTable(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border:1px solid #ececf2;border-radius:12px;overflow:hidden;">
    ${rows
      .map(
        ([label, value]) => `<tr>
          <td style="padding:10px 16px;font-size:13px;color:#8a8fa3;border-bottom:1px solid #ececf2;">${label}</td>
          <td style="padding:10px 16px;font-size:14px;font-weight:bold;border-bottom:1px solid #ececf2;">${value}</td>
        </tr>`,
      )
      .join('')}
  </table>`
}

export function participantConfirmationMail(registration: Registration): Mail {
  return {
    subject: `Ваша заявка на форум «${event.name}» прийнята`,
    html: layout(
      `Дякуємо, ${registration.name}! Ваша заявка на участь прийнята.`,
      `
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">Ми отримали вашу заявку й незабаром зателефонуємо, щоб підтвердити участь. Ось деталі:</p>
      ${detailsTable([
        ['Дата', `${event.date}, ${event.time}`],
        ['Місце', `${event.city}, ${event.venue}, ${event.address}`],
        ['Блок участі', blockLabel(registration.block)],
        ['Дорослих', registration.adults],
        ['Дітей та їх вік', registration.children || '—'],
      ])}
      <p style="margin:0;font-size:14px;line-height:1.6;">Реєстрація допомагає нам підготувати достатню кількість матеріалів і подарунків для кожної дитини. До зустрічі! 💛</p>
      `,
    ),
  }
}

export function organizerNotificationMail(
  registration: Registration,
  registeredAt: Date,
): Mail {
  const date = registeredAt.toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return {
    subject: `Нова реєстрація: ${registration.name} (${blockLabel(registration.block)})`,
    html: layout(
      'Нова заявка на участь у форумі',
      `
      <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">Хтось щойно зареєструвався на сайті. Дані заявки:</p>
      ${detailsTable([
        ['Час заявки', date],
        ['Імʼя', registration.name],
        ['Телефон', registration.phone],
        ['E-mail', registration.email],
        ['Дорослих', registration.adults],
        ['Дітей та їх вік', registration.children || '—'],
        ['Блок участі', blockLabel(registration.block)],
      ])}
      <p style="margin:0;font-size:13px;color:#8a8fa3;">Заявка також збережена у Google Таблиці.</p>
      `,
    ),
  }
}
