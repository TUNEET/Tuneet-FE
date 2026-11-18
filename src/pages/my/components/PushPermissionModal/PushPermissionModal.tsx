import { useId } from 'react'
import characterFailure from '@/assets/images/character-failure.webp'
import { Modal } from '@/components/common/Modal/Modal'
import * as S from './PushPermissionModal.styles'

export type PushBlockedReason = 'denied' | 'unsupported'

const COPY: Record<PushBlockedReason, { title: string; description: string }> = {
  denied: {
    title: '브라우저 알림 권한이 꺼져 있어요.',
    description: 'PUSH 알림 수신을 위해,\n브라우저 설정에서 알림 권한을 허용해 주세요.',
  },
  unsupported: {
    title: '지금 브라우저에서는 알림을 받을 수 없어요.',
    description: 'TUNEET를 홈 화면에 추가한 뒤,\n추가한 앱에서 PUSH 알림을 켜 주세요.',
  },
}

type PushPermissionModalProps = {
  reason: PushBlockedReason
  onClose: () => void
}

export function PushPermissionModal({ reason, onClose }: PushPermissionModalProps) {
  const titleId = useId()
  const { title, description } = COPY[reason]

  return (
    <Modal open onClose={onClose} labelledBy={titleId} showCloseButton={false}>
      <S.CardArea>
        <S.Character src={characterFailure} alt="" />
        <S.Card>
          <S.Intro>
            <S.Title id={titleId}>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.Intro>
          <S.ConfirmButton type="button" onClick={onClose}>
            확인
          </S.ConfirmButton>
        </S.Card>
      </S.CardArea>
    </Modal>
  )
}
