import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { getApiError } from '@/apis/error'
import { findSentLetter } from '@/apis/letter'
import { getMyProfile } from '@/apis/user'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { SentLetter, SentLetterLocationState } from '@/types/letter'
import { formatDateTime } from '@/utils/format'
import { LetterCards } from './components/LetterCards/LetterCards'
import * as S from './LetterDetailPage.styles'

export function SentLetterDetailPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { letterId } = useParams()
  const { state } = useLocation() as { state: SentLetterLocationState | null }
  const id = Number(letterId)
  const isValidId = Number.isInteger(id) && id > 0
  const passedLetter = state?.letter?.letterId === id ? state.letter : undefined

  const [fetchedLetter, setFetchedLetter] = useState<SentLetter | null | undefined>(undefined)
  const [myNickname, setMyNickname] = useState('')
  const letter = passedLetter ?? fetchedLetter
  const goToLetterbox = () => navigate(ROUTES.letterbox)

  useEffect(() => {
    let isStale = false

    getMyProfile()
      .then((profile) => {
        if (!isStale) setMyNickname(profile.nickname ?? '')
      })
      .catch(() => {})

    // 새로고침이나 주소로 바로 들어오면 넘겨받은 편지가 없어서 목록에서 다시 찾는다
    if (isValidId && !passedLetter) {
      findSentLetter(id)
        .then((found) => {
          if (!isStale) setFetchedLetter(found)
        })
        .catch((error) => {
          if (isStale) return
          setFetchedLetter(null)
          showToast(getApiError(error).message)
        })
    }

    return () => {
      isStale = true
    }
  }, [id, isValidId, passedLetter, showToast])

  if (isValidId && letter === undefined) return <SheetPage>{null}</SheetPage>

  if (!letter) {
    return (
      <SheetPage>
        <SectionHeader title="편지" actionLabel="나가기" onActionClick={goToLetterbox} />
        <S.Empty>편지를 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  const { receiverNickname, letterContent, music, createdAt } = letter

  return (
    <SheetPage>
      <S.Header>
        <SectionHeader
          title={`${receiverNickname} | ${formatDateTime(createdAt)}`}
          actionLabel="나가기"
          onActionClick={goToLetterbox}
        />
      </S.Header>

      <div>
        <S.Intro>
          <S.IntroSub>음악에 담아 보낸</S.IntroSub>
          <S.IntroMain>나의 마음을 확인해 보세요.</S.IntroMain>
        </S.Intro>

        <S.Received>
          <LetterCards content={letterContent} from={myNickname} music={music} />
        </S.Received>
      </div>
    </SheetPage>
  )
}
