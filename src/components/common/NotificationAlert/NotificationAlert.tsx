import { useId, useRef } from 'react'
import characterImage from '@/assets/images/character-onboarding.webp'
import { useClickOutside } from '@/hooks/useClickOutside'
import { formatKoreanDateTime } from '@/utils/format'
import * as S from './NotificationAlert.styles'

type NotificationAlertProps = {
  title: string
  nickname?: string
  createdAt: string
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
}

export function NotificationAlert({
  title,
  nickname,
  createdAt,
  confirmLabel,
  onConfirm,
  onClose,
}: NotificationAlertProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useClickOutside([cardRef], onClose)

  return (
    <S.Wrapper>
      <S.Character src={characterImage} alt="" />
      <S.Card ref={cardRef} role="dialog" aria-labelledby={titleId}>
        <S.Title id={titleId}>{title}</S.Title>
        <S.Info>
          {nickname && <S.Nickname>{nickname}</S.Nickname>}
          <time dateTime={createdAt}>{formatKoreanDateTime(createdAt)}</time>
        </S.Info>
        <S.ConfirmButton type="button" onClick={onConfirm}>
          {confirmLabel}
        </S.ConfirmButton>
      </S.Card>
    </S.Wrapper>
  )
}
