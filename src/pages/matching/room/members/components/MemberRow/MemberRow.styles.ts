import styled from 'styled-components'

export const Row = styled.li<{ $owner: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 6rem;
  padding: 0 1rem;
  border: 1px solid ${({ $owner, theme }) => ($owner ? theme.colors.purple : 'transparent')};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.lavender};
    outline-offset: 2px;
  }
`

export const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`

export const NameLine = styled.p`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
`

export const Nickname = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Role = styled.span<{ $owner: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ $owner, theme }) => ($owner ? theme.colors.purple : theme.colors.textSecondary)};
`

export const Song = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
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

export const Aside = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 1.2rem;
`

export const Meta = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  line-height: 1.2rem;
  color: ${({ theme }) => theme.colors.purple};
`

export const LetterButton = styled.button`
  display: flex;
`
