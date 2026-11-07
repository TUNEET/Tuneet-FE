import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import logo from '@/assets/images/logo.svg'
import { ROUTES } from '@/constants/routes'
import { markProfileSetupPending } from '@/utils/auth'
import * as S from './SignupPage.styles'

const FIELDS = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력하세요.',
    autoComplete: 'email',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
    autoComplete: 'new-password',
  },
  {
    id: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력하세요.',
    autoComplete: 'new-password',
  },
]

const TERMS = [
  { id: 'termsOfService', label: '서비스 이용약관 동의 (필수)', required: true },
  { id: 'privacyPolicy', label: '개인정보 처리방침 동의 (필수)', required: true },
  { id: 'locationConsent', label: '위치정보 수집 및 이용 동의 (선택)', required: false },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z" />
      <circle cx="10" cy="10" r="2.5" />
      {crossed && <path d="m3 3 14 14" />}
    </svg>
  )
}

export function SignupPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    const passwordConfirm = String(formData.get('passwordConfirm'))

    if (!EMAIL_PATTERN.test(email)) {
      setErrorMessage('올바른 이메일 주소를 입력해 주세요.')
      return
    }

    if (!password || password !== passwordConfirm) {
      setErrorMessage('올바른 비밀번호를 입력해 주세요.')
      return
    }

    if (TERMS.some(({ id, required }) => required && !formData.has(id))) {
      setErrorMessage('필수 약관에 동의해 주세요.')
      return
    }

    markProfileSetupPending()
    navigate(ROUTES.login)
  }

  return (
    <S.Page>
      <S.Blob aria-hidden />
      <S.Heading>
        당신의 음악으로
        <br />
        새로운 이야기를 시작해요.
      </S.Heading>
      <S.Logo src={logo} alt="TUNEET" />
      <S.Description>지금 가입하고 연결을 시작하세요.</S.Description>

      <form onSubmit={handleSubmit} noValidate>
        <S.Fields>
          {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => {
            const isPassword = type === 'password'
            const isVisible = Boolean(visiblePasswords[id])
            const InputComponent = isPassword ? S.PasswordInput : S.Input

            return (
              <S.Field key={id}>
                <S.Label htmlFor={id}>{label}</S.Label>
                <S.InputBox>
                  <InputComponent
                    id={id}
                    name={id}
                    type={isPassword && isVisible ? 'text' : type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                  />
                  {isPassword && (
                    <S.EyeButton
                      type="button"
                      aria-label={`${label} ${isVisible ? '숨기기' : '표시'}`}
                      aria-pressed={isVisible}
                      onClick={() =>
                        setVisiblePasswords((prev) => ({ ...prev, [id]: !isVisible }))
                      }
                    >
                      <EyeIcon crossed={!isVisible} />
                    </S.EyeButton>
                  )}
                </S.InputBox>
              </S.Field>
            )
          })}
        </S.Fields>

        <S.Terms>
          {TERMS.map(({ id, label }) => (
            <S.Term key={id}>
              <S.TermLabel>
                <S.Checkbox type="checkbox" name={id} />
                {label}
              </S.TermLabel>
              <S.TermDetail type="button">자세히보기</S.TermDetail>
            </S.Term>
          ))}
        </S.Terms>

        <S.SubmitButton type="submit">회원가입</S.SubmitButton>
      </form>

      <S.LoginButton type="button" onClick={() => navigate(ROUTES.login)}>
        로그인
      </S.LoginButton>

      {errorMessage && (
        <S.ErrorPopup role="alertdialog" aria-labelledby="signup-error">
          <S.ErrorMessage id="signup-error">{errorMessage}</S.ErrorMessage>
          <S.ErrorCloseButton type="button" onClick={() => setErrorMessage(null)} autoFocus>
            닫기
          </S.ErrorCloseButton>
        </S.ErrorPopup>
      )}
    </S.Page>
  )
}
