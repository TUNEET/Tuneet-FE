import type { KeyboardEvent, ReactNode } from 'react'
import userBlueIcon from '@/assets/icons/user-blue.svg'
import userPurpleIcon from '@/assets/icons/user-purple.svg'
import userRoseIcon from '@/assets/icons/user-rose.svg'
import { Badge } from '@/components/common/Badge/Badge'
import * as S from './MusicCard.styles'
import type { MusicCardTone } from './MusicCard.styles'

const USER_ICONS = {
  blue: userBlueIcon,
  purple: userPurpleIcon,
  rose: userRoseIcon,
}

export type MusicCardProps = {
  tone: MusicCardTone
  nickname: string
  meta: string
  image: string
  title: string
  description: string
  playable?: boolean
  /** 시간 옆에 붙는 캡슐 라벨 (예: 답장) */
  badge?: string
  action?: ReactNode
  expanded?: boolean
  onClick?: () => void
}

export function MusicCard({
  tone,
  nickname,
  meta,
  image,
  title,
  description,
  playable = false,
  badge,
  action,
  expanded = false,
  onClick,
}: MusicCardProps) {
  const clickableProps = onClick && {
    role: 'button',
    tabIndex: 0,
    onClick,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.target !== event.currentTarget) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onClick()
      }
    },
  }

  return (
    <S.Card $tone={tone} $clickable={!!onClick} {...clickableProps}>
      <S.Top>
        <S.Author>
          <img src={USER_ICONS[tone]} alt="" width={14} height={14} />
          <S.Caption $tone={tone}>{nickname}</S.Caption>
        </S.Author>
        <S.Meta>
          <S.Caption $tone={tone}>{meta}</S.Caption>
          {badge && <Badge>{badge}</Badge>}
        </S.Meta>
      </S.Top>
      <S.Body>
        <S.Main $expanded={expanded}>
          <S.Thumbnail $playable={playable}>
            <img src={image} alt="" />
          </S.Thumbnail>
          <S.Texts>
            <S.Title $tone={tone} $expanded={expanded}>
              {title}
            </S.Title>
            <S.Description $tone={tone} $expanded={expanded}>
              {description}
            </S.Description>
          </S.Texts>
        </S.Main>
        {action && <S.Action>{action}</S.Action>}
      </S.Body>
    </S.Card>
  )
}
