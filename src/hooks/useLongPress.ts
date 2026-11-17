import { useEffect, useRef } from 'react'
import type { MouseEvent, PointerEvent } from 'react'

const LONG_PRESS_MS = 500
const MOVE_TOLERANCE_PX = 10

export function useLongPress(onLongPress: () => void, enabled = true) {
  const timerRef = useRef<number | undefined>(undefined)
  const startRef = useRef<{ x: number; y: number } | null>(null)

  const cancel = () => {
    window.clearTimeout(timerRef.current)
    timerRef.current = undefined
    startRef.current = null
  }

  useEffect(() => cancel, [])

  if (!enabled) return {}

  return {
    onPointerDown: (event: PointerEvent) => {
      cancel()
      startRef.current = { x: event.clientX, y: event.clientY }
      timerRef.current = window.setTimeout(() => {
        cancel()
        onLongPress()
      }, LONG_PRESS_MS)
    },
    onPointerMove: (event: PointerEvent) => {
      const start = startRef.current
      if (!start) return
      const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y)
      if (moved > MOVE_TOLERANCE_PX) cancel()
    },
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onPointerCancel: cancel,
    onContextMenu: (event: MouseEvent) => {
      event.preventDefault()
      cancel()
      onLongPress()
    },
  }
}
