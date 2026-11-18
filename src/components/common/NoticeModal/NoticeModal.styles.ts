import styled from 'styled-components'

export const CardArea = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0.8rem;
`

export const Character = styled.img`
  position: absolute;
  top: -8.3rem;
  right: 2rem;
  width: 7.1rem;
  height: 8.8rem;
  object-fit: contain;
`

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.8rem 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: 0.02em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
`

const ActionButton = styled.button`
  flex: 1;
  height: 3.8rem;
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.02em;
`

export const SecondaryButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const PrimaryButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};
`
