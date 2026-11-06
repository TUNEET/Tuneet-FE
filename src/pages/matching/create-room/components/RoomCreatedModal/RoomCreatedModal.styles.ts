import styled from 'styled-components'

export const CardArea = styled.div`
  position: relative;
  width: 100%;
`

export const Character = styled.img`
  position: absolute;
  top: -6rem;
  right: 3.1rem;
  width: 5.8rem;
  height: 6.3rem;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.9rem 2.8rem 2rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`

export const Title = styled.h2`
  display: flex;
  align-items: center;
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.6rem;
`

export const QrBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border-radius: 1.2rem;
  background-color: white;
`

export const QrImage = styled.img`
  width: 9.2rem;
  height: 9.2rem;
  cursor: pointer;
  user-select: none;
  -webkit-touch-callout: default;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.lavender};
    outline-offset: 2px;
  }
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  text-align: center;
`

export const Name = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textBody};
`

export const InviteLink = styled.a`
  align-self: center;
  margin-top: 1.7rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lavender};
  text-decoration: underline;
`

export const ShareButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.lavender};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Divider = styled.hr`
  margin-top: 2rem;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.dividerLavender};
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

export const IconButton = styled.button`
  display: flex;
`
