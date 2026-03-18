# CLAUDE.md — 박스로고 개발자 블로그

## 프로젝트 개요
- **사이트**: boxlogodev.com
- **목적**: 개발 블로그 + SaaS 홍보 + 포트폴리오 + 일상
- **프레임워크**: Next.js 16 + App Router + TypeScript (strict)

## 기술 스택
- Styling: Tailwind CSS v4 + CSS Variables (다크/라이트)
- Content: Velite + MDX (빌드 시 `.velite/` 생성)
- Theme: next-themes (attribute="class")
- Animation: Framer Motion
- Icons: Lucide React
- Deploy: Vercel

## 핵심 규칙
- `velite build`는 `next build` 전에 실행해야 함 (`npm run build`가 자동 처리)
- `.velite/` 디렉토리는 gitignore 대상 (빌드 아티팩트)
- Turbopack 사용 중 — webpack 플러그인 불가
- 콘텐츠: `src/content/posts/*.mdx`

## 카테고리
| 카테고리 | 영역 | 경로 |
|----------|------|------|
| ABAP, AI, Economy | 블로그 | /blog |
| ART, BOOK, Coffee, TRAVEL | 일상 | /daily |

## 디렉토리 구조
- `src/app/` — Next.js 페이지
- `src/components/` — layout, sections, ui, blog, mdx
- `src/lib/` — constants, utils, content 헬퍼
- `src/content/posts/` — MDX 블로그 글
- `scripts/` — 마이그레이션 스크립트

## 검증 명령어
```bash
npm run build        # velite + next build
npx tsc --noEmit     # 타입 체크
npm run lint         # ESLint
```
