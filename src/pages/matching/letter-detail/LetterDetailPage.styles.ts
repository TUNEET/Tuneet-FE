import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;

  > :last-child {
    align-self: stretch;
  }
`

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  line-height: 1.6rem;
`

export const IntroSub = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const IntroMain = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Received = styled.div`
  margin-top: 4.3rem;
`

export const Actions = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 4.2rem;
`

export const Reply = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
  margin-top: 2.3rem;
`

export const ReplyLabel = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const Empty = styled.p`
  padding: 4rem 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
