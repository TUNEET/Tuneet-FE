import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import appleMusicIcon from '@/assets/icons/Apple_Music.svg'
import genieIcon from '@/assets/icons/genie.svg'
import melonIcon from '@/assets/icons/melon.svg'
import logo from '@/assets/images/logo.svg'
import { ROUTES } from '@/constants/routes'
import * as S from './LoginPage.styles'

const FIELDS = [
  {
    id: 'username',
    label: '아이디',
    type: 'text',
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
          {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => (
            <S.Field key={id}>
              <S.Label htmlFor={id}>{label}</S.Label>
              <S.Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
              />
            </S.Field>
          ))}
        </S.Fields>

        <S.SubmitButton type="submit">로그인</S.SubmitButton>
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
