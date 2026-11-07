import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'
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
import logo from '@/assets/images/logo.svg'
import { ROUTES } from '@/constants/routes'
import { SongSearchSheet } from '@/pages/matching/room/playlist/components/SongSearchSheet/SongSearchSheet'
import { clearProfileSetupPending, isProfileSetupPending } from '@/utils/auth'
import { PlatformConnect } from './components/PlatformConnect/PlatformConnect'
import { ProfileComplete } from './components/ProfileComplete/ProfileComplete'
import { SongSelect } from './components/SongSelect/SongSelect'
import { TasteSelect } from './components/TasteSelect/TasteSelect'
import { MOCK_PROFILE_MUSIC } from './mocks'
import type { ProfileArtist } from './mocks'
import * as S from './ProfileSetupPage.styles'

const MIN_ARTIST_COUNT = 3

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

export function ProfileSetupPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<
    'profile' | 'music' | 'platform' | 'taste' | 'song' | 'complete'
  >('profile')
  const [nickname, setNickname] = useState('')
  const [music, setMusic] = useState<typeof MOCK_PROFILE_MUSIC | null>(null)
  const [isMusicSearchOpen, setIsMusicSearchOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedArtists, setSelectedArtists] = useState<ProfileArtist[]>([])
  const [songs, setSongs] = useState<(typeof MOCK_PROFILE_MUSIC)[]>([])

  useEffect(() => {
    if (!previewUrl) return

    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  if (!isProfileSetupPending()) {
    return <Navigate to={ROUTES.home} replace />
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const toggleGenre = (genre: string) => {
    setSelectedGenres((genres) =>
      genres.includes(genre) ? genres.filter((item) => item !== genre) : [...genres, genre],
    )
  }

  const addArtist = ({ name, image }: ProfileArtist) => {
    setSelectedArtists((artists) =>
      artists.some((artist) => artist.name === name) ? artists : [...artists, { name, image }],
    )
  }

  const addSong = (song: typeof MOCK_PROFILE_MUSIC) => {
    setSongs((prevSongs) =>
      prevSongs.some(({ title, artist }) => title === song.title && artist === song.artist)
        ? prevSongs
        : [...prevSongs, song],
    )
  }

  const finishSetup = () => {
    clearProfileSetupPending()
    navigate(ROUTES.home, { replace: true })
  }

  const isMusicStep = step === 'music'

  const avatarImage = previewUrl ? (
    <S.AvatarPreview src={previewUrl} alt="" />
  ) : (
    <S.AvatarCharacter src={characterImage} alt="" />
  )

  if (step === 'complete') {
    return (
      <S.Page>
        <S.Blob aria-hidden />
        <S.BackButton type="button" aria-label="뒤로가기" onClick={() => setStep('song')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="M7 1 1 7l6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.BackButton>
        <S.Logo src={logo} alt="TUNEET" />
        <S.Heading>프로필이 완성되었어요!</S.Heading>
        <S.PlatformDescription>나만의 음악으로 TUNEET을 시작해 보세요.</S.PlatformDescription>
        <ProfileComplete
          nickname={nickname}
          previewUrl={previewUrl}
          songs={songs}
          genres={selectedGenres}
          artists={selectedArtists}
          onStart={finishSetup}
        />
      </S.Page>
    )
  }

  if (step === 'song') {
    return (
      <S.Page>
        <S.Blob aria-hidden />
        <S.BackButton type="button" aria-label="뒤로가기" onClick={() => setStep('taste')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="M7 1 1 7l6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.BackButton>
        <S.Logo src={logo} alt="TUNEET" />
        <S.Heading>좋아하는 노래를 들려주세요!</S.Heading>
        <S.PlatformDescription>나를 표현하는 노래를 1개 이상 선택해 주세요.</S.PlatformDescription>
        <SongSelect songs={songs} onAddSong={addSong} />
        <S.TasteNextButton
          type="button"
          aria-label="다음"
          disabled={songs.length === 0}
          onClick={() => setStep('complete')}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="m1 1 6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.TasteNextButton>
      </S.Page>
    )
  }

  if (step === 'taste') {
    return (
      <S.Page>
        <S.Blob aria-hidden />
        <S.BackButton type="button" aria-label="뒤로가기" onClick={() => setStep('platform')}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="M7 1 1 7l6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.BackButton>
        <S.Logo src={logo} alt="TUNEET" />
        <S.Heading>취향을 알려주세요!</S.Heading>
        <S.PlatformDescription>
          선호하는 장르 1개 이상,
          <br />
          아티스트 3팀 이상을 선택해 주세요.
        </S.PlatformDescription>
        <TasteSelect
          selectedGenres={selectedGenres}
          onToggleGenre={toggleGenre}
          selectedArtists={selectedArtists}
          onAddArtist={addArtist}
        />
        <S.TasteNextButton
          type="button"
          aria-label="다음"
          disabled={selectedGenres.length === 0 || selectedArtists.length < MIN_ARTIST_COUNT}
          onClick={() => setStep('song')}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="m1 1 6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.TasteNextButton>
      </S.Page>
    )
  }

  if (step === 'platform') {
    return (
      <S.Page>
        <S.Blob aria-hidden />
        <S.Logo src={logo} alt="TUNEET" />
        <S.Heading>나의 음악을 연결해 볼까요?</S.Heading>
        <S.PlatformDescription>
          자주 사용하는 음원 플랫폼을 연동해
          <br />
          음악 취향을 연결해 보세요.
        </S.PlatformDescription>
        <PlatformConnect
          nickname={nickname}
          previewUrl={previewUrl}
          music={music}
          onNext={() => setStep('taste')}
        />
        <S.LaterButton type="button" onClick={finishSetup}>
          나중에 설정하기
        </S.LaterButton>
      </S.Page>
    )
  }

  return (
    <S.Page>
      <S.Blob aria-hidden />
      <S.Logo src={logo} alt="TUNEET" />
      <S.Heading>{isMusicStep ? '나를 닮은 음악은?' : '당신은 어떤 사람인가요?'}</S.Heading>
      <S.SetupDescription>
        {isMusicStep
          ? '나를 가장 잘 표현하는 음악을 선택해 보세요.'
          : '나를 표현할 닉네임과 프로필 사진을 정해 주세요.'}
      </S.SetupDescription>

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
              onChange={(event) => setNickname(event.target.value)}
            />
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
        <S.PrevButton
          type="button"
          aria-label="이전"
          disabled={!isMusicStep}
          onClick={() => setStep('profile')}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="M7 1 1 7l6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.PrevButton>
        <S.NextButton
          type="button"
          aria-label="다음"
          onClick={() => setStep(isMusicStep ? 'platform' : 'music')}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden>
            <path d="m1 1 6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </S.NextButton>
      </S.StepButtons>

      <S.LaterButton type="button" onClick={finishSetup}>
        나중에 설정하기
      </S.LaterButton>

      {isMusicSearchOpen && (
        <SongSearchSheet
          variant="profile"
          onAdd={({ title, artist, albumImageUrl }) =>
            setMusic({ title, artist, albumImage: albumImageUrl })
          }
          onClose={() => setIsMusicSearchOpen(false)}
        />
      )}
    </S.Page>
  )
}
