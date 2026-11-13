import type { KeyboardEvent, ReactNode } from 'react'
import editIcon from '@/assets/icons/edit-outline.svg'
import boltLargeIcon from '@/assets/icons/fa6-solid_bolt-lightning-1.svg'
import boltSmallIcon from '@/assets/icons/fa6-solid_bolt-lightning.svg'
import musicLargeIcon from '@/assets/icons/flowbite_music-alt-solid-1.svg'
import musicSmallIcon from '@/assets/icons/flowbite_music-alt-solid.svg'
import clefLargeIcon from '@/assets/icons/lucide_clef-treble-1.svg'
import clefSmallIcon from '@/assets/icons/lucide_clef-treble.svg'
import musicNoteIcon from '@/assets/icons/music-note.svg'
import noteSmallIcon from '@/assets/icons/nrk_music-note-solid-expressive-1.svg'
import noteLargeIcon from '@/assets/icons/nrk_music-note-solid-expressive.svg'
import waveformLargeIcon from '@/assets/icons/withicons_audio-waveform-duo-1.svg'
import waveformSmallIcon from '@/assets/icons/withicons_audio-waveform-duo.svg'
import characterImage from '@/assets/images/character-profile.png'
import { MOCK_PROFILE_ARTISTS } from '@/mocks/profile'
import { SongChip as Song, SongNote } from '@/styles/song'
import { ChevronIcon } from '@/components/common/ChevronIcon/ChevronIcon'
import * as S from './ProfileComplete.styles'

const RAYS = [
  { angle: 0.5, spread: 25 },
  { angle: 25.25, spread: 9.5 },
  { angle: 44.5, spread: 25 },
  { angle: 89.5, spread: 25 },
  { angle: 107.5, spread: 9 },
  { angle: 135.5, spread: 25 },
  { angle: 180, spread: 26 },
  { angle: 205, spread: 11 },
  { angle: 226, spread: 25 },
  { angle: 270.5, spread: 25 },
  { angle: 314.75, spread: 24.5 },
  { angle: 333.25, spread: 6.5 },
]

const DECORATIONS = [
  { src: musicSmallIcon, width: 31.8, height: 31.8, left: 251.88, top: 432, rotate: 0 },
  { src: musicLargeIcon, width: 51.4, height: 51.4, left: 70, top: 380.94, rotate: 0 },
  { src: noteLargeIcon, width: 42.8, height: 42.8, left: 229, top: 316.24, rotate: 0 },
  { src: noteSmallIcon, width: 33, height: 33, left: 116.97, top: 309.87, rotate: -23 },
  { src: clefSmallIcon, width: 33, height: 33, left: 223, top: 448, rotate: 0 },
  { src: clefLargeIcon, width: 52.6, height: 52.6, left: 98, top: 340, rotate: 0 },
  { src: waveformSmallIcon, width: 29.4, height: 29.4, left: 113.67, top: 411.67, rotate: 11 },
  { src: waveformLargeIcon, width: 50.2, height: 50.2, left: 257.77, top: 383.78, rotate: -4 },
  { src: boltSmallIcon, width: 18.35, height: 20.8, left: 119.12, top: 453.75, rotate: 0 },
  { src: boltLargeIcon, width: 26.9, height: 30.6, left: 265, top: 353.27, rotate: 0 },
  { src: boltLargeIcon, width: 18.77, height: 21.33, left: 178.39, top: 319.8, rotate: 2 },
]

type ProfileCompleteProps = {
  nickname: string
  previewUrl: string | null
  songs: { title: string; artist: string; albumImage: string }[]
  genres: string[]
  artists?: { name: string; image?: string | null }[]
  frame?: 'image' | 'plain'
  isEditing?: boolean
  onNicknameChange?: (nickname: string) => void
  onTagsClick?: () => void
  onStart?: () => void
  children?: ReactNode
}

export function ProfileComplete({
  nickname,
  previewUrl,
  songs,
  genres,
  artists = MOCK_PROFILE_ARTISTS,
  frame = 'image',
  isEditing = false,
  onNicknameChange,
  onTagsClick,
  onStart,
  children,
}: ProfileCompleteProps) {
  const tagsButtonProps = onTagsClick && {
    role: 'button',
    tabIndex: 0,
    'aria-label': '노래, 아티스트, 장르 수정',
    onClick: onTagsClick,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onTagsClick()
      }
    },
  }

  const avatarImage = previewUrl ? (
    <S.AvatarPreview src={previewUrl} alt="" />
  ) : (
    <S.AvatarCharacter src={characterImage} alt="" />
  )

  return (
    <S.Stage>
      <S.Card>
        {frame === 'plain' ? <S.PlainFrame aria-hidden /> : <S.Frame aria-hidden />}
        <S.Tags $clickable={!!onTagsClick} {...tagsButtonProps}>
          {songs.map(({ title, artist, albumImage }) => (
            <Song as="div" key={`${title}-${artist}`}>
              <img src={albumImage} alt="" width={12} height={12} />
              <span>
                {title} - {artist}
              </span>
              <SongNote src={musicNoteIcon} alt="" />
            </Song>
          ))}
          <S.TagRow>
            {artists.map(({ name, image }) => (
              <S.ArtistTag key={name}>
                {image ? <img src={image} alt="" width={12} height={12} /> : <S.ArtistFallback />}
                {name}
              </S.ArtistTag>
            ))}
          </S.TagRow>
          <S.TagRow>
            {genres.map((genre) => (
              <S.GenreTag key={genre}>{genre}</S.GenreTag>
            ))}
          </S.TagRow>
        </S.Tags>
      </S.Card>
      {onStart && (
        <S.StartButton type="button" onClick={onStart}>
          TUNEET 시작하기
          <ChevronIcon direction="right" />
        </S.StartButton>
      )}
      {children}
      <S.Glow aria-hidden />
      {RAYS.map(({ angle, spread }) => (
        <S.Ray key={angle} aria-hidden $angle={angle} $spread={spread} />
      ))}
      {isEditing ? (
        <>
          <S.NicknameInput
            type="text"
            aria-label="닉네임"
            value={nickname}
            onChange={(event) => onNicknameChange?.(event.target.value)}
          />
          <S.AvatarButton type="button" aria-label="프로필 사진 변경">
            {avatarImage}
            <S.AvatarOverlay />
            <S.AvatarIcon src={editIcon} alt="" />
          </S.AvatarButton>
        </>
      ) : (
        <>
          <S.Nickname>{nickname}</S.Nickname>
          <S.Avatar>{avatarImage}</S.Avatar>
        </>
      )}
      {DECORATIONS.map(({ src, width, height, left, top, rotate }) => (
        <S.Decoration
          key={`${left}-${top}`}
          src={src}
          alt=""
          $width={width}
          $height={height}
          $left={left}
          $top={top}
          $rotate={rotate}
        />
      ))}
    </S.Stage>
  )
}
