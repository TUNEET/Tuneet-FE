import { useCallback } from 'react'
import { getApiError } from '@/apis/error'
import { getLikedMusics } from '@/apis/music'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { LikeButton } from '@/components/common/LikeButton/LikeButton'
import { useCursorList } from '@/hooks/useCursorList'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useMusicLike } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { LikedSong } from '@/types/like'
import * as S from './LikedMusics.styles'

const getLikeId = ({ id }: LikedSong) => id

type LikedMusicsProps = {
  onExit: () => void
}

export function LikedMusics({ onExit }: LikedMusicsProps) {
  const showToast = useToast()
  const handleLoadError = useCallback(
    (error: unknown) => showToast(getApiError(error).message),
    [showToast],
  )
  const likes = useCursorList(getLikedMusics, getLikeId, handleLoadError)
  const sentinelRef = useInfiniteScroll<HTMLDivElement>(
    likes.loadMore,
    likes.hasNext && !likes.isLoading,
  )
  const handleLikeToggle = useMusicLike((update) => likes.setItems(update))

  return (
    <S.LikedSheet>
      <S.Section>
        <S.Header>
          <S.Title>좋아요 기록 관리</S.Title>
          <S.ExitButton type="button" onClick={onExit}>
            나가기
          </S.ExitButton>
        </S.Header>
        {likes.items.length > 0 ? (
          <S.List>
            {likes.items.map((item) => (
              <S.Row key={item.id}>
                <S.Cover>
                  <CoverImage src={item.song.albumImageUrl} />
                </S.Cover>
                <S.Info>
                  <S.SongTitle>{item.song.title}</S.SongTitle>
                  <S.Artist>{item.song.artist}</S.Artist>
                </S.Info>
                <LikeButton
                  liked={item.liked}
                  tone="roseBadge"
                  onToggle={() => handleLikeToggle(item)}
                />
              </S.Row>
            ))}
          </S.List>
        ) : (
          !likes.isLoading && <S.Empty>아직 좋아요한 노래가 없어요</S.Empty>
        )}
        <div ref={sentinelRef} aria-hidden />
      </S.Section>
    </S.LikedSheet>
  )
}
