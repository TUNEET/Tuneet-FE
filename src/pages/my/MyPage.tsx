import { useRef, useState } from 'react'
import settingIcon from '@/assets/icons/setting.svg'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MOCK_PROFILE, MOCK_WRITE_SONG } from '@/mocks/data'
import { ProfileComplete } from '@/pages/profile-setup/components/ProfileComplete/ProfileComplete'
import { BlockedUsers } from './components/BlockedUsers/BlockedUsers'
import { ProfileEditModal } from './components/ProfileEditModal/ProfileEditModal'
import { DEFAULT_SETTINGS } from './components/SettingsPanel/settings'
import { SettingsPanel } from './components/SettingsPanel/SettingsPanel'
import * as S from './MyPage.styles'

const SONGS = [
  {
    title: MOCK_WRITE_SONG.title,
    artist: MOCK_WRITE_SONG.artist,
    albumImage: MOCK_WRITE_SONG.albumImageUrl,
  },
]

export function MyPage() {
  const [nickname, setNickname] = useState(MOCK_PROFILE.nickname)
  const [draftNickname, setDraftNickname] = useState(nickname)
  const [genres, setGenres] = useState(MOCK_PROFILE.genres)
  const [draftGenres, setDraftGenres] = useState(genres)
  const [isEditing, setIsEditing] = useState(false)
  const [isTasteOpen, setIsTasteOpen] = useState(false)
  const [isSavedOpen, setIsSavedOpen] = useState(false)
  const [confirmType, setConfirmType] = useState<'delete' | 'logout' | null>(null)
  const [subView, setSubView] = useState<'blocked' | 'settings' | null>(null)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const saveButtonRef = useRef<HTMLButtonElement>(null)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const logoutButtonRef = useRef<HTMLButtonElement>(null)

  const closeConfirm = () => setConfirmType(null)

  const toggleConfirm = (type: 'delete' | 'logout') => {
    setConfirmType((current) => (current === type ? null : type))
  }

  const startEditing = () => {
    closeConfirm()
    setDraftNickname(nickname)
    setDraftGenres(genres)
    setIsEditing(true)
  }

  const saveProfile = () => {
    setNickname(draftNickname)
    setGenres(draftGenres)
    setIsSavedOpen(true)
  }

  const goToProfile = () => {
    setIsSavedOpen(false)
    setIsEditing(false)
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
          previewUrl={null}
          songs={SONGS}
          genres={isEditing ? draftGenres : genres}
          frame="plain"
          isEditing={isEditing}
          onNicknameChange={setDraftNickname}
          onTagsClick={isEditing ? () => setIsTasteOpen(true) : undefined}
        >
          <S.Actions>
            {isEditing ? (
              <>
                <S.FilledButton ref={saveButtonRef} type="button" onClick={saveProfile}>
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
                  onConfirm={closeConfirm}
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
          selectedGenres={draftGenres}
          onToggleGenre={toggleGenre}
          onClose={() => setIsTasteOpen(false)}
        />
      )}
    </S.Page>
  )
}
