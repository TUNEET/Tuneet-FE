import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import heartImage from '@/assets/icons/back-H.svg'
import editIcon from '@/assets/icons/edit-outline.svg'
import musicEditIcon from '@/assets/icons/eva_edit-outline.svg'
import boltLargeIcon from '@/assets/icons/fa6-solid_bolt-lightning-1.svg'
import boltSmallIcon from '@/assets/icons/fa6-solid_bolt-lightning.svg'
import musicLargeIcon from '@/assets/icons/flowbite_music-alt-solid-1.svg'
import musicSmallIcon from '@/assets/icons/flowbite_music-alt-solid.svg'
import clefLargeIcon from '@/assets/icons/lucide_clef-treble-1.svg'
import clefSmallIcon from '@/assets/icons/lucide_clef-treble.svg'
import noteSmallIcon from '@/assets/icons/nrk_music-note-solid-expressive-1.svg'
import noteLargeIcon from '@/assets/icons/nrk_music-note-solid-expressive.svg'
import waveformLargeIcon from '@/assets/icons/withicons_audio-waveform-duo-1.svg'
import waveformSmallIcon from '@/assets/icons/withicons_audio-waveform-duo.svg'
import characterImage from '@/assets/images/character-profile.png'
import { ChevronIcon } from '@/components/common/ChevronIcon/ChevronIcon'
import { SongSearchSheet } from '@/components/common/SongSearchSheet/SongSearchSheet'
import type { MOCK_PROFILE_MUSIC } from '@/mocks/profile'
import * as S from './ProfileStage.styles'

type ProfileMusic = typeof MOCK_PROFILE_MUSIC

const DECORATIONS = [
  { src: musicSmallIcon, width: '3.18rem', height: '3.18rem', left: '28.088rem', top: '36.7rem' },
  { src: musicLargeIcon, width: '5.14rem', height: '5.14rem', left: '1.7rem', top: '40.194rem' },
  { src: noteLargeIcon, width: '4.28rem', height: '4.28rem', left: '31.4rem', top: '32.524rem' },
  { src: noteSmallIcon, width: '3.3rem', height: '3.3rem', left: '3.906rem', top: '33.7rem' },
  { src: clefSmallIcon, width: '3.3rem', height: '3.3rem', left: '32rem', top: '48.3rem' },
  { src: clefLargeIcon, width: '5.26rem', height: '5.26rem', left: '7.7rem', top: '35.6rem' },
  { src: waveformSmallIcon, width: '2.94rem', height: '2.94rem', left: '9.2rem', top: '44.4rem' },
  { src: waveformLargeIcon, width: '5.02rem', height: '5.02rem', left: '27rem', top: '42.4rem' },
  { src: boltSmallIcon, width: '1.835rem', height: '2.08rem', left: '5.712rem', top: '48.375rem' },
  { src: boltLargeIcon, width: '2.69rem', height: '3.06rem', left: '33.9rem', top: '39.627rem' },
]

type ProfileStageProps = {
  /** profile: 닉네임·사진 입력, music: 프로필 음악 선택 */
  step: 'profile' | 'music'
  nickname: string
  onNicknameChange: (nickname: string) => void
  nicknameError?: string | null
  previewUrl: string | null
  onImageSelect: (file: File) => void
  music: ProfileMusic | null
  onMusicChange: (music: ProfileMusic) => void
  onPrev: () => void
  onNext: () => void
  onLater: () => void
}

/** 프로필 설정 1·2단계: 하트 배경 위 아바타와 닉네임/프로필 음악 입력 */
export function ProfileStage({
  step,
  nickname,
  onNicknameChange,
  nicknameError,
  previewUrl,
  onImageSelect,
  music,
  onMusicChange,
  onPrev,
  onNext,
  onLater,
}: ProfileStageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isMusicSearchOpen, setIsMusicSearchOpen] = useState(false)
  const isMusicStep = step === 'music'

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) onImageSelect(file)
  }

  const avatarImage = previewUrl ? (
    <S.AvatarPreview src={previewUrl} alt="" />
  ) : (
    <S.AvatarCharacter src={characterImage} alt="" />
  )

  return (
    <>
      <S.Stage>
        {isMusicStep ? (
          <>
            <S.AvatarGlow $color="#ffc2e5" aria-hidden />
            {music ? (
              <>
                <S.SelectedMusicButton type="button">
                  <img src={music.albumImage} alt="" width={17} height={17} />
                  <span>
                    {music.title} - {music.artist}
                  </span>
                </S.SelectedMusicButton>
                <S.MusicEditButton
                  type="button"
                  aria-label="프로필 음악 수정"
                  onClick={() => setIsMusicSearchOpen(true)}
                >
                  <img src={musicEditIcon} alt="" width={20} height={20} />
                </S.MusicEditButton>
              </>
            ) : (
              <S.MusicButton type="button" onClick={() => setIsMusicSearchOpen(true)}>
                프로필 음악 추가하기
              </S.MusicButton>
            )}
            <S.Avatar>{avatarImage}</S.Avatar>
          </>
        ) : (
          <>
            <S.AvatarGlow aria-hidden />
            <S.NicknameInput
              type="text"
              name="nickname"
              placeholder="닉네임을 입력하세요."
              aria-label="닉네임"
              autoComplete="nickname"
              value={nickname}
              aria-invalid={Boolean(nicknameError)}
              aria-describedby={nicknameError ? 'nickname-error' : undefined}
              onChange={(event) => onNicknameChange(event.target.value)}
            />
            {nicknameError && (
              <S.NicknameError id="nickname-error" role="alert">
                {nicknameError}
              </S.NicknameError>
            )}
            <S.AvatarButton
              type="button"
              aria-label="프로필 사진 선택"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarImage}
              <S.AvatarOverlay />
              <S.AvatarIcon src={editIcon} alt="" />
            </S.AvatarButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </>
        )}
        <S.Heart src={heartImage} alt="" />
        {DECORATIONS.map(({ src, width, height, left, top }) => (
          <S.Decoration
            key={src}
            src={src}
            alt=""
            $width={width}
            $height={height}
            $left={left}
            $top={top}
          />
        ))}
        {isMusicStep && <S.Nickname>{nickname}</S.Nickname>}
      </S.Stage>

      <S.StepButtons>
        <S.PrevButton type="button" aria-label="이전" disabled={!isMusicStep} onClick={onPrev}>
          <ChevronIcon direction="left" />
        </S.PrevButton>
        <S.NextButton type="button" aria-label="다음" onClick={onNext}>
          <ChevronIcon direction="right" />
        </S.NextButton>
      </S.StepButtons>

      <S.LaterButton type="button" onClick={onLater}>
        나중에 설정하기
      </S.LaterButton>

      {isMusicSearchOpen && (
        <SongSearchSheet
          variant="profile"
          onAdd={({ title, artist, albumImageUrl }) =>
            onMusicChange({ title, artist, albumImage: albumImageUrl })
          }
          onClose={() => setIsMusicSearchOpen(false)}
        />
      )}
    </>
  )
}
