import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { uploadImage } from '@/apis/image'
import { addProfile, checkNicknameAvailability } from '@/apis/user'
import { ChevronIcon } from '@/components/common/ChevronIcon/ChevronIcon'
import { ProfileComplete } from '@/components/common/ProfileComplete/ProfileComplete'
import { ROUTES } from '@/constants/routes'
import type { MOCK_PROFILE_MUSIC, ProfileArtist } from '@/mocks/profile'
import { clearProfileSetupPending, isProfileSetupPending } from '@/utils/auth'
import { PlatformConnect } from './components/PlatformConnect/PlatformConnect'
import { ProfileStage } from './components/ProfileStage/ProfileStage'
import { SetupStepLayout } from './components/SetupStepLayout/SetupStepLayout'
import { SongSelect } from './components/SongSelect/SongSelect'
import { TasteSelect } from './components/TasteSelect/TasteSelect'
import * as S from './ProfileSetupPage.styles'

type ProfileMusic = typeof MOCK_PROFILE_MUSIC
type SetupStep = 'profile' | 'music' | 'platform' | 'taste' | 'song' | 'complete'

const NICKNAME_ERROR_MESSAGES = {
  empty: '닉네임을 입력해 주세요.',
  duplicated: '중복된 닉네임입니다. 다른 닉네임을 입력해 주세요.',
} as const

/** 서버에 마지막으로 저장한 닉네임·사진 (같은 값으로 다시 넘어갈 때 저장 생략) */
type SavedProfile = { nickname: string; imageFile: File | null }

export function ProfileSetupPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<SetupStep>('profile')
  const [nickname, setNickname] = useState('')
  const [nicknameError, setNicknameError] = useState<string | null>(null)
  const [music, setMusic] = useState<ProfileMusic | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [savedProfile, setSavedProfile] = useState<SavedProfile | null>(null)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedArtists, setSelectedArtists] = useState<ProfileArtist[]>([])
  const [songs, setSongs] = useState<ProfileMusic[]>([])

  useEffect(() => {
    if (!previewUrl) return

    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  if (!isProfileSetupPending()) {
    return <Navigate to={ROUTES.home} replace />
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

  const removeArtist = (name: string) => {
    setSelectedArtists((artists) => artists.filter((artist) => artist.name !== name))
  }

  const addSong = (song: ProfileMusic) => {
    setSongs((prevSongs) =>
      prevSongs.some(({ title, artist }) => title === song.title && artist === song.artist)
        ? prevSongs
        : [...prevSongs, song],
    )
  }

  const changeNickname = (value: string) => {
    setNickname(value)
    setNicknameError(null)
  }

  const selectImage = (file: File) => {
    setImageFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const submitNickname = async () => {
    if (isSavingProfile) return

    const trimmedNickname = nickname.trim()
    if (!trimmedNickname) {
      setNicknameError(NICKNAME_ERROR_MESSAGES.empty)
      return
    }

    const isNicknameChanged = savedProfile?.nickname !== trimmedNickname
    const isImageChanged = savedProfile?.imageFile !== imageFile

    if (!isNicknameChanged && !isImageChanged) {
      setStep('music')
      return
    }

    setIsSavingProfile(true)
    try {
      // 이미 저장한 내 닉네임은 중복으로 나오므로 바뀌었을 때만 확인
      if (isNicknameChanged && !(await checkNicknameAvailability(trimmedNickname))) {
        setNicknameError(NICKNAME_ERROR_MESSAGES.duplicated)
        return
      }

      const profilePicture = imageFile ? await uploadImage(imageFile, 'PROFILE') : undefined
      await addProfile({ nickname: trimmedNickname, profilePicture })

      setSavedProfile({ nickname: trimmedNickname, imageFile })
      setNickname(trimmedNickname)
      setStep('music')
    } catch (error) {
      const { message, fields } = getApiError(error)
      setNicknameError(fields.nickname ?? message)
    } finally {
      setIsSavingProfile(false)
    }
  }

  const removeSong = (song: ProfileMusic) => {
    setSongs((prevSongs) =>
      prevSongs.filter(({ title, artist }) => title !== song.title || artist !== song.artist),
    )
  }

  const finishSetup = () => {
    clearProfileSetupPending()
    navigate(ROUTES.home, { replace: true })
  }

  switch (step) {
    case 'complete':
      return (
        <SetupStepLayout
          title="프로필이 완성되었어요!"
          description="나만의 음악으로 TUNEET을 시작해 보세요."
          onBack={() => setStep('song')}
        >
          <ProfileComplete
            nickname={nickname}
            previewUrl={previewUrl}
            songs={songs}
            genres={selectedGenres}
            artists={selectedArtists}
            onStart={finishSetup}
          />
        </SetupStepLayout>
      )

    case 'song':
      return (
        <SetupStepLayout
          title="좋아하는 노래를 들려주세요!"
          description="나를 표현하는 노래를 1개 이상 선택해 주세요."
          onBack={() => setStep('taste')}
        >
          <SongSelect songs={songs} onAddSong={addSong} onRemoveSong={removeSong} />
          <S.TasteNextButton
            type="button"
            aria-label="다음"
            disabled={songs.length === 0}
            onClick={() => setStep('complete')}
          >
            <ChevronIcon direction="right" />
          </S.TasteNextButton>
        </SetupStepLayout>
      )

    case 'taste':
      return (
        <SetupStepLayout
          title="취향을 알려주세요!"
          description={
            <>
              선호하는 장르 1개 이상,
              <br />
              아티스트 3팀 이상을 선택해 주세요.
            </>
          }
          onBack={() => setStep('platform')}
        >
          <TasteSelect
            selectedGenres={selectedGenres}
            onToggleGenre={toggleGenre}
            selectedArtists={selectedArtists}
            onAddArtist={addArtist}
            onRemoveArtist={removeArtist}
          />
          <S.TasteNextButton type="button" aria-label="다음" onClick={() => setStep('song')}>
            <ChevronIcon direction="right" />
          </S.TasteNextButton>
        </SetupStepLayout>
      )

    case 'platform':
      return (
        <SetupStepLayout
          title="나의 음악을 연결해 볼까요?"
          description={
            <>
              자주 사용하는 음원 플랫폼을 연동해
              <br />
              음악 취향을 연결해 보세요.
            </>
          }
        >
          <PlatformConnect
            nickname={nickname}
            previewUrl={previewUrl}
            music={music}
            onNext={() => setStep('taste')}
          />
          <S.LaterButton type="button" onClick={finishSetup}>
            나중에 설정하기
          </S.LaterButton>
        </SetupStepLayout>
      )

    case 'profile':
    case 'music': {
      const isMusicStep = step === 'music'

      return (
        <SetupStepLayout
          title={isMusicStep ? '나를 닮은 음악은?' : '당신은 어떤 사람인가요?'}
          description={
            isMusicStep
              ? '나를 가장 잘 표현하는 음악을 선택해 보세요.'
              : '나를 표현할 닉네임과 프로필 사진을 정해 주세요.'
          }
          singleLineDescription
        >
          <ProfileStage
            step={step}
            nickname={nickname}
            onNicknameChange={changeNickname}
            nicknameError={nicknameError}
            previewUrl={previewUrl}
            onImageSelect={selectImage}
            music={music}
            onMusicChange={setMusic}
            onPrev={() => setStep('profile')}
            onNext={isMusicStep ? () => setStep('platform') : submitNickname}
            onLater={finishSetup}
          />
        </SetupStepLayout>
      )
    }
  }
}
