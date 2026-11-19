import styled from 'styled-components'

export const CardArea = styled.div`
  position: relative;
  width: 100%;
  padding: 0 2rem;
`

export const Character = styled.img`
  position: absolute;
  top: -3.6rem;
  left: 4.3rem;
  z-index: 1;
  width: 5.3rem;
  height: 4.4rem;
  object-fit: contain;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  border-radius: 2.4rem;
  background-color: rgba(250, 250, 250, 0.7);
  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
`

export const Title = styled.h2`
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Description = styled.p`
  margin-top: 1rem;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const DataList = styled.ul`
  margin-top: 2rem;
  padding: 0 1rem;
  list-style: none;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`

export const ActionButton = styled.button<{ $tone: 'danger' | 'muted' }>`
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  background-color: rgba(234, 234, 234, 0.7);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.02em;
  color: ${({ theme, $tone }) =>
    $tone === 'danger' ? theme.colors.danger : theme.colors.textPlaceholder};
  transition: background-color 0.15s;

  &:active {
    background-color: rgba(210, 210, 210, 0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`
