import characterMember from '@/assets/images/character-member.png'

export const CHARACTER_IMAGE = characterMember

export const CHARACTER_BACKGROUNDS = {
  1: '#BED5EC',
  2: '#ECBEDA',
  3: '#ECC6BE',
  4: '#D7BEEC',
  5: '#BEC0EC',
  6: '#BEE1EC',
} as const

export type CharacterColorId = keyof typeof CHARACTER_BACKGROUNDS

const CHARACTER_COLOR_COUNT = Object.keys(CHARACTER_BACKGROUNDS).length

export const getCharacterColorId = (userId: number) =>
  ((userId % CHARACTER_COLOR_COUNT) + 1) as CharacterColorId
