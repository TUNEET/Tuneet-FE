import styled from 'styled-components'

export const Avatar = styled.div<{ $background: string; $size: string }>`
  position: relative;
  flex-shrink: 0;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  overflow: hidden;
  border-radius: 50%;
  background-color: ${({ $background }) => $background};
`

export const Character = styled.img`
  position: absolute;
  top: 17.5%;
  left: 0;
  width: 92.5%;
  height: 82.5%;
`

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
