import type { KeyboardEvent } from 'react'
import messageIcon from '@/assets/icons/message.svg'
import { CharacterAvatar } from '@/components/common/CharacterAvatar/CharacterAvatar'
import { ROOM_ROLE_LABELS } from '@/constants/room'
import type { RoomMember } from '@/types/room'
import { formatDistance } from '@/utils/format'
import * as S from './MemberRow.styles'

type MemberRowProps = {
  member: RoomMember
  onClick: (member: RoomMember) => void
  onLetterClick?: (member: RoomMember) => void
}

export function MemberRow({ member, onClick, onLetterClick }: MemberRowProps) {
  const { nickname, role, characterColorId, song, similarity, distanceKm } = member
  const isOwner = role === 'owner'

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(member)
    }
  }

  return (
    <S.Row
      $owner={isOwner}
      role="button"
      tabIndex={0}
      onClick={() => onClick(member)}
      onKeyDown={handleKeyDown}
    >
      <CharacterAvatar colorId={characterColorId} />
      <S.Info>
        <S.NameLine>
          <S.Nickname>{nickname}</S.Nickname>
          <S.Role $owner={isOwner}>{ROOM_ROLE_LABELS[role]}</S.Role>
        </S.NameLine>
        <S.Song>
          <img src={song.albumImageUrl} alt="" />
          <span>
            {song.title} - {song.artist}
          </span>
        </S.Song>
      </S.Info>
      <S.Aside>
        <S.Meta>
          {similarity}% / {formatDistance(distanceKm)}
        </S.Meta>
        <S.LetterButton
          type="button"
          aria-label={`${nickname}에게 편지 보내기`}
          onClick={(event) => {
            event.stopPropagation()
            onLetterClick?.(member)
          }}
        >
          <img src={messageIcon} alt="" width={28} height={30} />
        </S.LetterButton>
      </S.Aside>
    </S.Row>
  )
}
