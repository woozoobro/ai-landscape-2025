"use client";

import { slides } from "@/app/data/slides";
import SlideRenderer from "./SlideRenderer";
import SlideProgress from "./SlideProgress";

interface SlidesViewProps {
  visible: boolean;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function SlidesView({
  visible,
  currentIndex,
  onNavigate,
}: SlidesViewProps) {
  const currentSlide = slides[currentIndex];

  if (!currentSlide) return null;

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 메인 슬라이드 영역 */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <SlideRenderer slide={currentSlide} />
      </div>

      {/* 하단 진행률 표시 */}
      <SlideProgress
        current={currentIndex}
        total={slides.length}
        onNavigate={onNavigate}
      />

      {/* 키보드 힌트 */}
      <div className="fixed bottom-6 left-6 text-zinc-600 text-xs font-mono flex items-center gap-4">
        <span>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
            Tab
          </kbd>{" "}
          Space View
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 ml-1">
            →
          </kbd>{" "}
          Navigate
        </span>
      </div>

      {/* 슬라이드 번호 */}
      <div className="fixed top-6 right-6 text-zinc-500 text-sm font-mono">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
}
