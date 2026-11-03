import type { KeyboardEvent, ReactNode } from 'react'
import userBlueIcon from '@/assets/icons/user-blue.svg'
import userPurpleIcon from '@/assets/icons/user-purple.svg'
import * as S from './MusicCard.styles'
import type { MusicCardTone } from './MusicCard.styles'

const USER_ICONS = {
  blue: userBlueIcon,
  purple: userPurpleIcon,
}

export type MusicCardProps = {
  tone: MusicCardTone
  nickname: string
  meta: string
  image: string
  title: string
  description: string
  playable?: boolean
  action?: ReactNode
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
  action,
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
        <S.Caption $tone={tone}>{meta}</S.Caption>
      </S.Top>
      <S.Body>
        <S.Main>
          <S.Thumbnail $playable={playable}>
            <img src={image} alt="" />
          </S.Thumbnail>
          <S.Texts>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.Texts>
        </S.Main>
        {action && <S.Action>{action}</S.Action>}
      </S.Body>
    </S.Card>
  )
}
