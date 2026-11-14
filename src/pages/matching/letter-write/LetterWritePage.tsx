import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import sendActiveIcon from '@/assets/icons/send-active.svg'
import sendIcon from '@/assets/icons/send.svg'
import characterLetter from '@/assets/images/character-letter.png'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getApiError } from '@/apis/error'
import { getReceivedLetter, replyLetter, sendLetter, sendRandomLetter } from '@/apis/letter'
import { searchMusics } from '@/apis/music'
import { getMyProfile, getUserProfile } from '@/apis/user'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { SearchedSong } from '@/types/music'
import { SongField } from './components/SongField/SongField'
import * as S from './LetterWritePage.styles'

const CONTENT_MAX_LENGTH = 100
const RANDOM_RECIPIENT = '누군가'

/**
 * 받는 사람에 따라 세 가지로 쓴다.
 * - 답장: /matching/letters/:letterId/reply
 * - 지정 편지: /matching/users/:userId/letter
 * - 랜덤 편지: /matching/letter
 */
type WriteMode =
  { type: 'reply'; letterId: number } | { type: 'direct'; userId: number } | { type: 'random' }

function getWriteMode(params: { letterId?: string; userId?: string }): WriteMode {
  if (params.letterId) return { type: 'reply', letterId: Number(params.letterId) }
  if (params.userId) return { type: 'direct', userId: Number(params.userId) }
  return { type: 'random' }
}

export function LetterWritePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { letterId, userId } = useParams()
  const fieldId = useId()

  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [content, setContent] = useState('')
  const [song, setSong] = useState<SearchedSong | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [isSentPopoverOpen, setIsSentPopoverOpen] = useState(false)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const closeSentPopover = useCallback(() => setIsSentPopoverOpen(false), [])
  const isRandom = !letterId && !userId

  useEffect(() => {
    let isStale = false
    const mode = getWriteMode({ letterId, userId })

    const loadRecipientName = async () => {
      if (mode.type === 'reply') return (await getReceivedLetter(mode.letterId)).senderNickname
      if (mode.type === 'direct') return (await getUserProfile(mode.userId)).nickname
      return RANDOM_RECIPIENT
    }

    Promise.all([loadRecipientName(), getMyProfile()])
      .then(([recipient, profile]) => {
        if (isStale) return
        setRecipientName(recipient)
        setSenderName(profile.nickname ?? '')
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [letterId, userId, showToast])

  const canSend = content.trim() !== '' && song !== null && !isSent && !isSending

  const handleSongSearch = async (query: string) => {
    try {
      const {
        items: [first],
      } = await searchMusics(query, 1, 1)
      if (!first) {
        showToast('검색 결과가 없어요')
        return
      }
      setSong({
        musicId: first.id,
        title: first.title,
        artist: first.artist,
        albumImageUrl: first.coverUrl ?? '',
      })
    } catch (error) {
      showToast(getApiError(error).message)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!canSend || !song) return

    const mode = getWriteMode({ letterId, userId })
    const body = { musicId: song.musicId, letterContent: content.trim() }

    setIsSending(true)
    try {
      if (mode.type === 'reply') await replyLetter(mode.letterId, body)
      else if (mode.type === 'direct') await sendLetter(mode.userId, body)
      else {
        // 랜덤 편지는 보낸 뒤에 받는 사람이 정해진다
        const result = await sendRandomLetter(body)
        setRecipientName(result.receiverNickname)
      }
      setIsSent(true)
      setIsSentPopoverOpen(true)
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsSending(false)
    }
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
            To. {recipientName || (isRandom ? RANDOM_RECIPIENT : '')}
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
