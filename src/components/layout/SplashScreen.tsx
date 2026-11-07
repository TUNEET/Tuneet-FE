import styled from 'styled-components'
import boltLargeIcon from '@/assets/icons/fa6-solid_bolt-lightning-1.svg'
import boltSmallIcon from '@/assets/icons/fa6-solid_bolt-lightning.svg'
import musicLargeIcon from '@/assets/icons/flowbite_music-alt-solid-1.svg'
import musicSmallIcon from '@/assets/icons/flowbite_music-alt-solid.svg'
import clefLargeIcon from '@/assets/icons/lucide_clef-treble-1.svg'
import clefSmallIcon from '@/assets/icons/lucide_clef-treble.svg'
import noteSmallIcon from '@/assets/icons/nrk_music-note-solid-expressive-1.svg'
import noteLargeIcon from '@/assets/icons/nrk_music-note-solid-expressive.svg'
import characterImage from '@/assets/icons/splash-character.svg'
import logoImage from '@/assets/icons/TUNEET.svg'
import heartImage from '@/assets/icons/Vector 28.svg'
import waveformLargeIcon from '@/assets/icons/withicons_audio-waveform-duo-1.svg'
import waveformSmallIcon from '@/assets/icons/withicons_audio-waveform-duo.svg'

const DECORATIONS = [
  { src: musicSmallIcon, width: 26, height: 26, left: '25.1rem', top: '38.9rem' },
  { src: musicLargeIcon, width: 42, height: 42, left: '3.7rem', top: '39.7rem' },
  { src: noteLargeIcon, width: 35, height: 35, left: '27.6rem', top: '34.3rem' },
  { src: noteSmallIcon, width: 27, height: 27, left: '7.2rem', top: '35.6rem' },
  { src: clefSmallIcon, width: 27, height: 27, left: '28rem', top: '46.8rem' },
  { src: clefLargeIcon, width: 43, height: 43, left: '9.3rem', top: '37.4rem' },
  { src: waveformSmallIcon, width: 24, height: 24, left: '7.4rem', top: '44.9rem' },
  { src: waveformLargeIcon, width: 41, height: 41, left: '29.5rem', top: '42.1rem' },
  { src: boltSmallIcon, width: 15, height: 17, left: '10.228rem', top: '48.88rem' },
  { src: boltLargeIcon, width: 22, height: 25, left: '32.1rem', top: '38.159rem' },
]

export function SplashScreen() {
  return (
    <Wrapper>
      <Stage>
        <Heart src={heartImage} alt="" />
        <Logo src={logoImage} alt="TUNEET" />
        <Character src={characterImage} alt="" />
        <Tagline>음악으로 연결되는 우리</Tagline>
        {DECORATIONS.map(({ src, width, height, left, top }) => (
          <Decoration
            key={src}
            src={src}
            alt=""
            width={width}
            height={height}
            $left={left}
            $top={top}
          />
        ))}
      </Stage>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  background: radial-gradient(
    597.67% 149.3% at 21.63% 19.37%,
    ${({ theme }) => theme.colors.background} 0%,
    #e5b9cf 100%
  );
`

const Stage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 39.3rem;
  height: 85.2rem;
  letter-spacing: 0;
`

const Heart = styled.img`
  position: absolute;
  top: 28.9rem;
  left: 0;
  width: 39.3rem;
  height: 28.6rem;
`

const Logo = styled.img`
  position: absolute;
  top: 43.8rem;
  left: 11.4rem;
  width: 16.2rem;
  height: 2.9rem;
`

const Character = styled.img`
  position: absolute;
  top: 30.5rem;
  left: 14.7rem;
  width: 9.7rem;
  height: 13.6rem;
`

const Tagline = styled.p`
  position: absolute;
  top: 47.9rem;
  left: 13.2rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  line-height: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHeading};
`

const Decoration = styled.img<{ $left: string; $top: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
`
