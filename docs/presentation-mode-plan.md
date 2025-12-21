# Presentation Mode 구현 계획

> 작성일: 2025-12-21

## 개요

발표용 Presentation Mode 추가 - 행성 클릭 시 해당 회사의 이벤트를 시간순으로 탐색

## 핵심 결정사항

| 항목 | 결정 |
|------|------|
| 진입 방식 | 행성 클릭 → Presentation Mode / 노드 클릭 → 기존 상세패널 (둘 다 유지) |
| 타임라인 UI | 미니멀 도트 (하단에 월별 점들, 현재 위치 강조) |
| 네비게이션 | 키보드만 (←/→/Space/Esc) |

---

## 상태 구조

```typescript
// Scene.tsx에 추가
interface PresentationState {
  active: boolean;
  company: Company | null;
  currentIndex: number;
  sortedEvents: EventNode[];
}

const [presentation, setPresentation] = useState<PresentationState>({
  active: false,
  company: null,
  currentIndex: 0,
  sortedEvents: [],
});
```

---

## 구현 단계

### Phase 1: 상태 및 키보드 (기반)
**파일**: `Scene.tsx`

1. `PresentationState` 인터페이스 및 상태 추가
2. 헬퍼 함수:
   - `enterPresentationMode(company: Company)`
   - `exitPresentationMode()`
   - `goToNextEvent()` / `goToPrevEvent()`
3. 키보드 이벤트 리스너:
   - `→` / `Space`: 다음 이벤트
   - `←`: 이전 이벤트
   - `Esc`: 나가기

### Phase 2: 행성 클릭
**파일**: `SpaceGraph.tsx`, `Scene.tsx`

1. `SpaceGraphProps`에 `onPlanetClick` 추가
2. `Planet` 컴포넌트에 onClick 핸들러 추가
3. Scene에서 `handlePlanetClick` → `enterPresentationMode` 연결

### Phase 3: 노드 Dim 효과
**파일**: `SpaceGraph.tsx`

1. `SpaceGraphProps`에 추가:
   - `presentationMode: boolean`
   - `presentationCompany: Company | null`
2. `GraphNode`에 `dimmed` prop 추가
3. dimmed 상태일 때 opacity 0.3 (lerp로 부드럽게)

### Phase 4: 타임라인 바 UI
**파일**: `components/TimelineBar.tsx` (새 파일)

```typescript
interface TimelineBarProps {
  events: EventNode[];
  currentIndex: number;
  company: Company;
  visible: boolean;
}
```

- 하단 고정, 월별 도트 표시
- 현재 이벤트 강조 (company 색상)
- 슬라이드 인/아웃 애니메이션

### Phase 5: 카메라 통합
**파일**: `Scene.tsx`

1. Presentation Mode 진입 시 해당 행성으로 카메라 이동
2. 이벤트 전환 시 카메라는 그대로 유지 (행성 클러스터 뷰)
3. 나가기 시 Overview로 복귀

### Phase 6: 폴리싱
- 엣지 케이스 처리 (빈 회사, 빠른 키 입력)
- 애니메이션 튜닝
- 상세패널과 Presentation Mode 상호작용 정리

---

## 파일별 변경 사항

### Scene.tsx
- 상태: `presentation` 추가
- 함수: `enterPresentationMode`, `exitPresentationMode`, `goToNext/PrevEvent`
- useEffect: 키보드 이벤트 리스너
- 렌더링: `TimelineBar` 컴포넌트 추가
- Props: `SpaceGraph`에 `onPlanetClick`, `presentationMode`, `presentationCompany` 전달

### SpaceGraph.tsx
- Props: `onPlanetClick`, `presentationMode`, `presentationCompany` 추가
- Planet: `onClick` 핸들러 추가
- GraphNode: `dimmed` prop 및 opacity 애니메이션

### TimelineBar.tsx (새 파일)
- 하단 고정 타임라인 UI
- 월별 도트 + 현재 위치 표시

---

## 구현 순서 (의존성 기준)

```
Phase 1 (상태/키보드)
    ↓
Phase 2 (행성 클릭)
    ↓
Phase 5 (카메라) ← 여기까지 핵심 기능 완성
    ↓
Phase 3 (노드 Dim)
    ↓
Phase 4 (타임라인 바)
    ↓
Phase 6 (폴리싱)
```

---

## 예상 작업량

| Phase | 난이도 | 예상 |
|-------|--------|------|
| 1. 상태/키보드 | 낮음 | 20분 |
| 2. 행성 클릭 | 중간 | 30분 |
| 3. 노드 Dim | 중간 | 30분 |
| 4. 타임라인 바 | 중간 | 45분 |
| 5. 카메라 통합 | 낮음 | 20분 |
| 6. 폴리싱 | 낮음 | 20분 |

**총 예상**: 약 2.5시간

---

## UX 플로우

```
[Overview]
    │
    ├─ 노드 클릭 → 상세 패널 (기존)
    │
    └─ 행성 클릭 → [Presentation Mode]
                        │
                        ├─ → / Space: 다음 이벤트
                        ├─ ←: 이전 이벤트
                        ├─ 노드 클릭: 해당 이벤트로 이동 + 상세패널
                        └─ Esc: Overview로 복귀
```

---

## 시각적 상태

### Overview (기본)
- 모든 노드 opacity 1.0
- 타임라인 바 숨김
- 상세 패널 숨김 (노드 미선택 시)

### Presentation Mode
- 선택된 회사 노드: opacity 1.0, 현재 이벤트 강조
- 다른 회사 노드: opacity 0.3 (dim)
- 타임라인 바 표시 (하단)
- 상세 패널 표시 (현재 이벤트 정보)
