import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SegmentTabs } from '@/components/common/SegmentTabs/SegmentTabs'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterPath } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { MOCK_RECEIVED_LETTERS, MOCK_SENT_LETTERS } from '@/mocks/letter'
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

export function LetterboxPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [tab, setTab] = useState<LetterTab>('received')
  const [receivedLetters, setReceivedLetters] = useState(MOCK_RECEIVED_LETTERS)
  const [sentLetters, setSentLetters] = useState(MOCK_SENT_LETTERS)
  const [isClearOpen, setIsClearOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])

  const isReceived = tab === 'received'
  const cards = isReceived
    ? receivedLetters.map(({ id, senderNickname, reply, ...rest }) => ({
        ...rest,
        id,
        nickname: `발신자 | ${senderNickname}`,
        badge: reply ? '답장' : undefined,
        onClick: () => navigate(getLetterPath(id)),
      }))
    : sentLetters.map(({ recipientNickname, ...rest }) => ({
        ...rest,
        nickname: `수신자 | ${recipientNickname}`,
        badge: undefined,
        onClick: undefined,
      }))
  const isEmpty = cards.length === 0

  const handleTabChange = (next: LetterTab) => {
    closeClear()
    setTab(next)
  }

  const handleClear = () => {
    closeClear()
    if (isReceived) setReceivedLetters([])
    else setSentLetters([])
    showToast(TAB_TEXT[tab].toast)
  }

  return (
    <SheetPage>
      <S.Section>
        <S.Header ref={headerRef}>
          <SectionHeader
            title="편지함"
            actionLabel="전체삭제"
            onActionClick={() => setIsClearOpen((prev) => !prev)}
            actionDisabled={isEmpty}
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
        {!isEmpty ? (
          <S.List>
            {cards.map(({ id, nickname, content, song, sentAt, badge, onClick }) => (
              <li key={id}>
                <MusicCard
                  tone="rose"
                  nickname={nickname}
                  meta={formatTimeAgo(sentAt)}
                  image={song.albumImageUrl}
                  title={`${song.title} - ${song.artist}`}
                  description={content}
                  playable
                  badge={badge}
                  onClick={onClick}
                />
              </li>
            ))}
          </S.List>
        ) : (
          <S.Empty>{TAB_TEXT[tab].empty}</S.Empty>
        )}
      </S.Section>
    </SheetPage>
  )
}
