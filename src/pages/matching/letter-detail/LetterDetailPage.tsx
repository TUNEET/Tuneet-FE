import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApiError } from '@/apis/error'
import { deleteReceivedLetter, getReceivedLetter } from '@/apis/letter'
import { getMyProfile } from '@/apis/user'
import { Badge } from '@/components/common/Badge/Badge'
import { Button } from '@/components/common/Button/Button'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getLetterReplyPath, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { ReceivedLetter } from '@/types/letter'
import { formatDateTime } from '@/utils/format'
import { LetterCards } from './components/LetterCards/LetterCards'
import * as S from './LetterDetailPage.styles'

export function LetterDetailPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { letterId } = useParams()

  const [letter, setLetter] = useState<ReceivedLetter | null | undefined>(undefined)
  const [myNickname, setMyNickname] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)
  const closeDelete = useCallback(() => setIsDeleteOpen(false), [])
  const goToLetterbox = () => navigate(ROUTES.letterbox)
  const id = Number(letterId)
  const isValidId = Number.isInteger(id) && id > 0

  useEffect(() => {
    if (!isValidId) return
    let isStale = false

    getReceivedLetter(id)
      .then(async (data) => {
        if (isStale) return
        setLetter(data)
        // 답장이면 아래에 내가 먼저 보낸 편지를 'From. 내 닉네임'으로 보여준다
        if (data.isReply) {
          const profile = await getMyProfile()
          if (!isStale) setMyNickname(profile.nickname ?? '')
        }
      })
      .catch((error) => {
        if (isStale) return
        setLetter((prev) => prev ?? null)
        showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [id, isValidId, showToast])

  const handleDelete = async () => {
    if (!letter || isDeleting) return
    closeDelete()
    setIsDeleting(true)
    try {
      await deleteReceivedLetter(letter.letterId)
      showToast('편지를 삭제했어요')
      goToLetterbox()
    } catch (error) {
      showToast(getApiError(error).message)
      setIsDeleting(false)
    }
  }

  if (isValidId && letter === undefined) return <SheetPage>{null}</SheetPage>

  if (!letter) {
    return (
      <SheetPage>
        <SectionHeader title="편지" actionLabel="나가기" onActionClick={goToLetterbox} />
        <S.Empty>편지를 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  const { senderNickname, letterContent, music, createdAt, isReply, isReplied, parentLetter } =
    letter

  return (
    <SheetPage>
      <S.Header>
        {isReply && <Badge>답장</Badge>}
        <SectionHeader
          title={`${senderNickname} | ${formatDateTime(createdAt)}`}
          actionLabel="나가기"
          onActionClick={goToLetterbox}
        />
      </S.Header>

      <div>
        <S.Intro>
          <S.IntroSub>음악을 타고 도착한</S.IntroSub>
          <S.IntroMain>소중한 마음을 확인해 보세요.</S.IntroMain>
        </S.Intro>

        <S.Received>
          <LetterCards content={letterContent} from={senderNickname} music={music} />
        </S.Received>

        <S.Actions>
          <Button
            ref={deleteButtonRef}
            variant="outline"
            tone="rose"
            aria-expanded={isDeleteOpen}
            disabled={isDeleting}
            onClick={() => setIsDeleteOpen((prev) => !prev)}
          >
            삭제하기
          </Button>
          <Button
            tone="rose"
            // 받은 편지 한 통에는 답장을 한 번만 보낼 수 있다
            disabled={isReplied === true}
            onClick={() => navigate(getLetterReplyPath(id))}
          >
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

        {isReply && parentLetter && (
          <S.Reply>
            <S.ReplyLabel>내가 보낸 편지</S.ReplyLabel>
            <LetterCards
              content={parentLetter.letterContent}
              from={myNickname}
              music={parentLetter.music}
            />
          </S.Reply>
        )}
      </div>
    </SheetPage>
  )
}
