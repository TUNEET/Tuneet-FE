import type { ReactNode } from 'react'
import logo from '@/assets/images/logo.svg'
import { ChevronIcon } from '@/components/common/ChevronIcon/ChevronIcon'
import * as S from '../../ProfileSetupPage.styles'

type SetupStepLayoutProps = {
  title: string
  description: ReactNode
  /** 한 줄 설명(프로필·음악 단계)은 기본 줄 간격을 쓴다 */
  singleLineDescription?: boolean
  /** 없으면 뒤로가기 버튼을 숨긴다 */
  onBack?: () => void
  children: ReactNode
}

/** 프로필 설정 각 단계의 공통 틀: 배경, 뒤로가기, 로고, 제목, 설명 */
export function SetupStepLayout({
  title,
  description,
  singleLineDescription = false,
  onBack,
  children,
}: SetupStepLayoutProps) {
  const Description = singleLineDescription ? S.SetupDescription : S.PlatformDescription

  return (
    <S.Page>
      <S.Blob aria-hidden />
      {onBack && (
        <S.BackButton type="button" aria-label="뒤로가기" onClick={onBack}>
          <ChevronIcon direction="left" />
        </S.BackButton>
      )}
      <S.Logo src={logo} alt="TUNEET" />
      <S.Heading>{title}</S.Heading>
      <Description>{description}</Description>
      {children}
    </S.Page>
  )
}
