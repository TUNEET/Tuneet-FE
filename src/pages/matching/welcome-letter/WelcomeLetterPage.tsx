import { useNavigate } from 'react-router'
import characterLetter from '@/assets/images/character-letter.png'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { ROUTES } from '@/constants/routes'
import { WELCOME_LETTER } from '@/constants/welcomeLetter'
import * as S from './WelcomeLetterPage.styles'

export function WelcomeLetterPage() {
  const navigate = useNavigate()
  const { title, greeting, intro, question, story, guideTitle, guides, outro, closing, from } =
    WELCOME_LETTER

  return (
    <SheetPage>
      <SectionHeader
        title="편지"
        actionLabel="나가기"
        onActionClick={() => navigate(ROUTES.letterbox)}
      />
      <S.Paper>
        <S.Character src={characterLetter} alt="" />
        <S.Title>{title}</S.Title>
        <S.Divider />

        <S.Greeting>{greeting}</S.Greeting>
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
        </S.Paragraphs>

        <S.GuideTitle>{guideTitle}</S.GuideTitle>
        <S.Guides>
          {guides.map(({ emoji, title: guide, description }) => (
            <S.Guide key={guide}>
              <S.GuideEmoji aria-hidden>{emoji}</S.GuideEmoji>
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
