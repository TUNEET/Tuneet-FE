import arrowRightCircleIcon from '@/assets/icons/arrow-right-circle.svg'
import roomDefaultImage from '@/assets/images/room-default.png'
import type { Room } from '@/types/room'
import * as S from './RoomCard.styles'

type RoomCardProps = {
  room: Room
  onEnterClick?: (room: Room) => void
}

export function RoomCard({ room, onEnterClick }: RoomCardProps) {
  const { name, description, imageUrl } = room

  return (
    <S.Card>
      <S.Body>
        <S.Thumbnail src={imageUrl || roomDefaultImage} alt="" />
        <S.Texts>
          <S.Name>{name}</S.Name>
          <S.Description>{description}</S.Description>
        </S.Texts>
      </S.Body>
      <S.EnterButton
        type="button"
        aria-label={`${name} 입장하기`}
        onClick={() => onEnterClick?.(room)}
      >
        <img src={arrowRightCircleIcon} alt="" width={30} height={30} />
      </S.EnterButton>
    </S.Card>
  )
}
