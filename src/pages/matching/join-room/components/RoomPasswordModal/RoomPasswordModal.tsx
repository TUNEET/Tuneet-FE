import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import chevronRightWhiteIcon from '@/assets/icons/chevron-right-white.svg'
import characterQuestion from '@/assets/images/character-question.png'
import { Modal } from '@/components/common/Modal/Modal'
import * as S from './RoomPasswordModal.styles'

type RoomPasswordModalProps = {
  onClose: () => void
  onSubmit: (password: string) => void
}

export function RoomPasswordModal({ onClose, onSubmit }: RoomPasswordModalProps) {
  const titleId = useId()
  const [password, setPassword] = useState('')
  const trimmedPassword = password.trim()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (trimmedPassword) onSubmit(trimmedPassword)
  }

  return (
    <Modal open onClose={onClose} labelledBy={titleId}>
      <S.CardArea>
        <S.Character src={characterQuestion} alt="" />
        <S.Card onSubmit={handleSubmit}>
          <S.Title id={titleId}>잠겨 있는 방</S.Title>
          <S.PasswordInput
            value={password}
            placeholder="비밀번호를 입력해 주세요."
            aria-label="방 비밀번호"
            inputMode="numeric"
            maxLength={4}
            autoFocus
            onChange={(event) => setPassword(event.target.value.replace(/\D/g, ''))}
          />
          <S.SubmitButton type="submit" aria-label="입장하기" disabled={!trimmedPassword}>
            <img src={chevronRightWhiteIcon} alt="" />
          </S.SubmitButton>
        </S.Card>
      </S.CardArea>
    </Modal>
  )
}
