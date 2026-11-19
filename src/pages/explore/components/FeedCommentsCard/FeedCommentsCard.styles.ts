import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 33.9rem;
  padding: 2rem 1.6rem 0;
  overflow: hidden;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceBlue};
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.6rem;
  min-height: 0;
  margin-top: 1.6rem;
  padding-bottom: 2rem;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.li<{ $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.4rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #e0e6f0;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`

export const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.016rem;
  color: ${({ theme }) => theme.colors.blue};
`

export const ItemBody = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export const ItemMain = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`

export const Thumbnail = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  overflow: hidden;
  border-radius: 1000px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  min-width: 0;
`

export const Song = styled.p`
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  line-height: 1.8rem;
  letter-spacing: 0.02rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Message = styled.p`
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.016rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textBody};
`

export const Like = styled.button`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  width: 1rem;
  padding: 0.6rem 0.1rem 0.1rem;
  color: ${({ theme }) => theme.colors.blue};
`

export const Empty = styled.p`
  margin-top: 4rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
