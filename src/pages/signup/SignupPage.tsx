import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import eyeClosedIcon from '@/assets/icons/deye.svg'
import eyeIcon from '@/assets/icons/eye.svg'
import logo from '@/assets/images/logo.svg'
import { ROUTES } from '@/constants/routes'
import { markProfileSetupPending } from '@/utils/auth'
import { TermDetailModal } from '@/components/common/TermDetailModal/TermDetailModal'
import * as S from './SignupPage.styles'
import { TERMS } from '@/constants/terms'

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
] as const

type FieldId = (typeof FIELDS)[number]['id']
type FieldErrors = Partial<Record<FieldId, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 16

const SIGNUP_ERROR_MESSAGES = {
  emailInvalid: '올바른 이메일 주소를 입력해 주세요.',
  emailDuplicated: '이미 존재하는 이메일입니다.', // 회원가입 API 연동 시 중복 응답에 사용
  passwordLength: `${PASSWORD_MIN_LENGTH}자~${PASSWORD_MAX_LENGTH}자 이내로 입력해 주세요.`,
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
} as const

function validateFields(email: string, password: string, passwordConfirm: string) {
  const errors: FieldErrors = {}

  if (!EMAIL_PATTERN.test(email)) errors.email = SIGNUP_ERROR_MESSAGES.emailInvalid

  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    errors.password = SIGNUP_ERROR_MESSAGES.passwordLength
  }

  if (!passwordConfirm || password !== passwordConfirm) {
    errors.passwordConfirm = SIGNUP_ERROR_MESSAGES.passwordMismatch
  }

  return errors
}

export function SignupPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({})
  const [openTermId, setOpenTermId] = useState<string | null>(null)
  const openTermDetail = TERMS.find(({ id }) => id === openTermId)?.detail

  const clearFieldError = (id: FieldId) => {
    setFieldErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email')).trim()
    const password = String(formData.get('password'))
    const passwordConfirm = String(formData.get('passwordConfirm'))

    const errors = validateFields(email, password, passwordConfirm)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

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
            const fieldError = fieldErrors[id]
            const errorId = `${id}-error`

            return (
              <S.Field key={id}>
                <S.LabelRow>
                  <S.Label htmlFor={id}>{label}</S.Label>
                  {fieldError && (
                    <S.FieldError id={errorId} role="alert">
                      {fieldError}
                    </S.FieldError>
                  )}
                </S.LabelRow>
                <S.InputBox>
                  <InputComponent
                    id={id}
                    name={id}
                    type={isPassword && isVisible ? 'text' : type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={Boolean(fieldError)}
                    aria-describedby={fieldError ? errorId : undefined}
                    onChange={() => clearFieldError(id)}
                  />
                  {isPassword && (
                    <S.EyeButton
                      type="button"
                      aria-label={`${label} ${isVisible ? '숨기기' : '표시'}`}
                      aria-pressed={isVisible}
                      onClick={() => setVisiblePasswords((prev) => ({ ...prev, [id]: !isVisible }))}
                    >
                      {isVisible ? (
                        <img src={eyeIcon} alt="" width={16} height={12} />
                      ) : (
                        <img src={eyeClosedIcon} alt="" width={14} height={6} />
                      )}
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
              <S.TermDetail type="button" onClick={() => setOpenTermId(id)}>
                자세히보기
              </S.TermDetail>
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

      {openTermDetail && (
        <TermDetailModal detail={openTermDetail} onClose={() => setOpenTermId(null)} />
      )}
    </S.Page>
  )
}
