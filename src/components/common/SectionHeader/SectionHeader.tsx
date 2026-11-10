import * as S from './SectionHeader.styles'

type SectionHeaderProps = {
  title: string
  actionLabel?: string
  onActionClick?: () => void
  actionDisabled?: boolean
}

export function SectionHeader({
  title,
  actionLabel,
  onActionClick,
  actionDisabled = false,
}: SectionHeaderProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      {actionLabel && (
        <S.Action type="button" onClick={onActionClick} disabled={actionDisabled}>
          {actionLabel}
        </S.Action>
      )}
    </S.Wrapper>
  )
}
