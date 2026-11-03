import { useEffect, useId, useRef } from 'react'
import type { RefObject } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import * as S from './ConfirmPopover.styles'
import type { ConfirmPopoverSurface } from './ConfirmPopover.styles'

type ConfirmPopoverProps = {
  open: boolean
  message: string
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
  anchorRef?: RefObject<HTMLElement | null>
  surface?: ConfirmPopoverSurface
}

export function ConfirmPopover({
  open,
  message,
  confirmLabel,
  onConfirm,
  onClose,
  anchorRef,
  surface = 'light',
}: ConfirmPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)
  const messageId = useId()

  useClickOutside([popoverRef, anchorRef], onClose, open)

  useEffect(() => {
    if (!open) return

    confirmRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onClose()
    }
    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [open, onClose])

  if (!open) return null

  return (
    <S.Popover ref={popoverRef} $surface={surface} role="alertdialog" aria-labelledby={messageId}>
      <S.Message id={messageId}>{message}</S.Message>
      <S.ConfirmButton ref={confirmRef} $surface={surface} type="button" onClick={onConfirm}>
        {confirmLabel}
      </S.ConfirmButton>
    </S.Popover>
  )
}
