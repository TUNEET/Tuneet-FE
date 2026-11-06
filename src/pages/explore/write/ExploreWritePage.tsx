import { useState } from 'react'
import { useNavigate } from 'react-router'
import commentIcon from '@/assets/icons/comt-icon-add.svg'
import musicIcon from '@/assets/icons/music-icon-add.svg'
import musicNoteWhiteIcon from '@/assets/icons/music-note-white.svg'
import upIcon from '@/assets/icons/upIcon.svg'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { ROUTES } from '@/constants/routes'
import { MOCK_PROFILE, MOCK_WRITE_SONG } from '@/mocks/data'
import type { Feed } from '@/types/feed'
import { FeedDetailModal } from '../components/FeedDetailModal/FeedDetailModal'
import * as S from './ExploreWritePage.styles'

const COMMENT_MAX_LENGTH = 100

export function ExploreWritePage() {
  const navigate = useNavigate()
  const { title, artist, albumImageUrl } = MOCK_WRITE_SONG
  const [comment, setComment] = useState('')
  const [postedFeed, setPostedFeed] = useState<Feed | null>(null)

  const handleSubmit = () => {
    setPostedFeed({
      id: 0,
      nickname: MOCK_PROFILE.nickname,
      song: MOCK_WRITE_SONG,
      content: comment.trim(),
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <S.Page>
      <S.Glows aria-hidden>
        <S.Glow $size="35.9rem" $top="20.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
        <S.Glow $size="23rem" $top="27.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
        <S.Glow $size="12.4rem" $top="28.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
      </S.Glows>

      <S.ExploreSheet>
        <S.Section>
          <SectionHeader
            title="글쓰기"
            actionLabel="나가기"
            onActionClick={() => navigate(ROUTES.explore)}
          />
          <S.Card>
            <S.Label htmlFor="explore-song">
              <img src={musicIcon} alt="" width={20} height={20} />
              게시할 노래
            </S.Label>
            <S.SearchInput id="explore-song" type="search" placeholder="노래 검색하기" />
            <S.SelectedSong>
              <img src={albumImageUrl} alt="" width={12} height={12} />
              <span>
                {title} - {artist}
              </span>
              <S.SongNote src={musicNoteWhiteIcon} alt="" />
            </S.SelectedSong>
            <S.Label htmlFor="explore-comment">
              <img src={commentIcon} alt="" width={20} height={20} />
              코멘트 작성
            </S.Label>
            <S.CommentInput
              id="explore-comment"
              placeholder={`코멘트는 최대 ${COMMENT_MAX_LENGTH}자까지 작성할 수 있어요.`}
              maxLength={COMMENT_MAX_LENGTH}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </S.Card>
        </S.Section>
      </S.ExploreSheet>

      <S.SubmitButton type="button" aria-label="게시하기" onClick={handleSubmit}>
        <img src={upIcon} alt="" width={40} height={40} />
      </S.SubmitButton>

      {postedFeed && (
        <FeedDetailModal
          feed={postedFeed}
          isMine
          onEdit={() => setPostedFeed(null)}
          onClose={() => setPostedFeed(null)}
        />
      )}
    </S.Page>
  )
}
