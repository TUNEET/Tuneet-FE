import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import eyeClosedIcon from '@/assets/icons/deye.svg'
import eyeIcon from '@/assets/icons/eye.svg'
import youtubeMusicIcon from '@/assets/icons/youtube_Music.svg'
import logo from '@/assets/images/logo.svg'
import { login } from '@/apis/auth'
import { getApiError } from '@/apis/error'
import { ROUTES } from '@/constants/routes'
import { isProfileSetupPending, setTokens } from '@/utils/auth'
import { startYoutubeMusicConnect } from '@/utils/youtubeMusic'
import * as S from './LoginPage.styles'

const FIELDS = [
  {
    id: 'email',
    label: '이메일',
    type: 'email',
    placeholder: '이메일을 입력하세요.',
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

export function LoginPage() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const loginWithForm = async (afterLogin: () => Promise<void> | void) => {
    if (isSubmitting || !formRef.current) return

    const formData = new FormData(formRef.current)
    const email = String(formData.get('email')).trim()
    const password = String(formData.get('password'))

    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력해 주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      setTokens(await login({ email, password }))
      await afterLogin()
    } catch (error) {
      setErrorMessage(getApiError(error).message)
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginWithForm(() =>
      navigate(isProfileSetupPending() ? ROUTES.profileSetup : ROUTES.home, { replace: true }),
    )
  }

  const handleYoutubeMusicConnect = () =>
    loginWithForm(() =>
      startYoutubeMusicConnect(isProfileSetupPending() ? 'profileSetup' : 'settings'),
    )

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

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <S.Fields>
          {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => {
            const isPassword = type === 'password'
            const InputComponent = isPassword ? S.PasswordInput : S.Input
            const showError = errorMessage && isPassword

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
                <S.InputBox>
                  <InputComponent
                    id={id}
                    name={id}
                    type={isPassword && isPasswordVisible ? 'text' : type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={Boolean(errorMessage)}
                    aria-describedby={errorMessage ? 'login-error' : undefined}
                    onChange={() => setErrorMessage(null)}
                  />
                  {isPassword && (
                    <S.EyeButton
                      type="button"
                      aria-label={`${label} ${isPasswordVisible ? '숨기기' : '표시'}`}
                      aria-pressed={isPasswordVisible}
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? (
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

        <S.SubmitButton type="submit" disabled={isSubmitting}>
          로그인
        </S.SubmitButton>
      </form>

      <S.SignupButton type="button" onClick={() => navigate(ROUTES.signup)}>
        회원가입
      </S.SignupButton>

      <S.YoutubeMusicButton
        type="button"
        disabled={isSubmitting}
        onClick={handleYoutubeMusicConnect}
      >
        <img src={youtubeMusicIcon} alt="" width={30} height={30} />
        유튜브 뮤직 연동하기
      </S.YoutubeMusicButton>
    </S.Page>
  )
}
