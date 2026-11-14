import styled from 'styled-components'

export const Avatar = styled.div<{ $background: string }>`
  position: relative;
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${({ $background }) => $background};
`

export const Character = styled.img`
  position: absolute;
  top: 0.7rem;
  left: 0;
  width: 3.7rem;
  height: 3.3rem;
`

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
