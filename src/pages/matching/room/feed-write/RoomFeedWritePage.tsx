import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import commentIcon from '@/assets/icons/comt-icon-add.svg'
import musicIcon from '@/assets/icons/music-icon-add.svg'
import musicNoteWhiteIcon from '@/assets/icons/music-note-white.svg'
import upIcon from '@/assets/icons/upIcon.svg'
import { getApiError } from '@/apis/error'
import { createRoomPost } from '@/apis/room'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SongSearchSheet } from '@/components/common/SongSearchSheet/SongSearchSheet'
import { getRoomFeedsPath, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import * as S from '@/pages/explore/write/ExploreWritePage.styles'
import type { SearchedSong } from '@/types/music'

const COMMENT_MAX_LENGTH = 100

export function RoomFeedWritePage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const roomId = Number(useParams().roomId)
  const isValidRoom = Number.isInteger(roomId) && roomId > 0
  const [song, setSong] = useState<SearchedSong | null>(null)
  const [isSongSearchOpen, setIsSongSearchOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canSubmit = isValidRoom && song !== null && comment.trim() !== '' && !isSubmitting

  const goToFeeds = () =>
    navigate(isValidRoom ? getRoomFeedsPath(roomId) : ROUTES.matching, { replace: true })

  const handleSubmit = async () => {
    if (!canSubmit || !song) return

    setIsSubmitting(true)
    try {
      await createRoomPost(roomId, { musicId: song.musicId, content: comment.trim() })
      goToFeeds()
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
          <SectionHeader title="글쓰기" actionLabel="나가기" onActionClick={goToFeeds} />
          <S.Card>
            <S.Label htmlFor="room-feed-song">
              <img src={musicIcon} alt="" width={20} height={20} />
              게시할 노래
            </S.Label>
            <S.SearchInput
              id="room-feed-song"
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
                <CoverImage src={song.albumImageUrl} width={12} height={12} />
                <span>
                  {song.title} - {song.artist}
                </span>
                <S.SongNote src={musicNoteWhiteIcon} alt="" />
              </S.SelectedSong>
            )}
            <S.Label htmlFor="room-feed-comment">
              <img src={commentIcon} alt="" width={20} height={20} />
              코멘트 작성
            </S.Label>
            <S.CommentInput
              id="room-feed-comment"
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
          addedIds={song ? [song.musicId] : []}
          onClose={() => setIsSongSearchOpen(false)}
        />
      )}
    </S.Page>
  )
}
