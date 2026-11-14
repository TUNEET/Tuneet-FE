import styled from 'styled-components'

export const Term = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TermLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
  cursor: pointer;
`

export const Checkbox = styled.input`
  flex-shrink: 0;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.border};
  appearance: none;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0 0 0 0.3rem ${({ theme }) => theme.colors.border};
  }

  &:checked[aria-readonly='true'] {
    background-color: ${({ theme }) => theme.colors.textPlaceholder};
    cursor: default;
  }
`

export const TermDetail = styled.button`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  letter-spacing: 0.028rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
