import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import appleMusicIcon from '@/assets/icons/Apple_Music.svg'
import genieIcon from '@/assets/icons/genie.svg'
import melonIcon from '@/assets/icons/melon.svg'
import logo from '@/assets/images/logo.svg'
import { login } from '@/apis/auth'
import { getApiError } from '@/apis/error'
import { ROUTES } from '@/constants/routes'
import { isProfileSetupPending, setTokens } from '@/utils/auth'
import * as S from './LoginPage.styles'

const FIELDS = [
  {
    id: 'email',
    label: '아이디',
    type: 'email',
    placeholder: '아이디를 입력하세요.',
    autoComplete: 'username',
  },
  {
    id: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
    autoComplete: 'current-password',
  },
]

const SOCIAL_LOGINS = [
  { id: 'appleMusic', label: 'Apple Music으로 로그인', icon: appleMusicIcon },
  { id: 'melon', label: '멜론으로 로그인', icon: melonIcon },
  { id: 'genie', label: '지니로 로그인', icon: genieIcon },
]

export function LoginPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email')).trim()
    const password = String(formData.get('password'))

    if (!email || !password) {
      setErrorMessage('아이디와 비밀번호를 입력해 주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      setTokens(await login({ email, password }))
      navigate(isProfileSetupPending() ? ROUTES.profileSetup : ROUTES.home, { replace: true })
    } catch (error) {
      setErrorMessage(getApiError(error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <S.Page>
      <S.Blob aria-hidden />
      <S.Heading>
        반가워요!
        <br />
        우리의 음악은 계속돼요
      </S.Heading>
      <S.Logo src={logo} alt="TUNEET" />
      <S.Description>로그인해서 연결을 시작하세요.</S.Description>

      <form onSubmit={handleSubmit} noValidate>
        <S.Fields>
          {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => {
            // 서버가 어느 칸이 틀렸는지 알려주지 않으므로 문구는 비밀번호 칸에, 테두리는 두 칸 모두에 표시
            const showError = errorMessage && id === 'password'

            return (
              <S.Field key={id}>
                <S.LabelRow>
                  <S.Label htmlFor={id}>{label}</S.Label>
                  {showError && (
                    <S.FieldError id="login-error" role="alert">
                      {errorMessage}
                    </S.FieldError>
                  )}
                </S.LabelRow>
                <S.Input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  aria-invalid={Boolean(errorMessage)}
                  aria-describedby={errorMessage ? 'login-error' : undefined}
                  onChange={() => setErrorMessage(null)}
                />
              </S.Field>
            )
          })}
        </S.Fields>

        <S.SubmitButton type="submit" disabled={isSubmitting}>
          로그인
        </S.SubmitButton>
      </form>

      <S.SignupButton type="button" onClick={() => navigate(ROUTES.signup)}>
        회원가입
      </S.SignupButton>

      <S.SocialLogins>
        {SOCIAL_LOGINS.map(({ id, label, icon }) => (
          <S.SocialButton key={id} type="button" aria-label={label}>
            <img src={icon} alt="" width={30} height={30} />
          </S.SocialButton>
        ))}
      </S.SocialLogins>
    </S.Page>
  )
}
