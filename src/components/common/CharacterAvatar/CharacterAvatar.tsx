import { CHARACTER_BACKGROUNDS, CHARACTER_IMAGE } from '@/constants/characters'
import type { CharacterColorId } from '@/constants/characters'
import * as S from './CharacterAvatar.styles'

type CharacterAvatarProps = {
  colorId: CharacterColorId
}

export function CharacterAvatar({ colorId }: CharacterAvatarProps) {
  return (
    <S.Avatar $background={CHARACTER_BACKGROUNDS[colorId]}>
      <img src={CHARACTER_IMAGE} alt="" />
    </S.Avatar>
  )
}
