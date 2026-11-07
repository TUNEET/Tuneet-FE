import styled from 'styled-components'

export { ExploreSheet } from '@/pages/explore/ExplorePage.styles'
export { Glow, Glows, Page, Section } from '@/pages/home/HomePage.styles'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.9rem 2.8rem 2rem 5.5rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceBlue};
`

export const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPrimary};

  img {
    position: absolute;
    top: 0.5rem;
    left: -4rem;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  height: 2.8rem;
  padding: 0 1.5rem;
  border: none;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.inputBlue};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textBody};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
  }
`

export const SelectedSong = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  height: 3rem;
  padding: 0 1rem 0 0.9rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};

  img:first-child {
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

export const CommentInput = styled.textarea`
  width: 100%;
  height: 7.6rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 1.4rem;
  background-color: ${({ theme }) => theme.colors.inputBlue};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textBody};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
  }
`

export const SubmitButton = styled.button`
  position: absolute;
  /* 852px 화면 기준 55.2rem. 화면 높이에 맞춰 움직이되 카드(약 35.3rem) 아래로는 유지 */
  top: max(37.5rem, calc(100% - 16.6rem));
  right: 3rem;
  display: flex;
  width: 4rem;
  height: 4rem;
`
