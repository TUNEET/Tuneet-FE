import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { linkYoutubeMusic, syncYoutubeMusic } from '@/apis/platform'
import characterMusicSearch from '@/assets/images/character-music-search.png'
import { ROUTES } from '@/constants/routes'
import type { ArtistCandidate } from '@/types/platform'
import type { MyPageLocationState } from '@/types/user'
import { getConnectOrigin, saveConnectResult } from '@/utils/youtubeMusic'
import * as S from './YoutubeMusicCallbackPage.styles'

let handledCode: string | null = null

async function connect(code: string | null, state: string | null): Promise<ArtistCandidate[]> {
  if (!code || !state) throw new Error('missing code')
  await linkYoutubeMusic({ code, state })
  return (await syncYoutubeMusic()).artistCandidates
}

export function YoutubeMusicCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  useEffect(() => {
    if (code && handledCode === code) return
    handledCode = code

    const origin = getConnectOrigin()
    const goBack = () => {
      if (origin === 'settings') {
        navigate(ROUTES.my, {
          replace: true,
          state: { view: 'settings' } satisfies MyPageLocationState,
        })
      } else {
        navigate(ROUTES.profileSetup, { replace: true })
      }
    }

    connect(code, state)
      .then((artistCandidates) =>
        saveConnectResult({ origin, status: 'success', artistCandidates }),
      )
      .catch(() => saveConnectResult({ origin, status: 'failure', artistCandidates: [] }))
      .finally(goBack)
  }, [code, state, navigate])

  return (
    <S.Wrapper role="status">
      <S.Character src={characterMusicSearch} alt="" />
      <S.Title>유튜브 뮤직과 연결하는 중이에요</S.Title>
      <S.Description>좋아요한 곡을 불러오고 있어요.{'\n'}잠시만 기다려 주세요.</S.Description>
    </S.Wrapper>
  )
}
