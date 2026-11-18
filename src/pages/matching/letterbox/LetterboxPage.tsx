import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import welcomeCharacter from '@/assets/images/character-letter.png'
import { LETTER_ERROR_MESSAGES } from '@/constants/letterErrors'
import {
  deleteAllReceivedLetters,
  deleteAllSentLetters,
  getReceivedLetters,
  getSentLetters,
} from '@/apis/letter'
import { LikeButton } from '@/components/common/LikeButton/LikeButton'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SegmentTabs } from '@/components/common/SegmentTabs/SegmentTabs'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterPath, getSentLetterPath, ROUTES } from '@/constants/routes'
import { WELCOME_LETTER } from '@/constants/welcomeLetter'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { LetterMusic, SentLetterLocationState } from '@/types/letter'
import { formatTimeAgo } from '@/utils/format'
import * as S from './LetterboxPage.styles'

type LetterTab = 'received' | 'sent'

const TABS = [
  { value: 'received', label: '수신한 편지' },
  { value: 'sent', label: '발송한 편지' },
] as const

const TAB_TEXT: Record<LetterTab, { confirm: string; toast: string; empty: string }> = {
  received: {
    confirm: '수신한 편지를 모두 삭제하시겠어요?',
    toast: '수신한 편지를 모두 삭제했어요',
    empty: '받은 편지가 없어요',
  },
  sent: {
    confirm: '발송한 편지를 모두 삭제하시겠어요?',
    toast: '발송한 편지를 모두 삭제했어요',
    empty: '보낸 편지가 없어요',
  },
}

type LetterCard = {
  letterId: number
  nickname: string
  music: LetterMusic
  letterContent: string
  createdAt: string
  badge?: string
  liked: boolean
  onClick?: () => void
  onLikeToggle: () => void
}

const fetchReceived = async (cursor?: number) => {
  const { letters, hasNext } = await getReceivedLetters(cursor)
  return { items: letters, hasNext }
}

const fetchSent = async (cursor?: number) => {
  const { letters, hasNext } = await getSentLetters(cursor)
  return { items: letters, hasNext }
}

const getLetterId = ({ letterId }: { letterId: number }) => letterId

export function LetterboxPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [tab, setTab] = useState<LetterTab>('received')
  const [isClearOpen, setIsClearOpen] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])
  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error, LETTER_ERROR_MESSAGES).message),
    [showToast],
  )

  const received = useCursorList(fetchReceived, getLetterId, handleLoadError)
  const sent = useCursorList(fetchSent, getLetterId, handleLoadError)
  const isReceived = tab === 'received'
  const current = isReceived ? received : sent
  const handleLikeToggle = useMusicLike((update) => {
    received.setItems(update)
    sent.setItems(update)
  })

  const cards: LetterCard[] = isReceived
    ? received.items.map((letter) => ({
        ...letter,
        nickname: `발신자 | ${letter.senderNickname}`,
        badge: letter.isReply ? '답장' : undefined,
        onClick: () => navigate(getLetterPath(letter.letterId)),
        onLikeToggle: () => handleLikeToggle(letter),
      }))
    : sent.items.map((letter) => ({
        ...letter,
        nickname: `수신자 | ${letter.receiverNickname}`,
        onClick: () =>
          navigate(getSentLetterPath(letter.letterId), {
            state: { letter } satisfies SentLetterLocationState,
          }),
        onLikeToggle: () => handleLikeToggle(letter),
      }))
  const isEmpty = cards.length === 0
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    current.loadMore,
    current.hasNext && !current.isLoading,
  )

  const handleTabChange = (next: LetterTab) => {
    closeClear()
    setTab(next)
  }

  const handleClear = async () => {
    if (isClearing) return
    closeClear()
    setIsClearing(true)
    try {
      if (isReceived) await deleteAllReceivedLetters()
      else await deleteAllSentLetters()
      current.setItems([])
      showToast(TAB_TEXT[tab].toast)
    } catch (error) {
      showToast(getApiError(error, LETTER_ERROR_MESSAGES).message)
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <SheetPage>
      <S.Section>
        <S.Header ref={headerRef}>
          <SectionHeader
            title="편지함"
            actionLabel="전체삭제"
            onActionClick={() => setIsClearOpen((prev) => !prev)}
            actionDisabled={isEmpty || isClearing}
          />
          <ConfirmPopover
            open={isClearOpen && !isEmpty}
            message={TAB_TEXT[tab].confirm}
            confirmLabel="모든 편지 삭제"
            onConfirm={handleClear}
            onClose={closeClear}
            anchorRef={headerRef}
          />
        </S.Header>
        <SegmentTabs items={TABS} value={tab} onChange={handleTabChange} ariaLabel="편지함 구분" />
        {(isReceived || !isEmpty) && (
          <S.List>
            {isReceived && (
              <li>
                <MusicCard
                  tone="rose"
                  nickname={`발신자 | ${WELCOME_LETTER.sender}`}
                  meta="고정됨"
                  thumbnail={<S.WelcomeThumbnail src={welcomeCharacter} alt="" />}
                  title={WELCOME_LETTER.title}
                  description={WELCOME_LETTER.preview}
                  badge="환영"
                  onClick={() => navigate(ROUTES.welcomeLetter)}
                />
              </li>
            )}
            {cards.map(
              ({
                letterId,
                nickname,
                letterContent,
                music,
                createdAt,
                badge,
                liked,
                onClick,
                onLikeToggle,
              }) => (
                <li key={letterId}>
                  <MusicCard
                    tone="rose"
                    nickname={nickname}
                    meta={formatTimeAgo(createdAt)}
                    image={music.musicPicture ?? ''}
                    title={`${music.title} - ${music.artist}`}
                    description={letterContent}
                    playable
                    badge={badge}
                    action={<LikeButton liked={liked} tone="rose" onToggle={onLikeToggle} />}
                    actionAlign="start"
                    onClick={onClick}
                  />
                </li>
              ),
            )}
          </S.List>
        )}
        {isEmpty && !current.isLoading && <S.Empty>{TAB_TEXT[tab].empty}</S.Empty>}
        <div ref={sentinelRef} aria-hidden />
      </S.Section>
    </SheetPage>
  )
}
