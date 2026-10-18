import type { Metadata } from 'next'
import { Register } from '@/components/register'

export const metadata: Metadata = {
  title: 'Реєстрація на форум | Моя особлива планета',
  description:
    'Зареєструйтеся на форум «Моя особлива планета» 24 травня 2026 в Одесі. Оберіть зручний блок участі — ми підтвердимо участь телефоном.',
  alternates: { canonical: '/register' },
}

export default function RegisterPage() {
  return <Register />
}