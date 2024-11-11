# Monorepo 프로젝트

이 저장소는 `pnpm-workspace`를 사용하여 여러 패키지를 관리하는 Monorepo 프로젝트입니다.

## 프로젝트 구조

```
frontend/
├── packages/
│   ├── map2d/         # 2D 지도 뷰어 애플리케이션
│   ├── map3d/         # 3D 지도 뷰어 애플리케이션
│   └── shared/        # 공용 유틸리티 및 컴포넌트
├── pnpm-workspace.yaml # pnpm workspace 설정 파일
├── package.json        # 최상위 프로젝트 설정 파일
└── README.md           # 프로젝트 설명 파일
```

* 추천 프로젝트 구조
```
src/
├── assets/               # 이미지, 폰트, 스타일과 같은 정적 자원
│   ├── images/           # 이미지 파일
│   ├── fonts/            # 폰트 파일
│   └── styles/           # 스타일 파일
├── components/           # 재사용 가능한 컴포넌트들
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.styles.ts
│   └── Modal/
│       ├── Modal.tsx
│       └── Modal.styles.ts
├── contexts/             # React Context API 관련 파일
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/                # 프로젝트 전반에서 사용되는 커스텀 훅들
│   ├── useAuth.ts
│   └── useFetch.ts
├── layouts/              # 페이지의 공통 레이아웃 컴포넌트를 저장
│   ├── MainLayout.tsx
│   └── AuthLayout.tsx
├── pages/                # 각 페이지 컴포넌트들
│   ├── Home/
│   │   ├── HomePage.tsx
│   │   └── HomePage.test.tsx
│   ├── Login/
│   │   ├── LoginPage.tsx
│   │   └── LoginPage.test.tsx
│   └── NotFound/
│       └── NotFoundPage.tsx
├── routes/               # 라우팅 관련 파일
│   └── AppRoutes.tsx
├── services/             # API 호출을 담당하는 서비스 파일
│   ├── axiosInstance.ts  // Axios configuration
│   ├── authService.ts    // Authentication related API calls
│   └── userService.ts    // User related API calls
├── stores/               # 전역 상태 관리 관련 파일
│   └── authStore.ts
├── types/                # TypeScript에서 사용하는 타입 정의 파일
│   └── authTypes.ts
├── utils/                # 프로젝트 전반에서 사용되는 유틸리티 함수들
│   └── formatDate.ts
├── App.tsx               # 라우팅 및 전역 상태 관리 설정
└── index.tsx             # React 애플리케이션 진입점으로 ReactDOM을 이용해 앱을 랜더링
```

## 설치 및 실행 방법

### 1. 환경 설정

프로젝트를 실행하기 위해서는 다음과 같은 도구들이 필요합니다:

- [Node](https://nodejs.org/) (권장 버전: 20 이상)
- [pnpm](https://pnpm.io/) (최신 버전 권장)

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 실행

* map2d 프로젝트 실행
    ```bash
    pnpm map2d dev
    ```
* map3d 프로젝트 실행
    ```bash
    pnpm map3d dev
    ```

### 3. 빌드

* map2d 프로젝트 빌드
    ```bash
    pnpm map2d build
    ```
* map3d 프로젝트 빌드
    ```bash
    pnpm map3d build
    ```

빌드된 파일은 각 패키지의 `dist` 폴더에 생성됩니다.
