---
name: slide-design
description: 프레젠테이션 슬라이드 컴포넌트 생성. 새 슬라이드 추가, 슬라이드 디자인, 발표자료 레이아웃 요청 시 사용. React + TailwindCSS 기반 다크모드 UI.
---

# Slide Design System

슬라이드 뷰 전용 디자인 시스템. 미니멀 다크 테마.

## 필수 규칙

1. `"use client"` + `SlideProps` import
2. `registry.ts`에 등록 (순서 = 발표 순서)
3. 한 화면에 완결 (스크롤 금지)
4. 반응형 필수 (`md:` 프리픽스)

## 톤앤매너

- 검은 배경, 흰 텍스트
- 한 슬라이드 = 하나의 메시지
- 충분한 여백, 큰 대비

## 새 슬라이드 추가

```tsx
// components/slides/content/MySlide.tsx
"use client";

import type { SlideProps } from "../types";

export default function MySlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="max-w-4xl space-y-8">
        <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white">제목</h2>
        <p className="text-5xl md:text-6xl text-zinc-400">설명</p>
      </div>
    </div>
  );
}
```

```ts
// registry.ts에 추가
{
  meta: { id: "my-slide", title: "My Slide" },
  load: () => import("./content/MySlide"),
},
```

## 디자인 토큰

상세 색상/타이포/레이아웃은 [tokens.md](tokens.md) 참고.

핵심만:
- **최소 폰트: `text-5xl`** (text-4xl 이하 금지)
- **기본 굵기: `font-normal`** (강조 시에만 bold)
- 메인 타이틀: `text-white`, `text-7xl md:text-8xl lg:text-9xl font-bold`
- 섹션 제목: `text-white`, `text-6xl md:text-7xl lg:text-8xl font-bold`
- 부제목/본문: `text-zinc-400`, `text-5xl md:text-6xl`
- 래퍼: `w-full h-full flex items-center justify-center p-8 md:p-16`

## 슬라이드 유형

| 유형 | 특징 |
|------|------|
| 타이틀 | 중앙 정렬, 큰 제목 + 부제목 |
| 리스트 | 불릿 4-5개, `space-y-6` |
| 2단 | `flex gap-24`, 좌텍스트/우이미지 |
| 강조 | 숫자나 문장 하나만 크게 |

## 파일 구조

```
components/slides/
├── types.ts          # SlideProps
├── registry.ts       # 슬라이드 등록
├── SlidesView.tsx    # 메인 뷰어
└── content/          # 개별 슬라이드
```
