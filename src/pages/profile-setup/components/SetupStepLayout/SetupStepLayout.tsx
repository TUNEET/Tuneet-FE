import type { ReactNode } from 'react'
import logo from '@/assets/images/logo.svg'
import { ChevronIcon } from '@/components/common/ChevronIcon/ChevronIcon'
import * as S from '../../ProfileSetupPage.styles'

type SetupStepLayoutProps = {
  title: string
  description: ReactNode
  singleLineDescription?: boolean
  /** 설명 아래에 붙는 작은 안내 문구 */
  note?: string
  onBack?: () => void
  children: ReactNode
}

export function SetupStepLayout({
  title,
  description,
  singleLineDescription = false,
  note,
  onBack,
  children,
}: SetupStepLayoutProps) {
  const Description = singleLineDescription ? S.SetupDescription : S.PlatformDescription

  return (
    <S.Page $hasNote={note !== undefined}>
      <S.Blob aria-hidden />
      {onBack && (
        <S.BackButton type="button" aria-label="뒤로가기" onClick={onBack}>
          <ChevronIcon direction="left" />
        </S.BackButton>
      )}
      <S.Logo src={logo} alt="TUNEET" />
      <S.Heading>{title}</S.Heading>
      <Description>
        {description}
        {note && <S.StepNote>{note}</S.StepNote>}
      </Description>
      {children}
    </S.Page>
  )
}
