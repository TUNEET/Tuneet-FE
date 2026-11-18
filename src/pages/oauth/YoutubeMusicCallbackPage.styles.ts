import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: var(--frame-height);
  padding: 0 3rem 6rem;
  text-align: center;
`

export const Character = styled.img`
  width: 10rem;
  height: 10.7rem;
  object-fit: contain;
`

export const Title = styled.h1`
  margin-top: 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Description = styled.p`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 1.5;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
