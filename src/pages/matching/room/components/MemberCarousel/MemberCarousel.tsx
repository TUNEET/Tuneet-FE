import { CharacterAvatar } from '@/components/common/CharacterAvatar/CharacterAvatar'
import { ROOM_ROLE_LABELS } from '@/constants/room'
import type { RoomMember } from '@/types/room'
import * as S from './MemberCarousel.styles'

type MemberCarouselProps = {
  members: RoomMember[]
}

export function MemberCarousel({ members }: MemberCarouselProps) {
  return (
    <S.Wrapper>
      <S.List>
        {members.map(({ id, nickname, role, characterColorId }) => {
          const isOwner = role === 'owner'
          return (
            <S.Card key={id} $owner={isOwner}>
              <CharacterAvatar colorId={characterColorId} />
              <S.Texts>
                <S.Nickname>{nickname}</S.Nickname>
                <S.Role $owner={isOwner}>{ROOM_ROLE_LABELS[role]}</S.Role>
              </S.Texts>
            </S.Card>
          )
        })}
      </S.List>
    </S.Wrapper>
  )
}
