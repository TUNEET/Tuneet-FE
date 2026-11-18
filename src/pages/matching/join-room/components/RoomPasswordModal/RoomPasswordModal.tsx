import { useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import chevronRightWhiteIcon from '@/assets/icons/chevron-right-white.svg'
import characterQuestion from '@/assets/images/character-question.png'
import { Modal } from '@/components/common/Modal/Modal'
import * as S from './RoomPasswordModal.styles'

type RoomPasswordModalProps = {
  mismatchCount: number
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (password: string) => void
}

export function RoomPasswordModal({
  mismatchCount,
  isSubmitting,
  onClose,
  onSubmit,
}: RoomPasswordModalProps) {
  const titleId = useId()
  const errorId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const [isMismatchShown, setIsMismatchShown] = useState(false)
  const [seenMismatchCount, setSeenMismatchCount] = useState(mismatchCount)
  const trimmedPassword = password.trim()

  if (mismatchCount !== seenMismatchCount) {
    setSeenMismatchCount(mismatchCount)
    setPassword('')
    setIsMismatchShown(mismatchCount > 0)
  }

  useEffect(() => {
    if (mismatchCount > 0) inputRef.current?.focus()
  }, [mismatchCount])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (trimmedPassword && !isSubmitting) onSubmit(trimmedPassword)
  }

  return (
    <Modal open onClose={onClose} labelledBy={titleId}>
      <S.CardArea>
        <S.Character src={characterQuestion} alt="" />
        <S.Card onSubmit={handleSubmit}>
          <S.Title id={titleId}>잠겨 있는 방</S.Title>
          <S.PasswordInput
            ref={inputRef}
            value={password}
            placeholder="비밀번호를 입력해 주세요."
            aria-label="방 비밀번호"
            inputMode="numeric"
            maxLength={4}
            autoFocus
            aria-invalid={isMismatchShown}
            aria-describedby={isMismatchShown ? errorId : undefined}
            onChange={(event) => {
              setPassword(event.target.value.replace(/\D/g, ''))
              setIsMismatchShown(false)
            }}
          />
          {isMismatchShown && (
            <S.ErrorMessage id={errorId} role="alert">
              비밀번호가 맞지 않아요
            </S.ErrorMessage>
          )}
          <S.SubmitButton
            type="submit"
            aria-label="입장하기"
            disabled={!trimmedPassword || isSubmitting}
          >
            <img src={chevronRightWhiteIcon} alt="" />
          </S.SubmitButton>
        </S.Card>
      </S.CardArea>
    </Modal>
  )
}
