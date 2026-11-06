import type { FormEvent } from 'react'
import logo from '@/assets/images/logo.svg'
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
  { id: 'termsOfService', label: '서비스 이용약관 동의 (필수)' },
  { id: 'privacyPolicy', label: '개인정보 처리방침 동의 (필수)' },
]

export function SignupPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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

      <S.LoginButton type="button">로그인</S.LoginButton>
    </S.Page>
  )
}
