import type { KeyboardEvent } from 'react'
import letterBlockIcon from '@/assets/icons/letter-block.svg'
import messageIcon from '@/assets/icons/message.svg'
import { CharacterAvatar } from '@/components/common/CharacterAvatar/CharacterAvatar'
import { ROOM_ROLE_LABELS } from '@/constants/room'
import type { RoomMember } from '@/types/room'
import * as S from './MemberRow.styles'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'

type MemberRowProps = {
  member: RoomMember
  onClick: (member: RoomMember) => void
  onLetterClick?: (member: RoomMember) => void
  letterDisabled?: boolean
}

export function MemberRow({
  member,
  onClick,
  onLetterClick,
  letterDisabled = false,
}: MemberRowProps) {
  const { nickname, role, characterColorId, profilePicture, song, similarity } = member
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
      <CharacterAvatar colorId={characterColorId} imageUrl={profilePicture} />
      <S.Info>
        <S.NameLine>
          <S.Nickname>{nickname}</S.Nickname>
          <S.Role $owner={isOwner}>{ROOM_ROLE_LABELS[role]}</S.Role>
        </S.NameLine>
        {song && (
          <S.Song>
            <CoverImage src={song.albumImageUrl} />
            <span>
              {song.title} - {song.artist}
            </span>
          </S.Song>
        )}
      </S.Info>
      <S.Aside>
        {similarity !== null && <S.Meta>{similarity}%</S.Meta>}
        <S.LetterButton
          type="button"
          aria-label={`${nickname}에게 편지 보내기`}
          disabled={letterDisabled}
          onClick={(event) => {
            event.stopPropagation()
            onLetterClick?.(member)
          }}
        >
          <img src={letterDisabled ? letterBlockIcon : messageIcon} alt="" width={28} height={30} />
        </S.LetterButton>
      </S.Aside>
    </S.Row>
  )
}
