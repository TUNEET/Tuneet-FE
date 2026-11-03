import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export function useClickOutside(
  refs: (RefObject<HTMLElement | null> | undefined)[],
  handler: () => void,
  enabled = true,
) {
  const refsRef = useRef(refs)
  const handlerRef = useRef(handler)

  useEffect(() => {
    refsRef.current = refs
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!enabled) return

    const listener = (event: PointerEvent) => {
      const target = event.target as Node
      if (refsRef.current.some((ref) => ref?.current?.contains(target))) return
      handlerRef.current()
    }

    document.addEventListener('pointerdown', listener)
    return () => document.removeEventListener('pointerdown', listener)
  }, [enabled])
}
