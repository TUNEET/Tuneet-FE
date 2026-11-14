import styled from 'styled-components'
import { glass } from '@/styles/glass'

export const TermModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`

export const TermModal = styled.div<{ $height: string }>`
  ${glass}
  position: absolute;
  bottom: 12rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 29.3rem;
  height: ${({ $height }) => $height};
  padding: 1.5rem 1rem;
  border: none;
  border-radius: 2.4rem;
  background: rgba(250, 250, 250, 0.7);
  -webkit-backdrop-filter: blur(0.4rem);
  backdrop-filter: blur(0.4rem);
  transform: translateX(-50%);
`

export const TermModalTitle = styled.h2`
  margin-bottom: 1rem;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const TermSections = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  padding: 0 1rem;
`

export const TermSection = styled.section`
  font-size: 1rem;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const TermSectionHeading = styled.h3`
  font-size: inherit;
  font-weight: 500;
`

export const TermSectionBody = styled.p`
  font-weight: 400;
  white-space: pre-line;
`

export const TermModalCloseButton = styled.button`
  margin-top: auto;
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  background-color: rgba(233.92, 233.92, 233.92, 0.7);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const TermCharacter = styled.img<{ $modalHeight: string }>`
  position: absolute;
  bottom: calc(12rem + ${({ $modalHeight }) => $modalHeight} - 0.2rem);
  left: calc(50% - 11.65rem);
  width: 4.3rem;
  height: 6rem;
  pointer-events: none;
`
