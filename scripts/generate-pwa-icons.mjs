import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const source = await readFile(new URL('./app-icon.svg', import.meta.url), 'utf8')

const MASKABLE_SCALE = 0.82

const square = source.replaceAll(/rx="[\d.]+"/g, 'rx="0"')

const backgroundRect = /<rect width="80" height="80" rx="0" fill="(url\(#[^)]+\))"\/>/
const [, gradientFill] = square.match(backgroundRect) ?? []
if (!gradientFill) throw new Error('app-icon.svg 배경 rect를 찾지 못했습니다.')

const offsetX = 40 * (1 - MASKABLE_SCALE)
const offsetY = 80 * (1 - MASKABLE_SCALE)
const maskable = square
  .replace(backgroundRect, '')
  .replace(
    /<g clip-path="([^"]+)">/,
    `<rect width="80" height="80" fill="${gradientFill}"/>` +
      `<g transform="translate(${offsetX} ${offsetY}) scale(${MASKABLE_SCALE})">` +
      `<g clip-path="$1">`,
  )
  .replace('</g>\n<defs>', '</g></g>\n<defs>')

const icons = [
  { svg: source, size: 64, name: 'pwa-64x64.png' },
  { svg: source, size: 192, name: 'pwa-192x192.png' },
  { svg: source, size: 512, name: 'pwa-512x512.png' },
  { svg: square, size: 180, name: 'apple-touch-icon-180x180.png' },
  { svg: maskable, size: 512, name: 'maskable-icon-512x512.png' },
]

await Promise.all(
  icons.map(({ svg, size, name }) =>
    sharp(Buffer.from(svg), { density: (72 * size) / 80 })
      .resize(size, size)
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(`${publicDir}${name}`)
      .then(() => console.log(`✔ ${name}`)),
  ),
)
