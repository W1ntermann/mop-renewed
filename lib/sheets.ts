import { google } from 'googleapis'

export const sheetHeaders = [
  'Дата реєстрації',
  'Імʼя',
  'Телефон',
  'Email',
  'Дорослих',
  'Дітей та вік',
  'Блок участі',
  'Статус',
  'Джерело',
] as const

export type SheetRow = (string | number)[]

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const spreadsheetId = process.env.GOOGLE_SHEET_ID

  if (!email || !privateKey || !spreadsheetId) {
    throw new Error(
      'Google Sheets не налаштовано: потрібні GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY та GOOGLE_SHEET_ID.',
    )
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return { sheets: google.sheets({ version: 'v4', auth }), spreadsheetId }
}

export async function appendRegistration(row: SheetRow): Promise<void> {
  const { sheets, spreadsheetId } = getSheetsClient()

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'A1',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
}
