import styled, { css } from 'styled-components'

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const Toggle = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Indicator = styled.span<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.divider};

  ${({ $checked, theme }) =>
    $checked &&
    css`
      &::after {
        content: '';
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: ${theme.colors.lavender};
      }
    `}
`

export const PasswordInput = styled.input`
  width: 12rem;
  border: none;
  background: transparent;
  text-align: right;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.lavender};

  &::placeholder {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
  }
`
