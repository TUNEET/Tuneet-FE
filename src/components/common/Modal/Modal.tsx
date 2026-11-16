import { useEffect } from 'react'
import type { ReactNode } from 'react'
import * as S from './Modal.styles'

type ModalProps = {
  open: boolean
  onClose: () => void
  closeLabel?: string
  labelledBy?: string
  // 모달 안에 닫기 버튼이 따로 있으면 false로 아래 닫기 버튼을 숨긴다
  showCloseButton?: boolean
  children: ReactNode
}

export function Modal({
  open,
  onClose,
  closeLabel = '닫기',
  labelledBy,
  showCloseButton = true,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <S.Overlay>
      <S.Content role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        {children}
        {showCloseButton && (
          <S.CloseButton type="button" onClick={onClose}>
            {closeLabel}
          </S.CloseButton>
        )}
      </S.Content>
    </S.Overlay>
  )
}
