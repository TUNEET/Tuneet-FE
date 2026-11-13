import { useId, useRef } from 'react'
import characterImage from '@/assets/images/character-onboarding.webp'
import { useClickOutside } from '@/hooks/useClickOutside'
import { formatKoreanDateTime } from '@/utils/format'
import * as S from './CommentAlert.styles'

type CommentAlertProps = {
  nickname: string
  createdAt: string
  onConfirm: () => void
  onClose: () => void
}

/** 내 피드에 코멘트가 도착했을 때 화면 하단에 뜨는 알림 카드 */
export function CommentAlert({ nickname, createdAt, onConfirm, onClose }: CommentAlertProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useClickOutside([cardRef], onClose)

  return (
    <S.Wrapper>
      <S.Character src={characterImage} alt="" />
      <S.Card ref={cardRef} role="dialog" aria-labelledby={titleId}>
        <S.Title id={titleId}>내 피드에 코멘트가 도착했어요!</S.Title>
        <S.Info>
          <S.Nickname>{nickname}</S.Nickname>
          <time dateTime={createdAt}>{formatKoreanDateTime(createdAt)}</time>
        </S.Info>
        <S.ConfirmButton type="button" onClick={onConfirm}>
          편지함에서 확인하기
        </S.ConfirmButton>
      </S.Card>
    </S.Wrapper>
  )
}
