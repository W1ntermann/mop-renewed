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

export const giftSheetHeaders = [
  'Дата реєстрації',
  'ПІБ батька/представника',
  'Телефон',
  'Email',
  "Ім'я дитини",
  'Дата народження / вік',
  'Категорія родини',
  'Згода на ПД',
  'Статус',
  'Джерело',
] as const

export type GiftSheetRow = (string | number)[]

export async function appendGiftRegistration(row: GiftSheetRow): Promise<void> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const spreadsheetId = process.env.GOOGLE_SHEET_ID_GIFTS

  if (!email || !privateKey || !spreadsheetId) {
    throw new Error(
      'Google Sheets для подарунків не налаштовано: потрібні GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY та GOOGLE_SHEET_ID_GIFTS.',
    )
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Подарунки!A1',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  })
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
