# Design Tokens

슬라이드 디자인 상세 토큰.

## 색상

| 용도 | 클래스 |
|------|--------|
| 제목 | `text-white` |
| 부제목/설명 | `text-zinc-400` |
| 보조 텍스트 | `text-zinc-500` |
| 불릿/아이콘 | `text-zinc-600` |
| 구분선 | `border-zinc-800` |
| 긍정/성공 | `text-emerald-500` |
| 링크 | `text-blue-400` |
| 경고 | `text-orange-500` |

## 타이포그래피

| 요소 | 클래스 |
|------|--------|
| 메인 타이틀 | `text-6xl md:text-8xl font-bold` |
| 섹션 제목 | `text-5xl md:text-6xl font-bold` |
| 부제목 | `text-2xl md:text-3xl` |
| 리스트 아이템 | `text-2xl md:text-3xl` |
| 캡션 | `text-lg text-zinc-500` |

## 레이아웃

| 요소 | 클래스 |
|------|--------|
| 슬라이드 래퍼 | `w-full h-full flex items-center justify-center` |
| 기본 패딩 | `p-8 md:p-16` |
| 넓은 패딩 | `p-12 md:p-20` |
| 최대 너비 | `max-w-4xl` 또는 `max-w-5xl` |
| 수직 간격 | `space-y-6` ~ `space-y-8` |
| 2단 갭 | `gap-24 md:gap-32` |

## 불릿 스타일

```tsx
{/* 원형 */}
<span className="text-zinc-600 mt-1">●</span>

{/* 사각형 */}
<span className="text-zinc-500 mt-1">■</span>
```

## 애니메이션 (선택)

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  ...
</motion.div>
```
