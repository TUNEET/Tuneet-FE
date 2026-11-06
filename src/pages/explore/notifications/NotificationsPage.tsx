import { MusicCard } from '@/components/common/MusicCard/MusicCard'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { MOCK_NOTIFICATIONS } from '@/mocks/data'
import * as S from '@/pages/explore/ExplorePage.styles'
import { formatTimeAgo } from '@/utils/format'

export function NotificationsPage() {
  return (
    <S.Page>
      <S.Glows aria-hidden>
        <S.Glow $size="35.9rem" $top="20.8rem" $left="-4.5rem" $color="#FFBBD3" $blur="100px" />
        <S.Glow $size="23rem" $top="27.3rem" $left="18.1rem" $color="#E5C3FF" $blur="100px" />
        <S.Glow $size="12.4rem" $top="28.8rem" $left="9.4rem" $color="#CFE8FF" $blur="75px" />
      </S.Glows>

      <S.ExploreSheet>
        <S.Section>
          <SectionHeader title="알림" actionLabel="전체삭제" />
          <S.CardList>
            {MOCK_NOTIFICATIONS.map(({ id, nickname, message, song, createdAt }) => (
              <MusicCard
                key={id}
                tone="blue"
                nickname={nickname}
                meta={formatTimeAgo(createdAt)}
                image={song.albumImageUrl}
                title={message}
                description={`${song.title} - ${song.artist}`}
                playable
              />
            ))}
          </S.CardList>
        </S.Section>
      </S.ExploreSheet>
    </S.Page>
  )
}
