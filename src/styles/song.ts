import styled from 'styled-components'

/* 노래 목록 행 (플레이리스트, 노래 검색 결과) */

export const SongList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SongItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 3rem;
  padding: 0 0.7rem 0 0.9rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`

export const SongLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};

  img {
    flex-shrink: 0;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const PlayButton = styled.button`
  display: flex;
  flex-shrink: 0;
`

/* 프로필 노래 칩 (프로필 설정, 프로필 카드) */

export const SongChip = styled.li`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3rem;
  padding: 0 1rem 0 0.9rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.primary};

  & > img:first-child {
    flex-shrink: 0;
    border-radius: 9999px;
  }

  span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const SongNote = styled.img`
  flex-shrink: 0;
  width: 0.692rem;
  height: 0.867rem;
`
