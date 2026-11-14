import { useEffect, useRef } from 'react'
import * as S from './PasswordSetting.styles'

type PasswordSettingProps = {
  enabled: boolean
  password: string
  onEnabledChange: (enabled: boolean) => void
  onPasswordChange: (password: string) => void
}

export function PasswordSetting({
  enabled,
  password,
  onEnabledChange,
  onPasswordChange,
}: PasswordSettingProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (enabled) inputRef.current?.focus()
  }, [enabled])

  return (
    <S.Row>
      <S.Toggle
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onEnabledChange(!enabled)}
      >
        <S.Indicator $checked={enabled} />
        비밀번호 설정
      </S.Toggle>
      <S.PasswordInput
        ref={inputRef}
        value={password}
        placeholder="비밀번호 입력"
        aria-label="비밀번호"
        inputMode="numeric"
        maxLength={4}
        disabled={!enabled}
        onChange={(event) => onPasswordChange(event.target.value.replace(/\D/g, ''))}
      />
    </S.Row>
  )
}
