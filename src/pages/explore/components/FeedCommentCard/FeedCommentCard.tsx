import { useState } from 'react'
import commentIcon from '@/assets/icons/comt-icon-add.svg'
import messageIcon from '@/assets/icons/duo-icons_message.svg'
import sentIcon from '@/assets/icons/duo-icons_sent.svg'
import musicIcon from '@/assets/icons/music-icon-add.svg'
import musicNoteWhiteIcon from '@/assets/icons/music-note-white.svg'
import sentFullIcon from '@/assets/icons/sent-full.svg'
import { getApiError } from '@/apis/error'
import { sendFeedMessage } from '@/apis/feed'
import { SongSearchSheet } from '@/components/common/SongSearchSheet/SongSearchSheet'
import { useToast } from '@/hooks/useToast'
import type { SearchedSong } from '@/types/music'
import * as S from './FeedCommentCard.styles'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'

const COMMENT_MAX_LENGTH = 100

type FeedCommentCardProps = {
  feedId: number
  onSent: () => void
}

export function FeedCommentCard({ feedId, onSent }: FeedCommentCardProps) {
  const showToast = useToast()
  const [comment, setComment] = useState('')
  const [song, setSong] = useState<SearchedSong | null>(null)
  const [isSongSearchOpen, setIsSongSearchOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const canSend = comment.trim().length > 0 && song !== null && !isSending

  const handleSend = async () => {
    if (!canSend || !song) return

    setIsSending(true)
    try {
      await sendFeedMessage(feedId, { musicId: song.musicId, messageContent: comment.trim() })
      showToast('코멘트를 보냈어요')
      onSent()
    } catch (error) {
      showToast(getApiError(error).message)
      setIsSending(false)
    }
  }

  return (
    <S.Card>
      <S.Top>
        <img src={messageIcon} alt="" width={26} height={26} />
      </S.Top>
      <S.Divider />
      <S.Body>
        <S.Label id="feed-comment-title" htmlFor="feed-comment-song">
          <img src={musicIcon} alt="" width={20} height={20} />
          함께 보낼 노래
        </S.Label>
        <S.SearchInput
          id="feed-comment-song"
          type="search"
          readOnly
          placeholder="노래 검색하기"
          onClick={() => setIsSongSearchOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') setIsSongSearchOpen(true)
          }}
        />
        {song ? (
          <S.SelectedSong>
            <CoverImage src={song.albumImageUrl} width={12} height={12} />
            <span>
              {song.title} - {song.artist}
            </span>
            <S.SongNote src={musicNoteWhiteIcon} alt="" />
          </S.SelectedSong>
        ) : (
          <S.SongSlot />
        )}
        <S.Label htmlFor="feed-comment-text">
          <img src={commentIcon} alt="" width={20} height={20} />
          코멘트 작성
        </S.Label>
        <S.CommentInput
          id="feed-comment-text"
          placeholder={`코멘트는 최대 ${COMMENT_MAX_LENGTH}자까지 작성할 수 있어요.`}
          maxLength={COMMENT_MAX_LENGTH}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <S.SendButton type="button" aria-label="보내기" disabled={!canSend} onClick={handleSend}>
          <img src={canSend ? sentFullIcon : sentIcon} alt="" />
        </S.SendButton>
      </S.Body>

      {isSongSearchOpen && (
        <SongSearchSheet
          variant="explore"
          title="함께 보낼 노래"
          onAdd={setSong}
          onClose={() => setIsSongSearchOpen(false)}
        />
      )}
    </S.Card>
  )
}
