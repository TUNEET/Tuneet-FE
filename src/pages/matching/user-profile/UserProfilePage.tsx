import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApiError } from '@/apis/error'
import { blockUser, getUserProfile, unblockUser } from '@/apis/user'
import { Button } from '@/components/common/Button/Button'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Divider } from '@/components/common/Divider/Divider'
import { ProfileCard } from '@/components/common/ProfileCard/ProfileCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterWritePath } from '@/constants/routes'
import { useLetterQuota } from '@/hooks/useLetterQuota'
import { useToast } from '@/hooks/useToast'
import type { CommonTaste, OtherUserProfileResponse } from '@/types/user'
import { formatDistanceRange } from '@/utils/format'
import { toProfileCard } from '@/utils/profile'
import { CommonTasteSection } from './components/CommonTasteSection/CommonTasteSection'
import * as S from './UserProfilePage.styles'

const toCommonTaste = ({
  artists,
  music,
  genres,
}: OtherUserProfileResponse['common']): CommonTaste => ({
  artists: artists.map(({ name, artistImage }) => ({ name, imageUrl: artistImage })),
  songs: music
    ? [{ title: music.title, artist: music.artist, albumImageUrl: music.musicPicture }]
    : [],
  genres: genres.map(({ displayName }) => displayName),
})

export function UserProfilePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { userId } = useParams()
  const id = Number(userId)
  const isValidId = Number.isInteger(id) && id > 0
  const letterQuota = useLetterQuota()

  const [user, setUser] = useState<OtherUserProfileResponse | null | undefined>(undefined)
  const [isBlockOpen, setIsBlockOpen] = useState(false)
  const [isBlocking, setIsBlocking] = useState(false)
  const blockButtonRef = useRef<HTMLButtonElement>(null)
  const closeBlock = useCallback(() => setIsBlockOpen(false), [])
  const goBack = () => navigate(-1)

  useEffect(() => {
    if (!isValidId) return
    let isStale = false

    getUserProfile(id)
      .then((data) => {
        if (!isStale) setUser(data)
      })
      .catch((error) => {
        if (isStale) return
        setUser(null)
        showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [id, isValidId, showToast])

  if (isValidId && user === undefined) return <SheetPage>{null}</SheetPage>

  if (!user) {
    return (
      <SheetPage>
        <SectionHeader title="프로필" actionLabel="나가기" onActionClick={goBack} />
        <S.Empty>사용자를 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  const { isBlocked, similarity, distanceRange } = user
  // 유사도·거리는 값이 있을 때만 보여준다 (예: '92% / 3km 이내')
  const meta = [
    typeof similarity === 'number' && `${similarity}%`,
    distanceRange && formatDistanceRange(distanceRange),
  ]
    .filter(Boolean)
    .join(' / ')
  // 차단했거나, 상대가 편지 받기를 꺼 두었거나, 오늘 편지를 다 썼으면 보낼 수 없다
  const canSendLetter = !isBlocked && user.letterReceivable && (letterQuota?.remaining ?? 0) > 0

  const handleBlockToggle = async () => {
    if (isBlocking) return
    closeBlock()
    setIsBlocking(true)
    try {
      if (isBlocked) await unblockUser(user.userId)
      else await blockUser(user.userId)
      setUser((prev) => prev && { ...prev, isBlocked: !isBlocked })
      showToast(isBlocked ? '차단을 해제했어요' : '사용자를 차단했어요')
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsBlocking(false)
    }
  }

  return (
    <SheetPage>
      <SectionHeader title="프로필" actionLabel="나가기" onActionClick={goBack} />

      <ProfileCard profile={toProfileCard(user)} tone="purple" meta={meta || undefined} />

      <S.Actions>
        <Button
          ref={blockButtonRef}
          variant="outline"
          aria-expanded={isBlockOpen}
          disabled={isBlocking}
          onClick={() => setIsBlockOpen((prev) => !prev)}
        >
          {isBlocked ? '차단 해제' : '차단하기'}
        </Button>
        <Button disabled={!canSendLetter} onClick={() => navigate(getLetterWritePath(user.userId))}>
          편지 쓰기
        </Button>
        <ConfirmPopover
          open={isBlockOpen}
          message={isBlocked ? '차단을 해제하시겠어요?' : '이 사용자를 차단하시겠어요?'}
          confirmLabel={isBlocked ? '차단 해제' : '사용자 차단'}
          onConfirm={handleBlockToggle}
          onClose={closeBlock}
          anchorRef={blockButtonRef}
        />
      </S.Actions>

      <Divider />

      <CommonTasteSection nickname={user.nickname} commonTaste={toCommonTaste(user.common)} />
    </SheetPage>
  )
}
