# 🎧 TUNEET | Frontend

> **나만의 음악에서 우리의 음악으로, TUNEET**
>
> 좋아하는 장르·아티스트·노래로 음악 프로필을 만들고, 취향이 비슷한 사람을 추천받아
> 음악을 담은 편지와 방으로 연결되는 모바일 웹 서비스입니다.

- **서비스 주소**: https://www.tuneet.site
- **형태**: 모바일 웹 · PWA (홈 화면에 추가해 앱처럼 사용)

<br>

## 🖥️ FE Developer

| <a href="https://github.com/yangyangeeee"><img width="150" alt="/" src="https://avatars.githubusercontent.com/yangyangeeee" /></a> | <a href="https://github.com/2godong"><img width="150" alt="/" src="https://avatars.githubusercontent.com/2godong" /></a> |
| --- | --- |
| 양서윤 | 이소라 |

<br>

## ✨ 주요 기능

| 영역 | 기능 |
| --- | --- |
| **시작하기** | 이메일 회원가입·로그인(약관 동의), 토큰 자동 재발급 |
| **음악 프로필** | 닉네임·프로필 사진, 장르·아티스트·대표곡 선택, 유튜브 뮤직 연동으로 좋아요한 곡 불러오기(읽기 전용) |
| **홈** | 내 프로필 카드, 최근 피드, 취향이 비슷한 추천 유저 |
| **탐색** | 음악 피드 작성·수정·삭제, 좋아요, 노래를 담은 코멘트 보내기, 받은·보낸 코멘트 알림 |
| **매칭** | 취향·거리 기반 유저 추천, 상대 프로필의 공통 취향·취향 일치율, 차단 |
| **편지** | 특정 유저·랜덤 유저에게 노래를 담은 편지 보내기, 답장, 받은·보낸 편지함, 하루 발송 횟수 제한, 환영 편지 |
| **방** | 방 만들기(비밀번호 설정 가능), 초대 링크·QR로 초대·입장, 멤버별 취향 일치율, 방 피드, 함께 만드는 플레이리스트 |
| **마이페이지** | 프로필 수정, 좋아요 기록, 차단 관리, 설정(위치 공개·편지 수신·약관), 푸시 알림, 로그아웃·탈퇴 |
| **PWA·알림** | 홈 화면 설치, FCM 푸시 알림(코멘트·편지·답장 도착) |

<br>

## 🛠 기술 스택

| **역할** | **종류** | **선정 이유** |
| --- | --- | --- |
| Library | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> | 컴포넌트 단위로 UI를 나눠 재사용하고 관리하기 쉬움 |
| Programming Language | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> | 타입으로 오류를 미리 잡을 수 있어 규모가 커져도 안정적으로 유지보수 가능 |
| Styling | <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> | CSS-in-JS 방식으로 컴포넌트와 스타일을 함께 관리하고, 테마로 디자인 토큰을 통일 |
| Data Fetching | <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> | 인스턴스와 인터셉터로 공통 설정(기본 URL, 토큰, 에러 처리)을 한 곳에서 관리하고, JSON 자동 변환 지원 |
| Routing | <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"> | 중첩 레이아웃, 페이지 단위 지연 로딩(lazy), 진입 전 데이터 미리 받기(loader) 지원 |
| Push · PWA | <img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=Firebase&logoColor=white"> <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=PWA&logoColor=white"> | FCM으로 웹 푸시 알림, vite-plugin-pwa로 홈 화면 설치·오프라인 캐시 |
| Linting | <img src="https://img.shields.io/badge/oxlint-1A1A1A?style=for-the-badge&logoColor=white"> | ESLint보다 50~100배 빠른 린터로, Vite 공식 템플릿 기본 도구 |
| Formatting | <img src="https://img.shields.io/badge/prettier-000000?style=for-the-badge&logo=prettier&logoColor=F7B93E"> | 협업 시 일관된 코드 스타일 유지 |
| Package Manager | <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"> | 빠른 설치 속도와 적은 디스크 사용량, 엄격한 의존성 관리 |
| Deployment | <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> | 쉽고 빠른 배포 및 자동 CI/CD 지원, PR마다 미리보기 배포 제공 |
| Bundler | <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> | 빠른 개발 서버와 빌드 속도 |

<br>

## 🚀 시작하기

### 요구 사항

- **Node**: `22.x`
- **pnpm**: `10.x`
- **port 번호**: `5173` (Vite 기본값)

### 설치 및 실행

```bash
pnpm install
cp .env.example .env
pnpm dev
```

### 환경변수

| 이름 | 설명 |
| --- | --- |
| `VITE_API_BASE_URL` | 백엔드 API 서버 주소 |
| `VITE_FIREBASE_API_KEY` | Firebase 웹 앱 설정 |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase 웹 앱 설정 |
| `VITE_FIREBASE_PROJECT_ID` | Firebase 웹 앱 설정 |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase 웹 앱 설정 |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase 웹 앱 설정 |
| `VITE_FIREBASE_APP_ID` | Firebase 웹 앱 설정 |
| `VITE_FIREBASE_VAPID_KEY` | 웹 푸시용 VAPID 공개 키 |

### 명령어

```bash
pnpm dev                  # 개발 서버 실행
pnpm build                # 타입 검사 후 프로덕션 빌드
pnpm preview              # 빌드 결과 미리보기
pnpm typecheck            # 타입 검사
pnpm lint                 # 린트 검사 (oxlint)
pnpm format               # 코드 포맷 정리 (prettier)
pnpm generate-pwa-assets  # PWA 아이콘 생성
```

<br>

## 🧩 기술적 특징

- **빠른 화면 전환**: 모든 페이지를 `lazy`로 나눠 불러오고, 탭 이동 전 `loader`에서 피드·방·편지 데이터를 미리 요청합니다. 첫 화면이 뜬 뒤에는 남은 탭 페이지 코드를 유휴 시간에 미리 받아 둡니다.
- **안전한 인증 처리**: Axios 인터셉터가 401 응답에 토큰을 한 번만 재발급하고, 동시에 실패한 요청들은 같은 재발급 결과를 기다렸다가 다시 보냅니다. 네트워크·서버 오류로는 로그아웃시키지 않습니다.
- **요청 캐시**: 자주 바뀌지 않는 내 프로필·장르 목록은 짧은 시간 동안 같은 요청을 공유해 중복 호출을 줄이고, 수정 API 호출 시 캐시를 비웁니다.
- **비동기 안정성**: 화면을 떠난 뒤 늦게 도착한 응답이 상태를 덮어쓰지 않도록 모든 요청에 취소 가드를 두고, 전송·삭제·입장 버튼은 요청 중 중복 실행을 막습니다.
- **배포 안정성**: 새 버전 배포 후 이전 코드 조각을 불러오지 못하면 한 번만 자동 새로고침하고, 라우트 단위 에러 화면과 404 화면을 제공합니다.
- **모바일 우선 레이아웃**: 모바일 브라우저의 실제 화면 높이에 맞추고, 데스크톱에서는 휴대폰 크기 프레임 안에서 보여 줍니다.
- **초대 딥링크**: 방 초대 링크(`/invite/:code`)를 로그인 전에 열어도, 가입·로그인·프로필 설정을 마친 뒤 해당 방 입장 화면으로 이어집니다.

<br>

## ⌨️ Code Styling

- **camelCase**
  - 변수명, 함수명에 적용
  - 첫 글자는 소문자로 시작하고, 이어지는 단어의 첫 글자는 대문자로 씀
    - ex) handleDelete
  - 언더바 사용 X
- **PascalCase**
  - 컴포넌트명, 컴포넌트 파일명, 타입명에 적용
    - ex) MobileLayout.tsx, HomePage
- **UPPER_SNAKE_CASE**
  - 상수에 적용
    - ex) FRAME_MAX_WIDTH
- **훅**
  - `use`로 시작
    - ex) useAppHeight
- **import 경로**
  - 상대 경로 대신 `@/` 별칭 사용
    - ex) `import { theme } from '@/styles/theme'`
- **색상, 폰트 크기**
  - 값을 직접 쓰지 않고 `theme` 값 사용
    - ex) `${({ theme }) => theme.colors.primary}`

<br>

## 🔗 Git Convention

### 💫 Git Flow

```
main ← develop ← feat/fix/refactor
```

- main : 배포 브랜치
- develop : 개발 브랜치 (작업 브랜치가 merge되는 브랜치)
- feat : 페이지/기능별 브랜치
- fix : 버그 수정 브랜치
- refactor : 리팩토링/수정 브랜치

### 🔥 Commit Message Convention

- **커밋 유형**
  - Feat : 새로운 기능 추가
  - Fix : 버그 수정
  - Refactor : 코드 리팩토링
  - Style : UI(CSS) 수정
  - Docs : 문서 수정 (README 등)
  - Chore : 설정, 패키지 설치 등 기타 작업

- **형식**: `✨커밋유형: 상세설명`
- **예시**:
  - 🚧Chore: 프로젝트 초기 세팅
  - ✨Feat: 메인페이지 개발

### 🌿 Branch Convention

- **형식**: `브랜치종류/#이슈번호/상세기능`
- **브랜치 종류**: `feat`, `fix`, `refactor`, `chore`
- **예시**:
  - chore/#1/init
  - feat/#2/main-page

### 📋 Issue Convention

- **형식**: `[태그] 작업 요약`
- **태그 목록**: `Feat`, `Fix`, `Refactor`, `Style`, `Docs`, `Chore`
- **예시**:
  - [Feat] 페이지 퍼블리싱
  - [Chore] 프로젝트 초기 세팅

### Issue Template

`.github/ISSUE_TEMPLATE/issue_template.yml`

- 🏷️ **Type** : 작업 유형 체크 (Feat, Fix, Refactor, Style, Docs, Chore)
- 📄 **About** : 해당 이슈에서 작업할 내용
- 📝 **To-do** : 해당 이슈와 관련된 할 일
- 🎨 **Preview** : 작업하고자 하는 내용의 뷰 (선택)

## 🔄 Pull Request (PR) Convention

- **형식**: `[태그] 제목`
- **태그 목록**: `Feat`, `Fix`, `Refactor`, `Style`, `Docs`, `Chore`
- **예시**:
  - [Feat] Header 컴포넌트 구현
  - [Fix] Header 컴포넌트 버그 수정

<br>

## 📂 프로젝트 구조

```
📦Tuneet-FE
 ┣ 📁.github
 ┃  ┗ 📁ISSUE_TEMPLATE
 ┣ 📁.vscode
 ┣ 📂public
 ┃  ┣ 📁privacy
 ┃  ┣ 📁terms
 ┃  ┗ 📜firebase-messaging-sw.js
 ┣ 📁scripts
 ┣ 📂src
 ┃  ┣ 📁apis
 ┃  ┣ 📁assets
 ┃  ┣ 📂components
 ┃  ┃  ┣ 📁common
 ┃  ┃  ┗ 📁layout
 ┃  ┣ 📁constants
 ┃  ┣ 📁hooks
 ┃  ┣ 📂pages
 ┃  ┃  ┣ 📁explore
 ┃  ┃  ┣ 📁home
 ┃  ┃  ┣ 📁login
 ┃  ┃  ┣ 📁matching
 ┃  ┃  ┣ 📁my
 ┃  ┃  ┣ 📁not-found
 ┃  ┃  ┣ 📁oauth
 ┃  ┃  ┣ 📁onboarding
 ┃  ┃  ┣ 📁profile-setup
 ┃  ┃  ┗ 📁signup
 ┃  ┣ 📁routes
 ┃  ┣ 📁styles
 ┃  ┣ 📁types
 ┃  ┣ 📁utils
 ┃  ┣ 📜main.tsx
 ┃  ┗ 📜vite-env.d.ts
 ┣ 📜.editorconfig
 ┣ 📜.env.example
 ┣ 📜.oxlintrc.json
 ┣ 📜.prettierrc
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜tsconfig.json
 ┣ 📜vercel.json
 ┗ 📜vite.config.ts
```

- public : 파비콘·PWA 아이콘, 로그인 없이 볼 수 있는 약관 정적 페이지, FCM 서비스 워커
- scripts : PWA 아이콘 생성 스크립트
- src
  - apis : API 요청 함수 (Axios 인스턴스·인터셉터 포함)
  - assets : 이미지, 아이콘, 폰트
  - components
    - common : 여러 페이지에서 공통으로 쓰는 컴포넌트
    - layout : 레이아웃 컴포넌트 (헤더, 하단 탭, 에러 화면 등)
  - constants : 라우트 경로, 에러 문구 등 상수
  - hooks : 커스텀 훅
  - pages : 라우팅 페이지 (페이지 전용 컴포넌트는 각 페이지 폴더의 components에 둠)
  - routes : 라우터 설정, 로그인·프로필 설정 가드
  - styles : 전역 스타일, 테마, 레이아웃 변수, 공용 스타일
  - types : API 응답·화면 데이터 타입
  - utils : 인증 토큰, 푸시, 초대 링크 등 공용 함수
