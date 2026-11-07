import playCircleIcon from '@/assets/icons/play-circle.svg'
import type { PlaylistSong } from '@/types/room'
import * as S from './Playlist.styles'

type PlaylistProps = {
  songs: PlaylistSong[]
  onPlayClick?: (song: PlaylistSong) => void
}

export function Playlist({ songs, onPlayClick }: PlaylistProps) {
  return (
    <S.List>
      {songs.map((song) => (
        <S.Item key={song.id}>
          <S.Song>
            <img src={song.albumImageUrl} alt="" />
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
        </S.Item>
      ))}
    </S.List>
  )
}
