import styled from 'styled-components'
import { glass } from '@/styles/glass'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SearchBox = styled.div`
  ${glass}
  height: 4.4rem;
  border-radius: 1rem;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
  caret-color: ${({ theme }) => theme.colors.letterAccent};

  &::placeholder {
    color: ${({ theme }) => theme.colors.letterMuted};
    opacity: 1;
    transition: opacity 0.2s;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0.4;
  }
`

export const SelectedSong = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 3rem;
  padding: 0 1.2rem 0 0.9rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.letterAccent};
`

export const SongInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.letterBackground};

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
