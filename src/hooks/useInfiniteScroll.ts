import { useEffect, useRef } from 'react'

export function useInfiniteScroll<T extends HTMLElement>(onReach: () => void, enabled: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const target = ref.current
    if (!enabled || !target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReach()
      },
      { rootMargin: '200px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [enabled, onReach])

  return ref
}
