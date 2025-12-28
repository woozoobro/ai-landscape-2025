"use client";

import type { SlideProps } from "../types";

export default function PaceSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="text-center space-y-6 md:space-y-8">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white tracking-tight">
          따라가기 힘드시죠?
        </h2>
        <p className="text-xl md:text-2xl lg:text-6xl text-zinc-400 font-normal">
          생성형 AI, 발전 속도가 너무 빠릅니다
        </p>
      </div>
    </div>
  );
}
