프론트엔드 프로젝트의 README.md를 작성해드리겠습니다:

```markdown
# 칭찬요정 프론트엔드

칭찬요정은 서로의 장점을 발견하고 칭찬하며, 긍정적인 소통을 만들어가는 커뮤니티 서비스입니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- Styled Components
- Framer Motion
- Axios
- React Router DOM

## 시작하기

### 실행 조건

- Node.js 16.0.0 이상
- pnpm 8.0.0 이상

### 환경 설정

1. 프로젝트를 클론합니다.
```bash
git clone [repository-url]
cd [project-name]
```

2. 환경 변수 파일을 생성합니다.
```bash
cp .env.example .env
```

3. .env 파일을 수정하여 필요한 환경변수를 설정합니다.
```env
VITE_API_URL=http://localhost:3000
```

### 설치 및 실행

1. 의존성을 설치합니다.
```bash
pnpm install
```

2. 개발 서버를 실행합니다.
```bash
pnpm dev
```

3. 브라우저에서 `http://localhost:3000`으로 접속합니다.

## 빌드

프로덕션 빌드를 생성하려면:
```bash
pnpm build
```

빌드된 결과물을 미리보려면:
```bash
pnpm preview
```

## 개발 서버 설정

`vite.config.ts`에서 다음과 같이 설정되어 있습니다:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 로컬 IP로 접근 가능
    port: 3000,
  },
})
```

## 프로젝트 구조

```
src/
├── api/          # API 관련 설정 및 호출
├── components/   # 재사용 가능한 컴포넌트
├── pages/        # 페이지 컴포넌트
├── hooks/        # 커스텀 훅
├── store/        # 상태 관리
├── styles/       # 전역 스타일 및 테마
├── types/        # TypeScript 타입 정의
└── utils/        # 유틸리티 함수
```

## 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm preview`: 빌드된 결과물 미리보기
- `pnpm lint`: ESLint 검사
- `pnpm format`: Prettier로 코드 포맷팅