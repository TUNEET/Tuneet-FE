const MAX_DECODE_SIZE = 1024

export async function decodeQrFromImage(file: File) {
  const { default: jsQR } = await import('jsqr')
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DECODE_SIZE / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return null

  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const { data } = context.getImageData(0, 0, width, height)
  return jsQR(data, width, height)?.data ?? null
}
