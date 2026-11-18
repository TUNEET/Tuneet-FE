import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`

export const Wrapper = styled.div`
  position: absolute;
  bottom: calc(var(--bottom-nav-height) + 4.6rem);
  left: 50%;
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

/* Figma 유리 효과의 빛(-45°, 80%): 왼쪽 위 가장자리는 밝게, 반대쪽은 은은하게.
   굴절·깊이·분산은 CSS로 표현할 수 없어 흐림과 가장자리 빛만 옮겼다 */
const glassEdge =
  'inset 0.5px 0.5px 0 rgba(255, 255, 255, 0.8), inset -0.5px -0.5px 0 rgba(255, 255, 255, 0.3)'

export const Card = styled.div`
  position: relative;
  height: 37.3rem;
  overflow: hidden;
  border-radius: 2.4rem;
  background: rgba(250, 250, 250, 0.5);
  /* Figma 유리 효과(흐릿함 5) */
  box-shadow: ${glassEdge};
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
`

export const Title = styled.h2`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  width: 25.3rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Description = styled.p`
  position: absolute;
  top: 6.5rem;
  left: 2rem;
  width: 25.3rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const PushNote = styled.p`
  position: absolute;
  top: 9.9rem;
  left: 2rem;
  width: 25.3rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.blue};
`

/* 캡처는 화면에 보이는 부분만 잘라 3배 크기로 넣어 두었다 */
const StepImage = styled.img`
  position: absolute;
  left: 2rem;
  object-fit: cover;
`

export const StepShare = styled(StepImage)`
  top: 12.3rem;
  width: 16.2rem;
  height: 3.2rem;
  border-radius: 1000px;
`

export const StepMenu = styled(StepImage)`
  top: 16rem;
  width: 10.4rem;
  height: 11.9rem;
  border-radius: 1.3rem;
`

export const StepAdd = styled(StepImage)`
  top: 28.4rem;
  width: 14.8rem;
  height: 1.9rem;
  border-radius: 1000px;
`

/* 선의 오른쪽 점이 번호 배지 가운데에 오도록 놓는다 */
export const Line = styled.img<{ $left: string; $top: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  max-width: none;
  pointer-events: none;
`

export const StepBadge = styled.span<{ $top: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: 25.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 1000px;
  background-color: #d98aba;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const CloseButton = styled.button`
  position: absolute;
  top: 31.8rem;
  left: 1rem;
  width: 27.3rem;
  padding: 1rem;
  border-radius: 100px;
  background: rgba(233.92, 233.92, 233.92, 0.7);
  /* 카드와 같은 유리 효과 */
  box-shadow: ${glassEdge};
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
