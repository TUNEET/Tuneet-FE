import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  padding: 2.5rem 2rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.lavender};
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`

export const ImagePicker = styled.label`
  position: relative;
  display: block;
  flex-shrink: 0;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.lavender};
    outline-offset: 2px;
  }
`

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const EditIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
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

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
`

const InlineInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  text-align: center;
  caret-color: ${({ theme }) => theme.colors.lavender};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPlaceholder};
    opacity: 1;
    transition: opacity 0.2s;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0.4;
  }
`

export const NameInput = styled(InlineInput)`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const DescriptionInput = styled(InlineInput)`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textBody};
`
