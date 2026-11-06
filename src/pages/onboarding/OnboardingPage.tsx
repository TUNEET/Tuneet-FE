import { useNavigate } from 'react-router'
import logo from '@/assets/images/logo.svg'
import { ROUTES } from '@/constants/routes'
import * as S from './OnboardingPage.styles'
import CHARACTER_IMAGE from '../../assets/icons/Photoroom 1.svg'
import HEART from '../../assets/icons/heart.svg'

export function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <S.Page>
      <S.Blob aria-hidden />
      <S.Heading>
        나만의 음악에서
        <br />
        우리의 음악으로, TUNEET
      </S.Heading>
      <S.Logo src={logo} alt="TUNEET" />
      <S.Buttons>
        <S.Button type="button" $variant="primary">
          로그인
        </S.Button>
        <S.Button type="button" $variant="secondary" onClick={() => navigate(ROUTES.signup)}>
          회원가입
        </S.Button>
      </S.Buttons>
      <S.Character src={CHARACTER_IMAGE} alt="" />
      <S.Accent src={HEART} alt="" />
    </S.Page>
  )
}
