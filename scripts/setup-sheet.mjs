#!/usr/bin/env node
/**
 * Створює заголовок (базові колонки) у Google Таблиці для реєстрацій.
 *
 * Використання: pnpm sheet:setup
 * Потрібні змінні: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
 */
import { google } from 'googleapis'

const HEADERS = [
  'Дата реєстрації',
  'Імʼя',
  'Телефон',
  'Email',
  'Дорослих',
  'Дітей та вік',
  'Блок участі',
  'Статус',
  'Джерело',
]

const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
const spreadsheetId = process.env.GOOGLE_SHEET_ID

if (!email || !privateKey || !spreadsheetId) {
  console.error(
    '❌ Не вистачає змінних середовища:\n' +
      `   GOOGLE_SERVICE_ACCOUNT_EMAIL: ${email ? '✓' : '✗'}\n` +
      `   GOOGLE_PRIVATE_KEY: ${privateKey ? '✓' : '✗'}\n` +
      `   GOOGLE_SHEET_ID: ${spreadsheetId ? '✓' : '✗'}\n` +
      'Заповніть .env (див. .env.example) та запустіть ще раз.',
  )
  process.exit(1)
}

const auth = new google.auth.JWT({
  email,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const sheets = google.sheets({ version: 'v4', auth })

const { data } = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: 'A1:I1',
})

if (data.values?.[0]?.some((cell) => cell.trim() !== '')) {
  console.log('ℹ️  Заголовок уже існує — таблицю не змінено.')
  process.exit(0)
}

await sheets.spreadsheets.values.update({
  spreadsheetId,
  range: 'A1',
  valueInputOption: 'RAW',
  requestBody: { values: [HEADERS] },
})

await sheets.spreadsheets.batchUpdate({
  spreadsheetId,
  requestBody: {
    requests: [
      {
        updateSheetProperties: {
          properties: { gridProperties: { frozenRowCount: 1 } },
          fields: 'gridProperties.frozenRowCount',
        },
      },
    ],
  },
})

console.log(`✅ Заголовок створено (${HEADERS.length} колонок), перший рядок закріплено.`)
