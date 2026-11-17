import styled from 'styled-components'

export const HeartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`
