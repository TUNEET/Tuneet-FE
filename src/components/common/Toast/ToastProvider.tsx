import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import * as S from './Toast.styles'
import { ToastContext } from './toastContext'

const TOAST_DURATION = 2000

type ToastProviderProps = {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const showToast = useCallback((message: string) => {
    window.clearTimeout(timerRef.current)
    setToast({ id: Date.now(), message })
    timerRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <S.Viewport role="status" aria-live="polite">
        {toast && <S.Toast key={toast.id}>{toast.message}</S.Toast>}
      </S.Viewport>
    </ToastContext.Provider>
  )
}
