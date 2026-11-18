import { CHARACTER_BACKGROUNDS, CHARACTER_IMAGE } from '@/constants/characters'
import type { CharacterColorId } from '@/constants/characters'
import * as S from './CharacterAvatar.styles'

type CharacterAvatarProps = {
  colorId: CharacterColorId
  imageUrl?: string | null
  size?: string
}

export function CharacterAvatar({ colorId, imageUrl, size = '4rem' }: CharacterAvatarProps) {
  return (
    <S.Avatar $background={CHARACTER_BACKGROUNDS[colorId]} $size={size}>
      {imageUrl ? <S.Photo src={imageUrl} alt="" /> : <S.Character src={CHARACTER_IMAGE} alt="" />}
    </S.Avatar>
  )
}
