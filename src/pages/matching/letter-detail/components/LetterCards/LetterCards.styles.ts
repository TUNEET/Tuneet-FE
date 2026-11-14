import styled from 'styled-components'

export const Cards = styled.div`
  isolation: isolate;
  display: flex;
  flex-direction: column;
  width: 33.3rem;
  margin: 0 auto;
  padding: 1.9rem 0 2rem;
`

const Card = styled.div`
  width: 28rem;
  border-radius: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.handwriting};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 2.6rem;
  letter-spacing: 0;
  transform-origin: top left;
`

export const MessageCard = styled(Card)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.4rem;
  min-height: 15rem;
  margin-left: 0.2rem;
  padding: 2.5rem 1.6rem 1.9rem 2.2rem;
  outline: 4px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  transform: rotate(-4deg);
`

export const Content = styled.p`
  overflow-wrap: anywhere;
  word-break: keep-all;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const From = styled.p`
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const SongCard = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 15rem;
  margin: -9.9rem 0 0 5.08rem;
  padding: 9.28rem 2.5rem 1.2rem 2.5rem;
  outline: 4px solid ${({ theme }) => theme.colors.letterCardBorder};
  background-color: ${({ theme }) => theme.colors.letterCardBack};
  transform: rotate(4deg);
`

export const Character = styled.img`
  position: absolute;
  top: -4.6rem;
  left: 24.3rem;
  width: 3.5rem;
  height: 4.5rem;
  object-fit: contain;
`

export const PlayIcon = styled.img`
  align-self: flex-end;
  width: 1.72rem;
  height: 1.72rem;
  margin-bottom: 0.2rem;
`

export const Song = styled.p`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 0.75rem;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textHeading};

  img {
    flex-shrink: 0;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    display: -webkit-box;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-align: right;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
`
