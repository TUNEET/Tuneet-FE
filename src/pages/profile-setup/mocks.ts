export const MOCK_FAILING_PLATFORM_ID = 'genie'

export const MOCK_PROFILE_ARTISTS = [
  { name: 'RESCENE', image: 'https://placehold.co/12x12' },
  { name: 'ROSÉ', image: 'https://placehold.co/12x12' },
  { name: 'Travis Scott', image: 'https://placehold.co/12x12' },
]

export type ProfileArtist = (typeof MOCK_PROFILE_ARTISTS)[number]

const MOCK_SEARCHABLE_ARTISTS = [
  'RESCENE',
  'ROSÉ',
  'Travis Scott',
  'IVE',
  'aespa',
  'NewJeans',
  'LE SSERAFIM',
  'TWICE',
  'SEVENTEEN',
  'DAY6',
  'Taylor Swift',
  'Ed Sheeran',
  'Billie Eilish',
  'The Weeknd',
  'Charlie Puth',
].map((name, index) => ({ id: index + 1, name, image: 'https://placehold.co/12x12' }))

export async function mockSearchArtists(query: string) {
  const keyword = query.trim().toLowerCase()
  return MOCK_SEARCHABLE_ARTISTS.filter(({ name }) => name.toLowerCase().includes(keyword))
}

export const MOCK_PROFILE_MUSIC = {
  title: 'Pretty Girl',
  artist: 'RESCENE',
  albumImage: 'https://placehold.co/17x17',
}
