import type { MouseEvent } from 'react'
import { HeartIcon } from '@/components/common/HeartIcon/HeartIcon'
import * as S from './LikeButton.styles'
import type { LikeButtonTone } from './LikeButton.styles'

type LikeButtonProps = {
  liked: boolean
  tone?: LikeButtonTone
  onToggle: () => void
}

export function LikeButton({ liked, tone = 'blue', onToggle }: LikeButtonProps) {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    onToggle()
  }

  return (
    <S.Button
      type="button"
      $tone={tone}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      aria-pressed={liked}
      onClick={handleClick}
    >
      <HeartIcon filled={liked} size={14} />
    </S.Button>
  )
}
