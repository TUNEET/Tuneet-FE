import chevronLeftIcon from '@/assets/icons/chevron-left.svg'
import * as S from './RoomHeader.styles'

type RoomHeaderProps = {
  name: string
  description: string
  onBackClick: () => void
}

export function RoomHeader({ name, description, onBackClick }: RoomHeaderProps) {
  return (
    <S.Wrapper>
      <S.TitleGroup>
        <S.BackButton type="button" aria-label="뒤로가기" onClick={onBackClick}>
          <img src={chevronLeftIcon} alt="" />
        </S.BackButton>
        <S.Name>{name}</S.Name>
      </S.TitleGroup>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  )
}
