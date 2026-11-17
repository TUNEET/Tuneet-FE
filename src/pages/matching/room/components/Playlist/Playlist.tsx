import { useCallback, useRef, useState } from 'react'
import playCircleIcon from '@/assets/icons/play-circle.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { useLongPress } from '@/hooks/useLongPress'
import type { PlaylistSong } from '@/types/room'
import * as S from './Playlist.styles'

type PlaylistProps = {
  songs: PlaylistSong[]
  onPlayClick?: (song: PlaylistSong) => void
  onDelete?: (song: PlaylistSong) => void
}

export function Playlist({ songs, onPlayClick, onDelete }: PlaylistProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const closeDelete = useCallback(() => setDeletingId(null), [])

  return (
    <S.List>
      {songs.map((song) => (
        <PlaylistItem
          key={song.id}
          song={song}
          isDeleteOpen={deletingId === song.id}
          onLongPress={onDelete && song.deletable ? () => setDeletingId(song.id) : undefined}
          onCloseDelete={closeDelete}
          onConfirmDelete={() => {
            closeDelete()
            onDelete?.(song)
          }}
          onPlayClick={onPlayClick}
        />
      ))}
    </S.List>
  )
}

type PlaylistItemProps = {
  song: PlaylistSong
  isDeleteOpen: boolean
  onLongPress?: () => void
  onCloseDelete: () => void
  onConfirmDelete: () => void
  onPlayClick?: (song: PlaylistSong) => void
}

function PlaylistItem({
  song,
  isDeleteOpen,
  onLongPress,
  onCloseDelete,
  onConfirmDelete,
  onPlayClick,
}: PlaylistItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const longPressHandlers = useLongPress(() => onLongPress?.(), Boolean(onLongPress))

  return (
    <S.Item ref={itemRef} $pressable={Boolean(onLongPress)} {...longPressHandlers}>
      <S.Song>
        <CoverImage src={song.albumImageUrl} />
        <span>
          {song.title} - {song.artist}
        </span>
      </S.Song>
      <S.PlayButton
        type="button"
        aria-label={`${song.title} 재생`}
        onClick={() => onPlayClick?.(song)}
      >
        <img src={playCircleIcon} alt="" width={16} height={16} />
      </S.PlayButton>
      {onLongPress && (
        <ConfirmPopover
          open={isDeleteOpen}
          message="이 노래를 삭제하시겠어요?"
          confirmLabel="노래 삭제"
          onConfirm={onConfirmDelete}
          onClose={onCloseDelete}
          anchorRef={itemRef}
        />
      )}
    </S.Item>
  )
}
