import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterPath } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { MOCK_RECEIVED_LETTERS } from '@/mocks/letter'
import { formatTimeAgo } from '@/utils/format'
import * as S from './LetterboxPage.styles'

export function LetterboxPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [letters, setLetters] = useState(MOCK_RECEIVED_LETTERS)
  const [isClearOpen, setIsClearOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])

  const handleClear = () => {
    closeClear()
    setLetters([])
    showToast('편지를 모두 삭제했어요')
  }

  return (
    <SheetPage>
      <S.Section>
        <S.Header ref={headerRef}>
          <SectionHeader
            title="편지함"
            actionLabel={letters.length > 0 ? '전체삭제' : undefined}
            onActionClick={() => setIsClearOpen((prev) => !prev)}
          />
          <ConfirmPopover
            open={isClearOpen}
            message="모든 편지를 삭제하시겠어요?"
            confirmLabel="모든 편지 삭제"
            onConfirm={handleClear}
            onClose={closeClear}
            anchorRef={headerRef}
          />
        </S.Header>
        {letters.length > 0 ? (
          <S.List>
            {letters.map(({ id, senderNickname, content, song, sentAt }) => (
              <li key={id}>
                <MusicCard
                  tone="rose"
                  nickname={senderNickname}
                  meta={formatTimeAgo(sentAt)}
                  image={song.albumImageUrl}
                  title={`${song.title} - ${song.artist}`}
                  description={content}
                  playable
                  onClick={() => navigate(getLetterPath(id))}
                />
              </li>
            ))}
          </S.List>
        ) : (
          <S.Empty>받은 편지가 없어요</S.Empty>
        )}
      </S.Section>
    </SheetPage>
  )
}
