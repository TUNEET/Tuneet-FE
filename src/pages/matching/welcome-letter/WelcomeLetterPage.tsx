import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getMyProfile } from '@/apis/user'
import welcomeLetterIcon from '@/assets/icons/welcome-letter.svg'
import characterLetter from '@/assets/images/character-letter.png'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { ROUTES } from '@/constants/routes'
import { WELCOME_LETTER } from '@/constants/welcomeLetter'
import * as S from './WelcomeLetterPage.styles'

export function WelcomeLetterPage() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState<string>(WELCOME_LETTER.defaultNickname)

  useEffect(() => {
    let isStale = false

    getMyProfile()
      .then((profile) => {
        if (!isStale && profile.nickname) setNickname(profile.nickname)
      })
      .catch(() => {})

    return () => {
      isStale = true
    }
  }, [])

  const {
    title,
    greeting,
    intro,
    question,
    story,
    storyEnding,
    guideTitle,
    guides,
    outro,
    closing,
    from,
  } = WELCOME_LETTER

  return (
    <SheetPage>
      <SectionHeader
        title="편지"
        actionLabel="나가기"
        onActionClick={() => navigate(ROUTES.letterbox)}
      />
      <S.Paper>
        <S.Character src={characterLetter} alt="" />
        <S.Title>
          <img src={welcomeLetterIcon} alt="" width={24} height={18} />
          {title}
        </S.Title>
        <S.Divider />

        <S.Greeting>{greeting(nickname)}</S.Greeting>
        <S.Paragraphs>
          {intro.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </S.Paragraphs>

        <S.Question>{question}</S.Question>

        <S.Paragraphs>
          {story.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p>
            {storyEnding.lead} <S.Highlight>{storyEnding.highlight}</S.Highlight>
          </p>
        </S.Paragraphs>

        <S.GuideTitle>{guideTitle}</S.GuideTitle>
        <S.Guides>
          {guides.map(({ icon, title: guide, description }) => (
            <S.Guide key={guide}>
              <S.GuideIcon>
                <img src={icon} alt="" width={20} height={20} />
              </S.GuideIcon>
              <S.GuideTexts>
                <S.GuideName>{guide}</S.GuideName>
                <S.GuideDescription>{description}</S.GuideDescription>
              </S.GuideTexts>
            </S.Guide>
          ))}
        </S.Guides>

        <S.Paragraphs>
          {outro.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </S.Paragraphs>

        <S.Closing>{closing}</S.Closing>
        <S.From>From. {from}</S.From>
      </S.Paper>

      <S.StartButton type="button" onClick={() => navigate(ROUTES.matching)}>
        취향이 닮은 사람 만나러 가기
      </S.StartButton>
    </SheetPage>
  )
}
