import { useState } from 'react'
import commentIcon from '@/assets/icons/comt-icon-add.svg'
import messageIcon from '@/assets/icons/duo-icons_message.svg'
import sentIcon from '@/assets/icons/duo-icons_sent.svg'
import musicIcon from '@/assets/icons/music-icon-add.svg'
import sentFullIcon from '@/assets/icons/sent-full.svg'
import * as S from './FeedCommentCard.styles'

const COMMENT_MAX_LENGTH = 100

export function FeedCommentCard() {
  const [comment, setComment] = useState('')
  const isWritten = comment.trim().length > 0

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
        <S.SearchInput id="feed-comment-song" type="search" placeholder="노래 검색하기" />
        <S.SongSlot />
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
        <S.SendButton type="button" aria-label="보내기">
          <img src={isWritten ? sentFullIcon : sentIcon} alt="" />
        </S.SendButton>
      </S.Body>
    </S.Card>
  )
}
