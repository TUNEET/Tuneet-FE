import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD_PX = 8

export function useHasScrolled() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target instanceof Element ? event.target : document.scrollingElement
      if (!target || target.scrollHeight <= target.clientHeight) return
      setHasScrolled(target.scrollTop > SCROLL_THRESHOLD_PX)
    }

    document.addEventListener('scroll', handleScroll, { capture: true, passive: true })
    return () => document.removeEventListener('scroll', handleScroll, { capture: true })
  }, [])

  return hasScrolled
}
