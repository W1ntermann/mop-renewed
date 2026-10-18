import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'public', 'images', 'logo.png')
const OUT = path.join(ROOT, 'public')

// Кроп «планета з дітьми» — центральна частина логотипу (2101×2300),
// придатна для читання на малих розмірах (16–48 px).
const MARK = { left: 420, top: 620, width: 1250, height: 1250 }

async function main() {
  await mkdir(OUT, { recursive: true })

  // Master для малих іконок: кроп на прозорому тлі
  const mark = sharp(SRC).extract(MARK).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })

  // Master для великих іконок: повний логотип, вписаний у квадрат
  const full = sharp(SRC).resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })

  const [favicon32, favicon16, favicon48, apple, icon512] = await Promise.all([
    mark.clone().resize(32, 32).png().toBuffer(),
    mark.clone().resize(16, 16).png().toBuffer(),
    mark.clone().resize(48, 48).png().toBuffer(),
    full.clone().resize(180, 180).png().toBuffer(),
    full.clone().resize(512, 512).png().toBuffer(),
  ])

  await Promise.all([
    sharp(favicon32).toFile(path.join(OUT, 'favicon-32x32.png')),
    sharp(favicon16).toFile(path.join(OUT, 'favicon-16x16.png')),
    sharp(favicon48).toFile(path.join(OUT, 'favicon-48x48.png')),
    sharp(apple).toFile(path.join(OUT, 'apple-touch-icon.png')),
    sharp(icon512).toFile(path.join(OUT, 'icon-512.png')),
  ])

  const ico = await pngToIco([
    path.join(OUT, 'favicon-16x16.png'),
    path.join(OUT, 'favicon-32x32.png'),
    path.join(OUT, 'favicon-48x48.png'),
  ])
  const { writeFile } = await import('node:fs/promises')
  await writeFile(path.join(OUT, 'favicon.ico'), ico)

  console.log('✓ Favicons generated: favicon.ico, favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png, icon-512.png')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})