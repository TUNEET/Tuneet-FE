import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const LinkInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lavender};
  text-decoration: underline;
  caret-color: ${({ theme }) => theme.colors.lavender};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    text-decoration: none;
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

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`
