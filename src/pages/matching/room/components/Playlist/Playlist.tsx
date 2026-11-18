import { useCallback, useRef, useState } from 'react'
import playCircleIcon from '@/assets/icons/play-circle.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { LikeButton } from '@/components/common/LikeButton/LikeButton'
import { useLongPress } from '@/hooks/useLongPress'
import type { PlaylistSong } from '@/types/room'
import * as S from './Playlist.styles'

type PlaylistProps = {
  songs: PlaylistSong[]
  onPlayClick?: (item: PlaylistSong) => void
  onLikeToggle?: (item: PlaylistSong) => void
  onDelete?: (item: PlaylistSong) => void
}

export function Playlist({ songs, onPlayClick, onLikeToggle, onDelete }: PlaylistProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const closeDelete = useCallback(() => setDeletingId(null), [])

  return (
    <S.List>
      {songs.map((item) => (
        <PlaylistItem
          key={item.id}
          item={item}
          isDeleteOpen={deletingId === item.id}
          onLongPress={onDelete && item.deletable ? () => setDeletingId(item.id) : undefined}
          onCloseDelete={closeDelete}
          onConfirmDelete={() => {
            closeDelete()
            onDelete?.(item)
          }}
          onPlayClick={onPlayClick}
          onLikeToggle={onLikeToggle}
        />
      ))}
    </S.List>
  )
}

type PlaylistItemProps = {
  item: PlaylistSong
  isDeleteOpen: boolean
  onLongPress?: () => void
  onCloseDelete: () => void
  onConfirmDelete: () => void
  onPlayClick?: (item: PlaylistSong) => void
  onLikeToggle?: (item: PlaylistSong) => void
}

function PlaylistItem({
  item,
  isDeleteOpen,
  onLongPress,
  onCloseDelete,
  onConfirmDelete,
  onPlayClick,
  onLikeToggle,
}: PlaylistItemProps) {
  const itemRef = useRef<HTMLLIElement>(null)
  const longPressHandlers = useLongPress(() => onLongPress?.(), Boolean(onLongPress))
  const { song, liked } = item

  return (
    <S.Item ref={itemRef} $pressable={Boolean(onLongPress)} {...longPressHandlers}>
      <S.Pill>
        <S.Song>
          <CoverImage src={song.albumImageUrl} />
          <span>
            {song.title} - {song.artist}
          </span>
        </S.Song>
        {onLikeToggle && (
          <LikeButton liked={liked} tone="lavender" size={16} onToggle={() => onLikeToggle(item)} />
        )}
      </S.Pill>
      <S.PlayButton
        type="button"
        aria-label={`${song.title} 재생`}
        onClick={() => onPlayClick?.(item)}
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
