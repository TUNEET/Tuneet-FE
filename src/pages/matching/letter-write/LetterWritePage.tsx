import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import sendActiveIcon from '@/assets/icons/send-active.svg'
import sendIcon from '@/assets/icons/send.svg'
import characterLetter from '@/assets/images/character-letter.png'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { ROUTES } from '@/constants/routes'
import { MOCK_PROFILE } from '@/mocks/data'
import { mockGetLetterRecipient, mockSearchSongs, mockSendLetter } from '@/mocks/letter'
import type { Song } from '@/types/song'
import { SongField } from './components/SongField/SongField'
import * as S from './LetterWritePage.styles'

const CONTENT_MAX_LENGTH = 100
const ANONYMOUS_RECIPIENT = '누군가'

export function LetterWritePage() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const recipientId = userId ? Number(userId) : undefined
  const fieldId = useId()

  const [recipientName, setRecipientName] = useState('')
  const [content, setContent] = useState('')
  const [song, setSong] = useState<Song | null>(null)
  const [isSent, setIsSent] = useState(false)
  const [isSentPopoverOpen, setIsSentPopoverOpen] = useState(false)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const closeSentPopover = useCallback(() => setIsSentPopoverOpen(false), [])
  const senderName = MOCK_PROFILE.nickname

  useEffect(() => {
    if (recipientId === undefined) return
    mockGetLetterRecipient(recipientId).then((recipient) => setRecipientName(recipient.nickname))
  }, [recipientId])

  const canSend = content.trim() !== '' && song !== null && !isSent

  const handleSongSearch = async (query: string) => {
    const [firstResult] = await mockSearchSongs(query)
    setSong(firstResult ?? null)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!canSend || !song) return

    await mockSendLetter({
      recipientId,
      content: content.trim(),
      song,
    })
    setIsSent(true)
    setIsSentPopoverOpen(true)
  }

  return (
    <SheetPage tone="letter">
      <S.Header>
        <S.Title>편지 쓰기</S.Title>
        <S.ExitButton type="button" onClick={() => navigate(-1)}>
          나가기
        </S.ExitButton>
      </S.Header>

      <S.Divider />

      <S.Intro>
        <img src={characterLetter} alt="" width={42} height={48} />
        <S.IntroTexts>
          <S.IntroSub>음악을 함께 나누고 싶은 사람에게</S.IntroSub>
          <S.IntroMain>마음을 전해볼까요?</S.IntroMain>
        </S.IntroTexts>
      </S.Intro>

      <S.Form onSubmit={handleSubmit}>
        <S.Field>
          <S.Label htmlFor={`${fieldId}-content`}>
            To. {recipientId === undefined ? ANONYMOUS_RECIPIENT : recipientName}
          </S.Label>
          <S.MessageInput
            id={`${fieldId}-content`}
            value={content}
            placeholder={`편지는 최대 ${CONTENT_MAX_LENGTH}자까지 작성할 수 있어요.`}
            maxLength={CONTENT_MAX_LENGTH}
            readOnly={isSent}
            onChange={(event) => setContent(event.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label htmlFor={`${fieldId}-song`}>함께 보낼 노래</S.Label>
          <SongField id={`${fieldId}-song`} song={song} onSearch={handleSongSearch} />
        </S.Field>

        <S.Field>
          <S.Label as="p">From. {senderName}</S.Label>
          <S.SenderBox>{senderName}</S.SenderBox>
        </S.Field>

        <S.SendRow>
          <S.SendButton
            ref={sendButtonRef}
            type="submit"
            aria-label="편지 보내기"
            disabled={!canSend}
          >
            <img src={canSend ? sendActiveIcon : sendIcon} alt="" width={40} height={40} />
          </S.SendButton>
          <ConfirmPopover
            open={isSentPopoverOpen}
            message="편지가 전송되었습니다."
            confirmLabel="홈으로 이동"
            onConfirm={() => navigate(ROUTES.home)}
            onClose={closeSentPopover}
            anchorRef={sendButtonRef}
            placement="top"
            tone="default"
            surface="letter"
          />
        </S.SendRow>
      </S.Form>
    </SheetPage>
  )
}
