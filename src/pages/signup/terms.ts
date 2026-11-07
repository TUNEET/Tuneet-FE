export const TERMS = [
  {
    id: 'termsOfService',
    label: '서비스 이용약관 동의 (필수)',
    required: true,
    detail: {
      title: 'TUNEET 서비스 이용약관 (필수)',
      top: '37.6rem',
      height: '35.6rem',
      sectionGap: '2rem',
      sections: [
        {
          heading: '제1조 목적',
          body: '본 약관은 TUNEET이 제공하는 음악 취향 기반 소셜 서비스의 이용과 관련한 권리 및 의무를 규정해요.',
        },
        {
          heading: '제2조 서비스 이용',
          body: '회원은 음악 프로필 작성, 음악 공유, 다른 회원의 프로필 탐색 등 TUNEET에서 제공하는 기능을 이용할 수 있어요.',
        },
        {
          heading: '제3조 회원의 의무',
          body: '회원은 타인에게 불쾌감을 주는 게시물이나 부적절한 콘텐츠를 게시해서는 안 돼요.',
        },
        {
          heading: '제4조 서비스 이용 제한',
          body: '운영 정책을 위반하는 경우 서비스 이용이 제한될 수 있어요.',
        },
      ],
    },
  },
  {
    id: 'privacyPolicy',
    label: '개인정보 처리방침 동의 (필수)',
    required: true,
    detail: {
      title: 'TUNEET 개인정보 처리방침 (필수)',
      top: '35.8rem',
      height: '37.4rem',
      sectionGap: '1rem',
      sections: [
        {
          heading: '1. 수집하는 개인정보',
          body: '이메일 주소\n닉네임 및 프로필 정보\n서비스 이용 과정에서 생성되는 활동 정보',
        },
        {
          heading: '2. 개인정보 수집 및 이용 목적',
          body: '회원가입 및 계정 관리\n음악 프로필 및 맞춤형 서비스 제공\n서비스 운영 및 개선',
        },
        {
          heading: '3. 개인정보 보관 및 파기',
          body: '개인정보는 수집 및 이용 목적이 달성되거나 보관 기간이\n종료되면 관련 법령에 따라 파기해요.',
        },
        {
          heading: '4. 개인정보 보호',
          body: '회원의 개인정보는 안전하게 관리되며, 관련 법령에 따라\n보호돼요.',
        },
      ],
    },
  },
  {
    id: 'locationConsent',
    label: '위치정보 수집 및 이용 동의 (선택)',
    required: false,
    detail: {
      title: 'TUNEET 위치정보 수집 및 이용 동의 (선택)',
      top: '35.8rem',
      height: '37.4rem',
      sectionGap: '1rem',
      sections: [
        {
          heading: '1. 수집 및 이용 목적',
          body: '내 주변의 음악 취향이 비슷한 사용자 추천\n사용자 간 거리 정보 표시\n위치 기반 매칭 서비스 제공',
        },
        {
          heading: '2. 수집하는 정보',
          body: '서비스 이용 시 기기의 현재 위치정보(GPS 등)',
        },
        {
          heading: '3. 이용 및 보유 기간',
          body: '위치 기반 매칭 기능 이용 시 활용\n목적 달성 및 동의 철회 시 관련 법령에 따라 파기',
        },
        {
          heading: '4. 동의 거부 권리',
          body: '위치정보 수집 및 이용에 동의하지 않을 수 있어요.\n동의하지 않으면 주변 사용자 추천 및 거리 기반 매칭 기능\n이용이 제한될 수 있어요.\n동의는 언제든지 철회할 수 있어요.',
        },
      ],
    },
  },
]
