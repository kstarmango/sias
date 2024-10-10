# 프론트엔드 프로젝트

## 프로젝트 개요

이 프로젝트는 React와 TypeScript를 사용하여 개발된 프론트엔드 애플리케이션입니다.

## 주요 기술 스택

- **언어**: TypeScript
- **프레임워크**: React
- **패키지 관리자**: pnpm
- **코드 스타일 도구**: Prettier, ESLint

## 파일 기반 라우팅

이 프로젝트는 파일 기반 라우팅을 사용하여 페이지를 관리합니다.

파일 기반 라우팅은 폴더 구조와 파일 이름을 통해 자동으로 라우트를 생성하는 방식으로, [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)를
활용하여 구현되었습니다.

예를 들어, 다음과 같은 폴더 구조가 있다고 가정합니다:

```text
src/
├── pages/
│   ├── index.tsx
│   ├── about.tsx
│   └── users/
│       └── [id].tsx
```

위 구조에 따라 라우트는 다음과 같이 자동으로 생성됩니다:

- `/` -> `pages/index.tsx`
- `/about` -> `pages/about.tsx`
- `/users/:id` -> `pages/users/[id].tsx` (동적 경로)
