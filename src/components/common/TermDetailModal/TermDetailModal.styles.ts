import styled from 'styled-components'
import { glass } from '@/styles/glass'

export const TermModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.6rem 0;
  background-color: rgba(0, 0, 0, 0.5);
`

export const TermModalWrapper = styled.div`
  position: relative;
`

export const TermModal = styled.div<{ $height: string }>`
  ${glass}
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
  flex: 1;
  gap: ${({ $gap }) => $gap};
  min-height: 0;
  margin-bottom: 1rem;
  padding: 0 1rem;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }

  &::-webkit-scrollbar {
    width: 0.3rem;
    height: 0;
  }

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
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
  overflow-wrap: anywhere;
  word-break: keep-all;
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

export const TermCharacter = styled.img`
  position: absolute;
  bottom: calc(100% - 0.2rem);
  left: 3rem;
  width: 4.3rem;
  height: 6rem;
  pointer-events: none;
`
