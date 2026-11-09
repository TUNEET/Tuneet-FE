import { useId } from 'react'
import termCharacter from '@/assets/images/character-term.webp'
import * as S from '../../SignupPage.styles'
import type { TERMS } from '../../terms'

type TermDetailModalProps = {
  detail: (typeof TERMS)[number]['detail']
  onClose: () => void
}

export function TermDetailModal({ detail, onClose }: TermDetailModalProps) {
  const titleId = useId()

  return (
    <S.TermModalOverlay>
      <S.TermModal $height={detail.height} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <S.TermModalTitle id={titleId}>{detail.title}</S.TermModalTitle>
        <S.TermSections $gap={detail.sectionGap}>
          {detail.sections.map(({ heading, body }) => (
            <S.TermSection key={heading}>
              <S.TermSectionHeading>{heading}</S.TermSectionHeading>
              <S.TermSectionBody>{body}</S.TermSectionBody>
            </S.TermSection>
          ))}
        </S.TermSections>
        <S.TermModalCloseButton type="button" onClick={onClose} autoFocus>
          닫기
        </S.TermModalCloseButton>
      </S.TermModal>
      <S.TermCharacter $modalHeight={detail.height} src={termCharacter} alt="" />
    </S.TermModalOverlay>
  )
}
