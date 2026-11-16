import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import commentIcon from '@/assets/icons/comt-icon-add.svg'
import musicIcon from '@/assets/icons/music-icon-add.svg'
import musicNoteWhiteIcon from '@/assets/icons/music-note-white.svg'
import upIcon from '@/assets/icons/upIcon.svg'
import { getApiError } from '@/apis/error'
import { createFeed, getFeed, updateFeed } from '@/apis/feed'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SongSearchSheet } from '@/components/common/SongSearchSheet/SongSearchSheet'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { SearchedSong } from '@/types/music'
import * as S from './ExploreWritePage.styles'

const COMMENT_MAX_LENGTH = 100

export function ExploreWritePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const params = useParams()
  const feedId = params.feedId ? Number(params.feedId) : null
  const [song, setSong] = useState<SearchedSong | null>(null)
  const [isSongSearchOpen, setIsSongSearchOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canSubmit = song !== null && comment.trim() !== '' && !isSubmitting

  useEffect(() => {
    if (!params.feedId) return

    let isStale = false
    getFeed(Number(params.feedId))
      .then((feed) => {
        if (isStale) return
        setSong(feed.song)
        setComment(feed.content)
      })
      .catch((error) => {
        if (!isStale) showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [params.feedId, showToast])

  const handleSubmit = async () => {
    if (!canSubmit || !song) return

    const body = { musicId: song.musicId, content: comment.trim() }
    setIsSubmitting(true)
    try {
      if (feedId === null) await createFeed(body)
      else await updateFeed(feedId, body)
      navigate(ROUTES.explore, { replace: true })
    } catch (error) {
      showToast(getApiError(error).message)
      setIsSubmitting(false)
    }
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
            <S.SearchInput
              id="explore-song"
              type="search"
              readOnly
              placeholder="노래 검색하기"
              onClick={() => setIsSongSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setIsSongSearchOpen(true)
              }}
            />
            {song && (
              <S.SelectedSong>
                <img src={song.albumImageUrl} alt="" width={12} height={12} />
                <span>
                  {song.title} - {song.artist}
                </span>
                <S.SongNote src={musicNoteWhiteIcon} alt="" />
              </S.SelectedSong>
            )}
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

      <S.SubmitButton
        type="button"
        aria-label="게시하기"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        <img src={upIcon} alt="" width={40} height={40} />
      </S.SubmitButton>

      {isSongSearchOpen && (
        <SongSearchSheet
          variant="explore"
          title="게시할 노래"
          onAdd={setSong}
          onClose={() => setIsSongSearchOpen(false)}
        />
      )}
    </S.Page>
  )
}
