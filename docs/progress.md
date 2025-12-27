# AI Landscape 2025 - 개발 진행 상황

- [x] 타임라인뷰 구현 어떻게 할지 (한번 쫙 정리된 내용 필요할듯) → Dual View Mode로 구현 완료

> 마지막 업데이트: 2025-12-28

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
  - Anthropic: [-30, 0, 1] (좌측, 주황색)
  - OpenAI: [30, 0, 1] (우측, 초록색)
  - Google: [0, 5, -35] (후방, 파란색)
- **동기화 필요 파일**: SpaceGraph.tsx, Scene.tsx, Nebula.tsx (PLANET_POSITIONS)

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
- **노드 클릭**: 상세 정보 패널 표시 (우측 슬라이드, 450px, z-index: 2000)
- **노드 호버**: 마우스 따라다니는 툴팁 (화면 고정 크기, z-index: 99999)
- **행성 클릭**: Presentation Mode 진입
- **카메라 컨트롤**: 줌/팬/회전 (CameraControls)
- **노드 선택 시 카메라 동작**:
  - `setViewOffset`으로 패널 보정 (뷰포트 자체를 왼쪽으로 오프셋)
  - 각 행성별 카메라 각도 조정 (다른 행성 가림 처리)
  - offset 애니메이션 (lerp 0.02로 부드럽게 전환)
- **라벨 표시**: 항상 표시 (zIndexRange 설정으로 UI와 자연스럽게 레이어링)

#### 8. Dual View Mode (듀얼 뷰 모드) ✅ NEW
- **두 개의 독립적인 뷰**: Space View (3D) ↔ Slides View (2D PPT)
- **Tab 키로 전환**: 부드러운 opacity fade 트랜지션 (300ms, Tailwind)
- **독립적 상태 관리**: 각 뷰가 자체 인덱스/상태 유지
- **키보드 네비게이션**:
  - `Tab`: 뷰 전환
  - `←/→/Space`: 슬라이드/이벤트 네비게이션
  - `Esc`: Space View 복귀 또는 Presentation Mode 종료
- **슬라이드 타입**: title, content, bullets, image, comparison
- **관련 파일**:
  - Scene.tsx (뷰 상태 관리, 키보드 핸들링)
  - components/slides/ (SlidesView, SlideRenderer, SlideProgress)
  - app/data/slides.ts (슬라이드 데이터)
- **구현 완료**: 2025-12-28

#### 9. Presentation Mode (발표 모드) ✅
- **진입**: 행성 클릭 시 해당 회사의 이벤트를 시간순으로 탐색
- **키보드 네비게이션**:
  - `→` / `Space`: 다음 이벤트
  - `←`: 이전 이벤트
  - `Esc`: Overview로 복귀
- **노드 Dim 효과**: 선택된 회사 외 노드들 opacity 0.25로 dim (lerp 애니메이션 0.08)
- **타임라인 바**: 하단에 월별 도트 표시, 현재 이벤트 강조, 클릭으로 이동 가능
- **상세 패널**: 현재 이벤트 정보 자동 표시, 노드 클릭 시 인덱스 동기화
- **관련 파일**: Scene.tsx (상태/키보드), SpaceGraph.tsx (dim 효과), TimelineBar.tsx (UI)
- **구현 완료**: 2025-12-21

#### 6. 노드 애니메이션
- **Floating**: 모든 노드 위아래 부유 효과 (amplitude: 0.15)
- **Pulse**: importance 5 노드 글로우 펄스 효과
- **행성 자전**: 각 행성 천천히 회전 (rotation.y += 0.002)

#### 7. 후처리 효과
- **Bloom**: 단일 패스 최적화 (threshold: 0.3, intensity: 1.4, radius: 0.65)
- **Vignette**: 화면 가장자리 어둡게

---

## 파일 구조

```
components/
├── Scene.tsx           # 메인 Canvas, 카메라 컨트롤, UI 오버레이, Dual View 상태
├── SpaceGraph.tsx      # 3D 그래프 (행성, 노드, 조명, dim 효과)
├── TimelineBar.tsx     # Presentation Mode 타임라인 UI (하단 도트)
├── Nebula.tsx          # 배경 성운 효과 (Billboard)
├── DustParticles.tsx   # 먼지 파티클 시스템
├── slides/             # Slides View (PPT 모드) 컴포넌트
│   ├── SlidesView.tsx      # 슬라이드 뷰 컨테이너
│   ├── SlideRenderer.tsx   # 슬라이드 타입별 렌더러
│   └── SlideProgress.tsx   # 하단 진행률 도트
└── nodes/
    └── CompanyNode.tsx # (현재 미사용)

app/
├── page.tsx            # 메인 페이지
├── globals.css         # 글로벌 스타일
└── data/
    ├── events.ts       # 이벤트 데이터 (37개)
    └── slides.ts       # 슬라이드 데이터 (PPT 콘텐츠)
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
  media?: {
    type: "image" | "webm" | "mp4";
    src: string;          // "/filename.webm" 또는 "/filename.png"
  };
  sources?: Array<{
    label?: string;       // "공식 발표", "문서" 등
    url: string;
  }>;
}
```

- **Anthropic**: 8개 이벤트
- **OpenAI**: 13개 이벤트
- **Google**: 14개 이벤트
- **총 35개 이벤트**

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
- [ ] 성능 최적화 Option B (필요시)
  - InstancedMesh로 노드 렌더링 (draw calls 37 → 1-3)
  - useFrame 훅 통합 (70+ → 5개 이하)
  - frameloop="demand" + invalidate() 수동 제어

### 우선순위 낮음
- [ ] 사운드 효과
- [ ] 가이드 투어 모드
- [ ] 모바일 최적화

### 완료된 개선 사항 (2025-12-28) - 2차
- [x] **Dual View Mode 구현**
  - Space View (3D) ↔ Slides View (2D PPT) 전환
  - Tab 키로 뷰 전환, 부드러운 opacity fade (Tailwind 300ms)
  - 각 뷰 독립적 상태 유지
- [x] **성능 최적화 (Option A)**
  - HTML 라벨 Lazy 렌더링: 37개 DOM → hover/selected만 (0-2개)
  - Bloom 단일 패스: 2개 → 1개 (GPU 부하 ~50% 감소)
  - frameloop 기본값 유지로 뷰 전환 시 렌더 지연 해결

### 완료된 개선 사항 (2025-12-28) - 1차
- [x] **상세 패널 미디어 표시**
  - 이벤트에 media 필드가 있으면 이미지/비디오 렌더링
  - 지원 형식: image, webm, mp4
- [x] **비디오 음소거 토글**
  - 비디오 우측 하단에 토글 버튼 추가
  - 기본값 muted (자동재생 호환), 클릭 시 소리 켜기/끄기
- [x] **이벤트 데이터 보강**
  - sources 필드: 공식 발표, 문서 등 출처 링크
  - media 필드: 이미지/비디오 미디어 첨부
  - Google 이벤트 14개로 확장 (AI Studio 추가)

### 완료된 개선 사항 (2025-12-21)
- [x] **Presentation Mode 구현**
  - 행성 클릭으로 발표 모드 진입
  - 키보드 네비게이션 (←/→/Space/Esc)
  - 비활성 회사 노드 Dim 효과 (opacity 0.25, lerp 애니메이션)
  - TimelineBar 컴포넌트 (하단 도트 UI, 클릭 이동)
  - 상세 패널 자동 표시 및 인덱스 동기화
- [x] **노드 선택 시 카메라 시스템 전면 개선**
  - `setViewOffset` 도입: 패널(450px) 고려한 뷰포트 오프셋
  - 카메라 회전 자연스러움 유지 (카메라 위치가 아닌 뷰포트로 보정)
  - offset 애니메이션: lerp로 부드럽게 전환 (점프 현상 해결)
- [x] **행성별 카메라 각도 설정**
  - Anthropic: 위-왼쪽에서 (x:-12, y:28, z:35) → Google 가림
  - OpenAI: 위-오른쪽에서 (x:12, y:28, z:35) → Google 가림
  - Google: 위에서 (x:0, y:28, z:38) → Anthropic/OpenAI 가림
- [x] **행성 위치 조정** (적당한 간격으로 재배치)
  - [-28,0,0] → [-30,0,1], [28,0,0] → [30,0,1], [0,5,-32] → [0,5,-35]
- [x] 노드 선택 시 줌인 거리 완화
- [x] **성능 최적화**
  - **Geometry 공유**: `SharedGeometries` 객체로 144개 → 6개 인스턴스 (96% 감소)
  - **DustParticles GPU 전환**: CPU 기반 애니메이션 → ShaderMaterial (useFrame O(n) → O(1))
  - **라벨 줌 레벨 최적화**: 원거리(zoomLevel="far")에서 Html 라벨 숨김

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
4. 행성 위치 조정: `PLANET_POSITIONS` 수정 (**SpaceGraph.tsx, Scene.tsx, Nebula.tsx 3곳 동기화 필수**)
5. 이벤트 데이터: `app/data/events.ts`
6. 카메라 관련 설정: `Scene.tsx`
   - `PANEL_WIDTH`: 패널 너비 (현재 450)
   - `cameraOffsets`: 행성별 카메라 각도
   - `setViewOffset`: 패널 보정용 뷰포트 오프셋
