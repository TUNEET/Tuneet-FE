import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { checkEmailAvailability, signUp } from '@/apis/user'
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
const PASSWORD_CHAR_GROUPS = [/[A-Za-z]/, /\d/, /[!@#$%^&*()\-_=+[\]{};:'",.<>/?~`|\\]/]
const PASSWORD_ALLOWED = /^[A-Za-z\d!@#$%^&*()\-_=+[\]{};:'",.<>/?~`|\\]*$/
const PASSWORD_MIN_GROUPS = 2

const SERVER_FIELD_IDS: Record<string, FieldId> = {
  email: 'email',
  password: 'password',
  passwordConfirm: 'passwordConfirm',
}

const PASSWORD_MISMATCH_CODE = 'U4004'

const SIGNUP_ERROR_MESSAGES = {
  emailInvalid: '올바른 이메일 주소를 입력해 주세요.',
  emailDuplicated: '이미 존재하는 이메일입니다.',
  passwordLength: `${PASSWORD_MIN_LENGTH}자~${PASSWORD_MAX_LENGTH}자 이내로 입력해 주세요.`,
  passwordCombination: '영문·숫자·특수문자 중 2가지 이상 조합해 주세요.',
  passwordInvalidChar: '영문·숫자·특수문자만 입력할 수 있어요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
  termsRequired: '필수 약관에 동의해 주세요.',
} as const

function validatePassword(password: string) {
  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    return SIGNUP_ERROR_MESSAGES.passwordLength
  }

  if (!PASSWORD_ALLOWED.test(password)) return SIGNUP_ERROR_MESSAGES.passwordInvalidChar

  const groupCount = PASSWORD_CHAR_GROUPS.filter((group) => group.test(password)).length
  if (groupCount < PASSWORD_MIN_GROUPS) return SIGNUP_ERROR_MESSAGES.passwordCombination

  return null
}

function validateFields(email: string, password: string, passwordConfirm: string) {
  const errors: FieldErrors = {}

  if (!EMAIL_PATTERN.test(email)) errors.email = SIGNUP_ERROR_MESSAGES.emailInvalid

  const passwordError = validatePassword(password)
  if (passwordError) errors.password = passwordError

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const openTermDetail = TERMS.find(({ id }) => id === openTermId)?.detail

  const clearFieldError = (id: FieldId) => {
    setFieldErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email')).trim()
    const password = String(formData.get('password'))
    const passwordConfirm = String(formData.get('passwordConfirm'))

    const errors = validateFields(email, password, passwordConfirm)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    if (TERMS.some(({ id, required }) => required && !formData.has(id))) {
      setErrorMessage(SIGNUP_ERROR_MESSAGES.termsRequired)
      return
    }

    setIsSubmitting(true)
    try {
      if (!(await checkEmailAvailability(email))) {
        setFieldErrors({ email: SIGNUP_ERROR_MESSAGES.emailDuplicated })
        return
      }

      await signUp({
        email,
        password,
        passwordConfirm,
        termsAgreed: formData.has('termsOfService'),
        privacyAgreed: formData.has('privacyPolicy'),
        locationAgreed: formData.has('locationConsent'),
      })

      markProfileSetupPending()
      navigate(ROUTES.login)
    } catch (error) {
      handleSignupError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignupError = (error: unknown) => {
    const { code, message, fields } = getApiError(error)

    if (code === PASSWORD_MISMATCH_CODE) {
      setFieldErrors({ passwordConfirm: SIGNUP_ERROR_MESSAGES.passwordMismatch })
      return
    }

    // 서버가 칸별로 알려준 오류는 해당 입력칸에, 나머지(약관 등)는 팝업으로
    const serverFieldErrors: FieldErrors = {}
    for (const [key, fieldMessage] of Object.entries(fields)) {
      const fieldId = SERVER_FIELD_IDS[key]
      if (fieldId) serverFieldErrors[fieldId] = fieldMessage
    }

    if (Object.keys(serverFieldErrors).length > 0) {
      setFieldErrors(serverFieldErrors)
      return
    }

    setErrorMessage(message)
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

        <S.SubmitButton type="submit" disabled={isSubmitting}>
          회원가입
        </S.SubmitButton>
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
