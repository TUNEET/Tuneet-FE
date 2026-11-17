import { useEffect, useRef } from 'react'
import type { MouseEvent, PointerEvent } from 'react'

const LONG_PRESS_MS = 500
// 이만큼 움직이면 스크롤로 보고 꾹 누르기를 취소한다
const MOVE_TOLERANCE_PX = 10

// 꾹 누르기 (모바일 길게 누르기, PC 마우스 길게 누르기·우클릭)
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
    // 길게 누를 때 뜨는 브라우저 메뉴 대신 같은 동작을 한다
    onContextMenu: (event: MouseEvent) => {
      event.preventDefault()
      cancel()
      onLongPress()
    },
  }
}
