import { useId } from 'react'
import characterSleeping from '@/assets/images/character-sleeping.webp'
import { Modal } from '@/components/common/Modal/Modal'
import * as S from './WithdrawConfirmModal.styles'

const DELETED_DATA = [
  '프로필 정보',
  '좋아하는 장르, 아티스트, 노래',
  '피드 게시물 및 코멘트',
  '사용자 추천 데이터',
  '참여한 방 및 방 활동',
  '주고받은 편지',
]

type WithdrawConfirmModalProps = {
  isWithdrawing: boolean
  onConfirm: () => void
  onClose: () => void
}

export function WithdrawConfirmModal({
  isWithdrawing,
  onConfirm,
  onClose,
}: WithdrawConfirmModalProps) {
  const titleId = useId()
  const close = () => {
    if (!isWithdrawing) onClose()
  }

  return (
    <Modal open onClose={close} labelledBy={titleId} showCloseButton={false}>
      <S.CardArea>
        <S.Character src={characterSleeping} alt="" />
        <S.Card>
          <S.Title id={titleId}>정말 계정을 삭제하시겠어요?</S.Title>
          <S.Description>
            아래의 데이터가 모두 사라져요.
            <br />
            사라진 데이터는 복구할 수 없어요.
          </S.Description>
          <S.DataList>
            {DELETED_DATA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </S.DataList>
          <S.Actions>
            <S.ActionButton
              type="button"
              $tone="danger"
              disabled={isWithdrawing}
              onClick={onConfirm}
            >
              계정 삭제
            </S.ActionButton>
            <S.ActionButton type="button" $tone="muted" disabled={isWithdrawing} onClick={close}>
              닫기
            </S.ActionButton>
          </S.Actions>
        </S.Card>
      </S.CardArea>
    </Modal>
  )
}
