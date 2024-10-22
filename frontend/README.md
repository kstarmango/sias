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
