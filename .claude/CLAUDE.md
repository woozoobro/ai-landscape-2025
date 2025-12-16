# AI Landscape 2025

2025년 생성형 AI 트렌드를 3D 인터랙티브 타임라인으로 시각화한 웹사이트

## 프로젝트 목적

- 인프런 라이브 세션 "(무료 Live) 2025 생성형 AI 트렌드 총 정리" 보조 자료
- OpenAI / Google / Anthropic 3사의 2025년 주요 발표를 타임라인으로 시각화
- 무료 공개 프로젝트

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TailwindCSS v4
- **3D**: React Three Fiber + @react-three/drei + @react-three/postprocessing
- **Language**: TypeScript

## 개발 진행 상황

**반드시 `docs/progress.md` 참조** - 현재 구현 상태, 파일 구조, 향후 계획 등 상세 기록

## 프로젝트 구조

```
ai-landscape-2025/
├── app/                    # Next.js 페이지
│   ├── page.tsx            # 메인 페이지
│   └── data/events.ts      # 이벤트 데이터 (37개)
├── components/             # React 컴포넌트
│   ├── Scene.tsx           # 메인 Canvas, 카메라, UI
│   ├── SpaceGraph.tsx      # 3D 그래프 핵심 (행성, 노드)
│   ├── Nebula.tsx          # 배경 성운
│   └── DustParticles.tsx   # 먼지 파티클
├── docs/                   # 문서
│   ├── progress.md         # 개발 진행 상황 (필독)
│   └── inflearn-live.md    # 3사 트렌드 정리
└── .claude/                # Claude Code 설정
```

## 핵심 파일

- **`components/SpaceGraph.tsx`**: 3D 시각화 핵심 로직
- **`app/data/events.ts`**: 이벤트 데이터 (importance 조정 가능)
- **`docs/progress.md`**: 개발 현황 및 향후 계획

## 빠른 시작

```bash
npm run dev  # localhost:3000
```

## 주요 설정값 위치

- 노드 크기: `SpaceGraph.tsx` → `NODE_SIZE_CONFIG`
- 행성 위치: `SpaceGraph.tsx`, `Nebula.tsx` → `PLANET_POSITIONS`
- 카메라 위치: `Scene.tsx` → `CAMERA_START`, `CAMERA_DEFAULT`
