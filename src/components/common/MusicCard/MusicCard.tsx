import type { KeyboardEvent, ReactNode } from 'react'
import userBlueIcon from '@/assets/icons/user-blue.svg'
import userPurpleIcon from '@/assets/icons/user-purple.svg'
import userRoseIcon from '@/assets/icons/user-rose.svg'
import { Badge } from '@/components/common/Badge/Badge'
import * as S from './MusicCard.styles'
import type { MusicCardTone } from './MusicCard.styles'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'

const USER_ICONS = {
  blue: userBlueIcon,
  purple: userPurpleIcon,
  rose: userRoseIcon,
}

export type MusicCardProps = {
  tone: MusicCardTone
  nickname: string
  meta: string
  image?: string | null
  thumbnail?: ReactNode
  title: string
  description: string
  descriptionAction?: ReactNode
  playable?: boolean
  badge?: string
  action?: ReactNode
  actionAlign?: 'start' | 'end'
  expanded?: boolean
  onClick?: () => void
}

export function MusicCard({
  tone,
  nickname,
  meta,
  image,
  thumbnail,
  title,
  description,
  descriptionAction,
  playable = false,
  badge,
  action,
  actionAlign = 'end',
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
          <S.Thumbnail $playable={playable}>{thumbnail ?? <CoverImage src={image} />}</S.Thumbnail>
          <S.Texts>
            <S.Title $tone={tone} $expanded={expanded}>
              {title}
            </S.Title>
            <S.DescriptionRow>
              <S.Description $tone={tone} $expanded={expanded}>
                {description}
              </S.Description>
              {descriptionAction}
            </S.DescriptionRow>
          </S.Texts>
        </S.Main>
        {action && <S.Action $align={actionAlign}>{action}</S.Action>}
      </S.Body>
    </S.Card>
  )
}
