import exploreIcon from '@/assets/icons/explore-active.svg'
import homeIcon from '@/assets/icons/home-active.svg'
import matchingIcon from '@/assets/icons/matching-active.svg'
import myIcon from '@/assets/icons/my-active.svg'

export const WELCOME_LETTER = {
  title: 'TUNEET팀이 보낸 첫 번째 편지',
  sender: 'TUNEET팀',
  preview: '음악으로 사람과 사람을 연결하는 공간, TUNEET에 오신 걸 환영해요!',
  defaultNickname: '튜니',
  greeting: (nickname: string) => `안녕하세요, ${nickname}님! 🎧`,
  intro: [
    '음악으로 사람과 사람을 연결하는 공간, TUNEET에 오신 걸 진심으로 환영해요!',
    '혹시 좋아하는 노래를 듣다가 문득 이런 생각을 해본 적 있나요?',
  ],
  question: "'이 노래를 좋아하는 사람이 또 있을까?'",
  story: [
    'TUNEET은 바로 그 작은 궁금증에서 시작됐어요.',
    '누군가에게는 그저 스쳐 지나가는 노래 한 곡이, 다른 누군가에게는 오래도록 간직하고 싶은 추억일 수 있어요.',
    '음악 취향이 비슷하다는 건 생각보다 반가운 일이에요. 내가 아끼는 노래를 누군가도 좋아한다는 사실만으로 괜히 기분이 좋아지기도 하니까요.',
  ],
  storyEnding: {
    lead: '그래서 만들었어요.',
    highlight: '당신이 좋아하는 음악이 누군가에게 닿을 수 있는 공간을요.',
  },
  guideTitle: 'TUNEET에서는 이렇게 시작해 보세요!',
  guides: [
    {
      icon: myIcon,
      title: '나만의 음악 프로필 만들기',
      description: '좋아하는 아티스트와 노래를 담아 나의 취향을 표현해 보세요.',
    },
    {
      icon: matchingIcon,
      title: '취향이 닮은 사람 발견하기',
      description: '매칭에서 나와 음악 취향이 비슷한 사람들을 만나보세요.',
    },
    {
      icon: exploreIcon,
      title: '음악을 담아 편지 보내기',
      description: '마음에 드는 상대를 발견했다면, 좋아하는 노래와 함께 첫인사를 건네보세요.',
    },
    {
      icon: homeIcon,
      title: '방에서 함께 음악 나누기',
      description:
        '같은 공간에 있는 사람들과 음악 취향을 비교하고, 서로의 플레이리스트를 구경해 보세요.',
    },
  ],
  outro: [
    '처음부터 모든 기능을 사용하지 않아도 괜찮아요.',
    '당신이 아끼는 노래 한 곡이 누군가의 새로운 최애곡이 되고, 누군가가 건넨 음악 한 곡이 당신의 평범한 하루를 조금 더 특별하게 만들어 주기를 바라요.',
    '그렇게 좋아하는 음악을 나누며 서로에게 조금씩 가까워지는 순간.',
    '우리가 TUNEET을 만든 이유가 바로 그 순간에 있으니까요.',
  ],
  closing: '당신의 음악을 알아듣는 누군가가 이곳에 있기를.',
  from: 'TUNEET을 만든 사람들',
}
