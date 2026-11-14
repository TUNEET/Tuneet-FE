import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { logout } from '@/apis/auth'
import { getApiError } from '@/apis/error'
import {
  addProfile,
  checkNicknameAvailability,
  getMyProfile,
  replaceArtists,
  replaceGenres,
  updateProfileMusic,
} from '@/apis/user'
import settingIcon from '@/assets/icons/setting.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { ProfileComplete } from '@/components/common/ProfileComplete/ProfileComplete'
import { GENRE_NAMES } from '@/constants/genres'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { MyProfileResponse } from '@/types/auth'
import type { ProfileArtist, ProfileMusic } from '@/types/music'
import { clearTokens } from '@/utils/auth'
import { BlockedUsers } from './components/BlockedUsers/BlockedUsers'
import { ProfileEditModal } from './components/ProfileEditModal/ProfileEditModal'
import { DEFAULT_SETTINGS } from './components/SettingsPanel/settings'
import { SettingsPanel } from './components/SettingsPanel/SettingsPanel'
import * as S from './MyPage.styles'

const NICKNAME_DUPLICATED_MESSAGE = '중복된 닉네임입니다. 다른 닉네임을 입력해 주세요.'
const ARTIST_MIN = 3
const ARTIST_MAX = 20

const getArtistKey = ({ id, name }: ProfileArtist) => id ?? name

export function MyPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [profile, setProfile] = useState<MyProfileResponse | null>(null)
  const [nickname, setNickname] = useState('')
  const [draftNickname, setDraftNickname] = useState(nickname)
  const [genres, setGenres] = useState<string[]>([])
  const [draftGenres, setDraftGenres] = useState(genres)
  const [artists, setArtists] = useState<ProfileArtist[]>([])
  const [draftArtists, setDraftArtists] = useState(artists)
  const [song, setSong] = useState<ProfileMusic | null>(null)
  const [draftSong, setDraftSong] = useState(song)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isTasteOpen, setIsTasteOpen] = useState(false)
  const [isSavedOpen, setIsSavedOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<'delete' | 'logout' | null>(null)
  const [subView, setSubView] = useState<'blocked' | 'settings' | null>(null)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const logoutButtonRef = useRef<HTMLButtonElement>(null)

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    let isStale = false

    getMyProfile()
      .then((data) => {
        if (isStale) return
        setProfile(data)
        setNickname(data.nickname ?? '')
        setGenres(data.genres.map(({ displayName }) => displayName))
        setSong(
          data.profileMusic && {
            musicId: data.profileMusic.musicId,
            title: data.profileMusic.title,
            artist: data.profileMusic.artist,
            albumImage: data.profileMusic.musicPicture ?? '',
          },
        )
        setArtists(
          data.favoriteArtists.map(({ artistId, name, artistImage }) => ({
            id: artistId,
            name,
            image: artistImage,
          })),
        )
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [showToast])

  // 프로필 카드의 노래는 프로필 음악
  const shownSong = isEditing ? draftSong : song
  const songs = shownSong ? [shownSong] : []

  const closeConfirm = () => setConfirmType(null)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      await logout()
    } catch {
      // 서버 요청이 실패해도 이 기기에서는 로그아웃한다
    }

    clearTokens()
    navigate(ROUTES.onboarding, { replace: true })
  }

  const toggleConfirm = (type: 'delete' | 'logout') => {
    setConfirmType((current) => (current === type ? null : type))
  }

  const startEditing = () => {
    closeConfirm()
    setDraftNickname(nickname)
    setDraftGenres(genres)
    setDraftArtists(artists)
    setDraftSong(song)
    setIsEditing(true)
  }

  const saveProfile = async () => {
    if (isSavingProfile) return

    const trimmedNickname = draftNickname.trim()
    if (!trimmedNickname) {
      showToast('닉네임을 입력해 주세요.')
      return
    }
    if (draftGenres.length === 0) {
      showToast('장르는 1개 이상 선택해 주세요.')
      return
    }
    if (draftArtists.length < ARTIST_MIN || draftArtists.length > ARTIST_MAX) {
      showToast(`아티스트는 ${ARTIST_MIN}~${ARTIST_MAX}팀 선택해 주세요.`)
      return
    }

    const isNicknameChanged = trimmedNickname !== nickname
    const isGenresChanged =
      draftGenres.length !== genres.length || draftGenres.some((genre) => !genres.includes(genre))
    const artistKeys = artists.map(getArtistKey)
    const isArtistsChanged =
      draftArtists.length !== artists.length ||
      draftArtists.some((artist) => !artistKeys.includes(getArtistKey(artist)))
    const draftSongId = draftSong?.musicId
    const isSongChanged = !!draftSongId && draftSongId !== song?.musicId

    setIsSavingProfile(true)
    try {
      if (isNicknameChanged) {
        if (!(await checkNicknameAvailability(trimmedNickname))) {
          showToast(NICKNAME_DUPLICATED_MESSAGE)
          return
        }
        await addProfile({
          nickname: trimmedNickname,
          profilePicture: profile?.profilePicture ?? undefined,
        })
      }
      if (isGenresChanged) {
        await replaceGenres(draftGenres.map((genre) => GENRE_NAMES[genre] ?? genre))
      }
      if (isSongChanged) {
        await updateProfileMusic(draftSongId)
      }
      if (isArtistsChanged) {
        await replaceArtists(draftArtists.flatMap(({ id }) => (id ? [id] : [])))
      }

      setNickname(trimmedNickname)
      setDraftNickname(trimmedNickname)
      setGenres(draftGenres)
      setArtists(draftArtists)
      setSong(draftSong)
      setIsSavedOpen(true)
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsSavingProfile(false)
    }
  }

  const goToProfile = () => {
    setIsSavedOpen(false)
    setIsEditing(false)
  }

  const addArtist = (artist: ProfileArtist) => {
    setDraftArtists((current) =>
      current.some((item) => getArtistKey(item) === getArtistKey(artist))
        ? current
        : [...current, artist],
    )
  }

  const removeArtist = (artist: ProfileArtist) => {
    setDraftArtists((current) =>
      current.filter((item) => getArtistKey(item) !== getArtistKey(artist)),
    )
  }

  const toggleGenre = (genre: string) => {
    setDraftGenres((current) =>
      current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre],
    )
  }

  const glows = (
    <S.Glows aria-hidden>
      <S.Blob />
      <S.Glow $size="35.9rem" $top="14.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
      <S.Glow $size="23rem" $top="21.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
      <S.Glow $size="12.4rem" $top="22.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
    </S.Glows>
  )

  const settingButton = (
    <S.SettingButton
      type="button"
      aria-label="설정"
      onClick={() => {
        setIsEditing(false)
        closeConfirm()
        setSubView('settings')
      }}
    >
      <img src={settingIcon} alt="" width={22} height={22} />
    </S.SettingButton>
  )

  if (subView) {
    const exitSubView = () => setSubView(null)

    return (
      <S.Page>
        {glows}
        <S.Greeting>오늘도 새로운 음악을 만나보세요!</S.Greeting>
        {settingButton}
        {subView === 'blocked' ? (
          <BlockedUsers onExit={exitSubView} />
        ) : (
          <SettingsPanel settings={settings} onSave={setSettings} onExit={exitSubView} />
        )}
      </S.Page>
    )
  }

  return (
    <S.Page>
      {glows}

      <S.ProfileArea>
        <ProfileComplete
          nickname={isEditing ? draftNickname : nickname}
          previewUrl={profile?.profilePicture ?? null}
          songs={songs}
          genres={isEditing ? draftGenres : genres}
          artists={isEditing ? draftArtists : artists}
          frame="plain"
          isEditing={isEditing}
          onNicknameChange={setDraftNickname}
          onTagsClick={isEditing ? () => setIsTasteOpen(true) : undefined}
        >
          <S.Actions>
            {isEditing ? (
              <>
                <S.FilledButton
                  ref={saveButtonRef}
                  type="button"
                  disabled={isSavingProfile}
                  onClick={saveProfile}
                >
                  저장하기
                </S.FilledButton>
                <ConfirmPopover
                  open={isSavedOpen}
                  message="수정사항이 저장되었습니다."
                  confirmLabel="내 프로필로 이동"
                  onConfirm={goToProfile}
                  onClose={() => setIsSavedOpen(false)}
                  anchorRef={saveButtonRef}
                  surface="sheet"
                  placement="top"
                  tone="default"
                />
              </>
            ) : (
              <>
                <S.OutlineButton
                  ref={deleteButtonRef}
                  type="button"
                  aria-expanded={confirmType === 'delete'}
                  onClick={() => toggleConfirm('delete')}
                >
                  계정 삭제
                </S.OutlineButton>
                <S.FilledButton
                  ref={logoutButtonRef}
                  type="button"
                  aria-expanded={confirmType === 'logout'}
                  onClick={() => toggleConfirm('logout')}
                >
                  로그아웃
                </S.FilledButton>
                <ConfirmPopover
                  open={confirmType === 'delete'}
                  message="계정을 삭제하시겠어요?"
                  confirmLabel="계정 삭제"
                  onConfirm={closeConfirm}
                  onClose={closeConfirm}
                  anchorRef={deleteButtonRef}
                  surface="dim"
                  placement="top"
                />
                <ConfirmPopover
                  open={confirmType === 'logout'}
                  message="로그아웃하시겠어요?"
                  confirmLabel="로그아웃"
                  onConfirm={handleLogout}
                  onClose={closeConfirm}
                  anchorRef={logoutButtonRef}
                  surface="dim"
                  placement="top"
                  tone="default"
                />
              </>
            )}
          </S.Actions>
          {!isEditing && (
            <S.BlockedHeader>
              <S.ProfileTitle>차단한 사용자</S.ProfileTitle>
              <S.HeaderAction type="button" onClick={() => setSubView('blocked')}>
                더보기
              </S.HeaderAction>
            </S.BlockedHeader>
          )}
        </ProfileComplete>
      </S.ProfileArea>

      <S.TopArea>
        <S.Greeting>오늘도 새로운 음악을 만나보세요!</S.Greeting>
        {settingButton}
        <S.Divider />
        <S.ProfileHeader>
          <S.ProfileTitle>내 프로필</S.ProfileTitle>
          <S.HeaderAction
            type="button"
            onClick={isEditing ? () => setIsEditing(false) : startEditing}
          >
            {isEditing ? '나가기' : '수정하기'}
          </S.HeaderAction>
        </S.ProfileHeader>
      </S.TopArea>

      {isTasteOpen && (
        <ProfileEditModal
          selectedSong={draftSong}
          onSelectSong={setDraftSong}
          selectedGenres={draftGenres}
          onToggleGenre={toggleGenre}
          selectedArtists={draftArtists}
          onAddArtist={addArtist}
          onRemoveArtist={removeArtist}
          onClose={() => setIsTasteOpen(false)}
        />
      )}
    </S.Page>
  )
}
