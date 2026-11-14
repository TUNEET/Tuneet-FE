import { useEffect, useRef } from 'react'

/** 반환한 ref를 목록 끝 요소에 붙이면, 그 요소가 화면 가까이 오면 onReach를 부른다 */
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
