import styled from 'styled-components'

export const List = styled.div`
  display: flex;
  gap: 1rem;
`

export const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 1rem;
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  line-height: 1.6rem;
  letter-spacing: 0.024rem;
  white-space: nowrap;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.divider};
  color: ${({ theme, $active }) => ($active ? theme.colors.surfaceWhite : theme.colors.textSecondary)};
`
