import { useState } from 'react'
import type { ComponentProps } from 'react'
import { theme } from '@/styles/theme'

// 커버가 없거나 불러오지 못했을 때 보여줄 단색 이미지 (img 태그를 유지해 각 화면의 크기·모양 스타일이 그대로 적용된다)
const FALLBACK_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${theme.colors.border}"/></svg>`,
)}`

type CoverImageProps = Omit<ComponentProps<'img'>, 'src'> & {
  src?: string | null
}

// 앨범 커버·아티스트 사진처럼 서버에서 받아오는 이미지
export function CoverImage({ src, alt = '', ...props }: CoverImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const isUnavailable = !src || failedSrc === src

  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
      src={isUnavailable ? FALLBACK_SRC : src}
      onError={() => {
        if (src) setFailedSrc(src)
      }}
    />
  )
}
