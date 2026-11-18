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
      <S.Intro>
        좋아하는 장르·아티스트·노래로 음악 프로필을 만들고, 취향이 비슷한 사람을 추천받아 편지를
        주고받는 서비스예요. 유튜브 뮤직을 연결하면 좋아요한 곡으로 프로필을 채울 수 있어요 (읽기
        전용).
      </S.Intro>
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
