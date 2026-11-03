import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Row = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const ScanPicker = styled.label<{ $scanned: boolean }>`
  position: relative;
  display: block;
  flex-shrink: 0;
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
  cursor: pointer;
  outline: ${({ $scanned, theme }) => ($scanned ? `2px solid ${theme.colors.lavender}` : 'none')};
  outline-offset: 2px;

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.lavender};
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`
