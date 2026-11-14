import { CHARACTER_BACKGROUNDS, CHARACTER_IMAGE } from '@/constants/characters'
import type { CharacterColorId } from '@/constants/characters'
import * as S from './CharacterAvatar.styles'

type CharacterAvatarProps = {
  colorId: CharacterColorId
  // 프로필 사진이 있으면 캐릭터 대신 보여준다
  imageUrl?: string | null
}

export function CharacterAvatar({ colorId, imageUrl }: CharacterAvatarProps) {
  return (
    <S.Avatar $background={CHARACTER_BACKGROUNDS[colorId]}>
      {imageUrl ? <S.Photo src={imageUrl} alt="" /> : <S.Character src={CHARACTER_IMAGE} alt="" />}
    </S.Avatar>
  )
}
