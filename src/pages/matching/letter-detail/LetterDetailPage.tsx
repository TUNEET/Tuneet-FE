import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import playIcon from '@/assets/icons/play-circle-gray.svg'
import characterLetter from '@/assets/images/character-letter-detail.png'
import { Button } from '@/components/common/Button/Button'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterWritePath, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { mockDeleteLetter, mockGetReceivedLetter } from '@/mocks/letter'
import type { ReceivedLetter } from '@/types/letter'
import { formatDateTime } from '@/utils/format'
import * as S from './LetterDetailPage.styles'

export function LetterDetailPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { letterId } = useParams()

  const [letter, setLetter] = useState<ReceivedLetter | null | undefined>(undefined)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const closeDelete = useCallback(() => setIsDeleteOpen(false), [])
  const goToLetterbox = () => navigate(ROUTES.letterbox)

  useEffect(() => {
    mockGetReceivedLetter(Number(letterId)).then(setLetter)
  }, [letterId])

  const handleDelete = async () => {
    if (!letter) return
    closeDelete()
    await mockDeleteLetter(letter.id)
    showToast('편지를 삭제했어요')
    goToLetterbox()
  }

  if (letter === undefined) return <SheetPage>{null}</SheetPage>

  if (letter === null) {
    return (
      <SheetPage>
        <SectionHeader title="편지" actionLabel="나가기" onActionClick={goToLetterbox} />
        <S.Empty>편지를 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  const { senderId, senderNickname, content, song, sentAt } = letter

  return (
    <SheetPage>
      <SectionHeader
        title={`${senderNickname} | ${formatDateTime(sentAt)}`}
        actionLabel="나가기"
        onActionClick={goToLetterbox}
      />

      <div>
        <S.Intro>
          <S.IntroSub>음악을 타고 도착한</S.IntroSub>
          <S.IntroMain>소중한 마음을 확인해 보세요.</S.IntroMain>
        </S.Intro>

        <S.Cards>
          <S.MessageCard>
            <S.Content>{content}</S.Content>
            <S.From>From. {senderNickname}</S.From>
          </S.MessageCard>
          <S.SongCard>
            <S.Character src={characterLetter} alt="" />
            <S.PlayIcon src={playIcon} alt="" />
            <S.Song>
              <img src={song.albumImageUrl} alt="" />
              <span>
                {song.title} - {song.artist}
              </span>
            </S.Song>
          </S.SongCard>
        </S.Cards>

        <S.Actions>
          <Button
            ref={deleteButtonRef}
            variant="outline"
            tone="rose"
            aria-expanded={isDeleteOpen}
            onClick={() => setIsDeleteOpen((prev) => !prev)}
          >
            삭제하기
          </Button>
          <Button tone="rose" onClick={() => navigate(getLetterWritePath(senderId))}>
            답장하기
          </Button>
          <ConfirmPopover
            open={isDeleteOpen}
            message="편지를 삭제하시겠어요?"
            confirmLabel="편지 삭제"
            onConfirm={handleDelete}
            onClose={closeDelete}
            anchorRef={deleteButtonRef}
          />
        </S.Actions>
      </div>
    </SheetPage>
  )
}
