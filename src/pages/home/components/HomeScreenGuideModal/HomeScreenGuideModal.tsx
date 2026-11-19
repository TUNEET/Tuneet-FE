import { useEffect, useId } from 'react'
import line1 from '@/assets/icons/Line1.svg'
import line2 from '@/assets/icons/Line2.svg'
import line3 from '@/assets/icons/Line3.svg'
import stepShareImage from '@/assets/images/addhome-1.webp'
import stepMenuImage from '@/assets/images/addhome-2.webp'
import stepAddImage from '@/assets/images/addhome-3.webp'
import characterImage from '@/assets/images/character-onboarding.webp'
import * as S from './HomeScreenGuideModal.styles'

type HomeScreenGuideModalProps = {
  onClose: () => void
}

export function HomeScreenGuideModal({ onClose }: HomeScreenGuideModalProps) {
  const titleId = useId()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <S.Overlay>
      <S.Wrapper>
        <S.Character src={characterImage} alt="" />
        <S.Card role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <S.Title id={titleId}>
            TUNEET을 홈 화면에 추가하고
            <br />
            더욱 편리하게 이용해 보세요!
          </S.Title>
          <S.Description>
            브라우저 하단의 공유 버튼을 누른 후, ‘홈 화면에 추가’를 눌러
            <br />
            TUNEET을 홈 화면에서 더욱 편리하게 만나보세요.
          </S.Description>
          <S.PushNote>홈 화면 추가 시 PUSH 알림을 받을 수 있어요.</S.PushNote>

          <S.StepShare src={stepShareImage} alt="" />
          <S.StepMenu src={stepMenuImage} alt="" />
          <S.StepAdd src={stepAddImage} alt="" />
          <S.Line src={line1} alt="" $left="17.13rem" $top="13.63rem" width={95} height={6} />
          <S.Line src={line2} alt="" $left="6.03rem" $top="16.83rem" width={206} height={28} />
          <S.Line src={line3} alt="" $left="9.03rem" $top="29.13rem" width={176} height={6} />
          <S.StepBadge $top="12.9rem">1</S.StepBadge>
          <S.StepBadge $top="18.3rem">2</S.StepBadge>
          <S.StepBadge $top="28.4rem">3</S.StepBadge>

          <S.CloseButton type="button" onClick={onClose}>
            닫기
          </S.CloseButton>
        </S.Card>
      </S.Wrapper>
    </S.Overlay>
  )
}
