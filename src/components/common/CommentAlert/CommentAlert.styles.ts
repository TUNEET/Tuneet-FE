import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  bottom: calc(var(--bottom-nav-height) + 4.6rem);
  left: 50%;
  z-index: 60;
  width: 29.3rem;
  transform: translateX(-50%);
`

export const Character = styled.img`
  position: absolute;
  top: -5.8rem;
  left: 3rem;
  width: 4.3rem;
  height: 6rem;
  pointer-events: none;
`

export const Card = styled.div`
  position: relative;
  height: 15.2rem;
  padding: 1.5rem 1rem 0;
  overflow: hidden;
  border-radius: 2.4rem;
  background: rgba(250, 250, 250, 0.7);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.08);
`

export const Title = styled.p`
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Info = styled.p`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Nickname = styled.span`
  font-weight: 500;
`

export const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 100px;
  background-color: rgba(233.92, 233.92, 233.92, 0.7);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.blue};
`
