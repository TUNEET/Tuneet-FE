import * as S from './SectionHeader.styles'

type SectionHeaderProps = {
  title: string
  actionLabel?: string
  onActionClick?: () => void
}

export function SectionHeader({ title, actionLabel, onActionClick }: SectionHeaderProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      {actionLabel && (
        <S.Action type="button" onClick={onActionClick}>
          {actionLabel}
        </S.Action>
      )}
    </S.Wrapper>
  )
}
