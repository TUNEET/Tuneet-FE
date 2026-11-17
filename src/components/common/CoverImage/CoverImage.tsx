import { useState } from 'react'
import type { ComponentProps } from 'react'
import { theme } from '@/styles/theme'

const FALLBACK_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${theme.colors.border}"/></svg>`,
)}`

type CoverImageProps = Omit<ComponentProps<'img'>, 'src'> & {
  src?: string | null
}

export function CoverImage({ src, alt = '', style, ...props }: CoverImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const isUnavailable = !src || failedSrc === src

  return (
    <img
      alt={alt}
      decoding="async"
      {...props}
      style={{ backgroundColor: theme.colors.border, ...style }}
      src={isUnavailable ? FALLBACK_SRC : src}
      onError={() => {
        if (src) setFailedSrc(src)
      }}
    />
  )
}
