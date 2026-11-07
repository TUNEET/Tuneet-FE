# 🎧 TUNEET | Frontend

## 🖥️ FE Developer

| <a href="https://github.com/yangyangeeee"><img width="150" alt="/" src="https://avatars.githubusercontent.com/yangyangeeee" /></a> | <a href="https://github.com/2godong"><img width="150" alt="/" src="https://avatars.githubusercontent.com/2godong" /></a> |
| --- | --- |
| 양서윤 | 이소라 |

## 🛠 기술 스택

| **역할** | **종류** | **선정 이유** |
| --- | --- | --- |
| Library | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> | 컴포넌트 단위로 UI를 나눠 재사용하고 관리하기 쉬움 |
| Programming Language | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> | 타입으로 오류를 미리 잡을 수 있어 규모가 커져도 안정적으로 유지보수 가능 |
| Styling | <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> | CSS-in-JS 방식으로 컴포넌트와 스타일을 함께 관리하고, 테마로 디자인 토큰을 통일 |
| Data Fetching | <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> | 인스턴스와 인터셉터로 공통 설정(기본 URL, 토큰, 에러 처리)을 한 곳에서 관리하고, JSON 자동 변환 지원 |
| Routing | <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"> | 직관적인 라우팅 관리 및 중첩 레이아웃 지원 |
| Linting | <img src="https://img.shields.io/badge/oxlint-1A1A1A?style=for-the-badge&logoColor=white"> | ESLint보다 50~100배 빠른 린터로, Vite 공식 템플릿 기본 도구 |
| Formatting | <img src="https://img.shields.io/badge/prettier-000000?style=for-the-badge&logo=prettier&logoColor=F7B93E"> | 협업 시 일관된 코드 스타일 유지 |
| Package Manager | <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"> | 빠른 설치 속도와 적은 디스크 사용량, 엄격한 의존성 관리 |
| Deployment | <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> | 쉽고 빠른 배포 및 자동 CI/CD 지원, PR마다 미리보기 배포 제공 |
| Bundler | <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> | 빠른 개발 서버와 빌드 속도 |

## ✅ Bundler & Package Manager

- **Node 버전**: `22` 이상
- **port 번호**: `5173` (Vite 기본값)
- **pnpm 명령어**

```
pnpm install       # 전체 설치
pnpm add 라이브러리  # 라이브러리 설치
pnpm dev           # 개발 서버 실행
pnpm build         # 빌드
pnpm lint          # 린트 검사
pnpm format        # 코드 포맷 정리
pnpm typecheck     # 타입 검사
```

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

## 📂 프로젝트 구조

```
📦Tuneet-FE
 ┣ 📁.github
 ┃  ┗ 📁ISSUE_TEMPLATE
 ┣ 📁.vscode
 ┣ 📂public
 ┣ 📂src
 ┃  ┣ 📁apis
 ┃  ┣ 📁assets
 ┃  ┣ 📂components
 ┃  ┃  ┣ 📁common
 ┃  ┃  ┗ 📁layout
 ┃  ┣ 📁constants
 ┃  ┣ 📁hooks
 ┃  ┣ 📁pages
 ┃  ┣ 📁routes
 ┃  ┣ 📂styles
 ┃  ┃  ┣ 📜GlobalStyle.ts
 ┃  ┃  ┣ 📜layout.ts
 ┃  ┃  ┣ 📜styled.d.ts
 ┃  ┃  ┗ 📜theme.ts
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
 ┗ 📜vite.config.ts
```

- public : 파비콘 등 정적 파일
- src
  - apis : API 요청 함수 (Axios 인스턴스 포함)
  - assets : 이미지, 아이콘 등 에셋
  - components
    - common : 여러 페이지에서 공통으로 쓰는 컴포넌트
    - layout : 레이아웃 컴포넌트
  - constants : 상수
  - hooks : 커스텀 훅
  - pages : 라우팅 페이지
  - routes : 라우터 설정
  - styles : 전역 스타일, 테마, 레이아웃 변수
  - types : 공통 타입
  - utils : 전역으로 쓰는 함수
