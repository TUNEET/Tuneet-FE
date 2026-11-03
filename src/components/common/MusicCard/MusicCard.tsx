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
}

export function MusicCard({
  tone,
  nickname,
  meta,
  image,
  title,
  description,
  playable = false,
}: MusicCardProps) {
  return (
    <S.Card $tone={tone}>
      <S.Top>
        <S.Author>
          <img src={USER_ICONS[tone]} alt="" width={14} height={14} />
          <S.Caption $tone={tone}>{nickname}</S.Caption>
        </S.Author>
        <S.Caption $tone={tone}>{meta}</S.Caption>
      </S.Top>
      <S.Body>
        <S.Thumbnail $playable={playable}>
          <img src={image} alt="" />
        </S.Thumbnail>
        <S.Texts>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </S.Texts>
      </S.Body>
    </S.Card>
  )
}
