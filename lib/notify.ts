import { Resend } from 'resend'
import type { Registration } from '@/lib/registration'
import { organizerNotificationMail, participantConfirmationMail } from '@/lib/mail-templates'
import { event } from '@/lib/site-data'

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  return apiKey ? new Resend(apiKey) : null
}

export type NotifyResult = {
  participant: boolean
  organizer: boolean
}

/**
 * Надсилає два листи: підтвердження учаснику та сповіщення організатору.
 * Якщо Resend не налаштовано — листи пропускаються без помилки.
 */
export async function sendRegistrationEmails(
  registration: Registration,
  registeredAt: Date,
): Promise<NotifyResult> {
  const resend = getResend()

  if (!resend) {
    console.warn('[notify] RESEND_API_KEY не задано — листи не надіслано.')
    return { participant: false, organizer: false }
  }

  const from = process.env.RESEND_FROM ?? 'Моя особлива планета <onboarding@resend.dev>'
  const organizerTo = process.env.NOTIFY_EMAIL ?? event.email

  const [participant, organizer] = await Promise.all([
    resend.emails.send({ from, to: registration.email, ...participantConfirmationMail(registration) }),
    resend.emails.send({ from, to: organizerTo, ...organizerNotificationMail(registration, registeredAt) }),
  ])

  if (participant.error) console.error('[notify] Помилка листа учаснику:', participant.error)
  if (organizer.error) console.error('[notify] Помилка листа організатору:', organizer.error)

  return { participant: !participant.error, organizer: !organizer.error }
}
