import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD_PX = 8

/**
 * 앱 화면이 조금이라도 아래로 스크롤됐는지 알려 준다.
 * 스크롤은 창이 아니라 앱 프레임 안의 영역에서 일어나서, 문서 전체의 스크롤을 캡처로 받는다
 */
export function useHasScrolled() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target instanceof Element ? event.target : document.scrollingElement
      // 가로 목록 같은 세로로 스크롤되지 않는 영역의 스크롤은 무시한다
      if (!target || target.scrollHeight <= target.clientHeight) return
      setHasScrolled(target.scrollTop > SCROLL_THRESHOLD_PX)
    }

    document.addEventListener('scroll', handleScroll, { capture: true, passive: true })
    return () => document.removeEventListener('scroll', handleScroll, { capture: true })
  }, [])

  return hasScrolled
}
