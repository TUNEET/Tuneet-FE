import { useState } from 'react'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import logo from '@/assets/images/logo.svg'
import { TermDetailModal } from '@/components/common/TermDetailModal/TermDetailModal'
import { ROUTES } from '@/constants/routes'
import { TERMS } from '@/constants/terms'
import * as S from './OnboardingPage.styles'
import CHARACTER_IMAGE from '@/assets/images/character-onboarding.webp'
import HEART from '@/assets/images/onboarding-heart.webp'

type TermId = 'termsOfService' | 'privacyPolicy'

export function OnboardingPage() {
  const navigate = useNavigate()
  const [openTermId, setOpenTermId] = useState<TermId | null>(null)
  const openTerm = TERMS.find(({ id }) => id === openTermId)

  const handleTermClick = (id: TermId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpenTermId(id)
  }

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
        <S.Button type="button" $variant="primary" onClick={() => navigate(ROUTES.login)}>
          로그인
        </S.Button>
        <S.Button type="button" $variant="secondary" onClick={() => navigate(ROUTES.signup)}>
          회원가입
        </S.Button>
      </S.Buttons>
      <S.Links>
        <a href="/privacy" onClick={handleTermClick('privacyPolicy')}>
          개인정보 처리방침
        </a>
        <span aria-hidden>·</span>
        <a href="/terms" onClick={handleTermClick('termsOfService')}>
          서비스 이용약관
        </a>
        <span aria-hidden>·</span>
        <a href="mailto:softabc12@gmail.com">문의</a>
      </S.Links>
      <S.Character src={CHARACTER_IMAGE} alt="" />
      <S.Accent src={HEART} alt="" />
      {openTerm && <TermDetailModal detail={openTerm.detail} onClose={() => setOpenTermId(null)} />}
    </S.Page>
  )
}
