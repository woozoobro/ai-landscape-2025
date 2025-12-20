# AI Landscape 2025 - 개발 진행 상황

> 마지막 업데이트: 2025-12-20

## 프로젝트 개요

2025년 생성형 AI 3사(Anthropic, OpenAI, Google)의 주요 발표를 3D 인터랙티브 타임라인으로 시각화하는 프로젝트.

- **목적**: 인프런 라이브 세션 발표 보조 자료
- **컨셉**: 우주 + Obsidian Graph View 스타일
- **기술 스택**: Next.js 16, React 19, TailwindCSS v4, Three.js (React Three Fiber)

---

## 현재 구현 상태

### 완료된 기능

#### 1. 3D 시각화 기본 구조
- **행성-위성 구조**: 3개 회사를 행성으로, 각 이벤트를 위성(노드)으로 표현
- **행성 위치** (삼각형 배치):
  - Anthropic: [-22, 0, 0] (좌측, 주황색)
  - OpenAI: [22, 0, 0] (우측, 초록색)
  - Google: [0, 5, -25] (후방, 파란색)

#### 2. 노드 배치 시스템
- **Fibonacci Sphere 분포**: 각 회사 행성 주변에 균등 배치
- **Force Simulation**: 노드 간 겹침 방지
- **크기**: importance(1-5)에 따라 차등 (NODE_SIZE_CONFIG로 조정 가능)

```typescript
// SpaceGraph.tsx 내 설정
const NODE_SIZE_CONFIG = {
  baseSize: 0.35,           // importance 1의 기본 크기
  sizePerImportance: 0.12,  // importance 당 추가 크기
};
```

#### 3. 진입 애니메이션 시퀀스
1. **카메라 zoom-in**: 먼 우주(0, 80, 180)에서 기본 뷰(0, 30, 55)로 이동
2. **행성 순차 출현**: Anthropic → OpenAI → Google (0.3초 간격, bounce 효과)
3. **노드 순차 출현**: 행성 애니메이션 후 날짜순 40ms 간격 등장

#### 4. 배경 효과
- **Stars**: @react-three/drei Stars 컴포넌트
- **Nebula**: 각 회사 영역에 Billboard 방식 구름 효과
- **DustParticles**: 부유하는 먼지 파티클

#### 5. 인터랙션
- **노드 클릭**: 상세 정보 패널 표시 (우측 슬라이드, z-index: 2000)
- **노드 호버**: 마우스 따라다니는 툴팁 (화면 고정 크기, z-index: 99999)
- **카메라 컨트롤**: 줌/팬/회전 (CameraControls)
- **노드 선택 시**: 해당 회사 클러스터로 카메라 이동
- **라벨 표시**: 항상 표시 (zIndexRange 설정으로 UI와 자연스럽게 레이어링)

#### 6. 노드 애니메이션
- **Floating**: 모든 노드 위아래 부유 효과 (amplitude: 0.15)
- **Pulse**: importance 5 노드 글로우 펄스 효과
- **행성 자전**: 각 행성 천천히 회전 (rotation.y += 0.002)

#### 7. 후처리 효과
- **Bloom**: 이중 레이어 (코어 글로우 + 분위기)
- **Vignette**: 화면 가장자리 어둡게

---

## 파일 구조

```
components/
├── Scene.tsx           # 메인 Canvas, 카메라 컨트롤, UI 오버레이
├── SpaceGraph.tsx      # 3D 그래프 (행성, 노드, 조명)
├── Nebula.tsx          # 배경 성운 효과 (Billboard)
├── DustParticles.tsx   # 먼지 파티클 시스템
└── nodes/
    └── CompanyNode.tsx # (현재 미사용)

app/
├── page.tsx            # 메인 페이지
├── globals.css         # 글로벌 스타일
└── data/
    └── events.ts       # 이벤트 데이터 (37개)
```

---

## 데이터 구조

```typescript
// app/data/events.ts
interface EventNode {
  id: string;
  label: string;
  company: "Anthropic" | "OpenAI" | "Google";
  date: string;           // "2025-MM" 형식
  description: string;
  importance: 1 | 2 | 3 | 4 | 5;
}
```

- **Anthropic**: 17개 이벤트
- **OpenAI**: 14개 이벤트
- **Google**: 13개 이벤트
- **총 44개 이벤트**

---

## 향후 개선 아이디어

### 우선순위 높음
- [ ] 연결선 표시 (hover/select 시에만)
- [ ] 타임라인 인디케이터 (하단 월별 바)
- [x] ~~importance 5 노드 pulse 효과~~ ✅ 완료

### 우선순위 중간
- [ ] 노드에서 파티클 방출 효과
- [ ] 클릭 시 ripple/shockwave 효과
- [ ] 자동 재생 모드 (시간순 하이라이트)

### 우선순위 낮음
- [ ] 사운드 효과
- [ ] 가이드 투어 모드
- [ ] 모바일 최적화

### 완료된 개선 사항 (2025-12-20)
- [x] Scene 회전 제거 (Nebula 동기화 문제 해결)
- [x] 호버 툴팁 개선 (마우스 커서 따라다니는 화면 고정 크기)
- [x] zIndexRange 설정으로 라벨/UI 레이어링 개선
- [x] 선택 시에도 모든 라벨 표시 유지

---

## 알려진 이슈

- 없음 (현재 기준)

---

## 개발 명령어

```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 린트
npm run lint
```

---

## 새 세션 시작 시 참고

1. 이 문서(`docs/progress.md`) 읽기
2. `components/SpaceGraph.tsx`가 핵심 파일
3. 노드 크기 조정: `NODE_SIZE_CONFIG` 수정
4. 행성 위치 조정: `PLANET_POSITIONS` 수정 (SpaceGraph.tsx, Nebula.tsx 둘 다)
5. 이벤트 데이터: `app/data/events.ts`
