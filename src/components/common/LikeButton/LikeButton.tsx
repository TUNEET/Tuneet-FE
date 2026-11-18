import type { MouseEvent } from 'react'
import likedBadgeHeart from '@/assets/icons/likepage-heart.svg'
import unlikedBadgeHeart from '@/assets/icons/likepage-del-heart.svg'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import * as S from './LikeButton.styles'
import type { LikeButtonTone } from './LikeButton.styles'

type LikeButtonProps = {
  liked: boolean
  tone?: LikeButtonTone
  size?: number
  onToggle: () => void
}

export function LikeButton({ liked, tone = 'blue', size = 14, onToggle }: LikeButtonProps) {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    onToggle()
  }

  return (
    <S.Button
      type="button"
      $tone={tone}
      $size={size}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      aria-pressed={liked}
      onClick={handleClick}
    >
      {tone === 'roseBadge' ? (
        <img src={liked ? likedBadgeHeart : unlikedBadgeHeart} alt="" width={14} height={14} />
      ) : (
        <HeartIcon filled={liked} size={size} />
      )}
    </S.Button>
  )
}
