import { useId } from 'react'
import characterFailure from '@/assets/images/character-failure.webp'
import { Modal } from '@/components/common/Modal/Modal'
import * as S from './NoticeModal.styles'

type NoticeAction = {
  label: string
  onClick: () => void
}

type NoticeModalProps = {
  title: string
  description?: string
  secondaryAction?: NoticeAction
  primaryAction: NoticeAction
  onClose: () => void
}

export function NoticeModal({
  title,
  description,
  secondaryAction,
  primaryAction,
  onClose,
}: NoticeModalProps) {
  const titleId = useId()

  return (
    <Modal open onClose={onClose} labelledBy={titleId} showCloseButton={false}>
      <S.CardArea>
        <S.Character src={characterFailure} alt="" />
        <S.Card>
          <S.Intro>
            <S.Title id={titleId}>{title}</S.Title>
            {description && <S.Description>{description}</S.Description>}
          </S.Intro>
          <S.Actions>
            {secondaryAction && (
              <S.SecondaryButton type="button" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </S.SecondaryButton>
            )}
            <S.PrimaryButton type="button" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </S.PrimaryButton>
          </S.Actions>
        </S.Card>
      </S.CardArea>
    </Modal>
  )
}
