"use client";

import type { SlideProps } from "../types";

export default function IntroSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="text-center space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
            2025 생성형 AI 트렌드
          </h1>

          <p className="text-5xl text-zinc-400">
            Anthropic · OpenAI · Google
          </p>
        </div>

        <div className="pt-8 border-t border-zinc-800 inline-block">
          <p className="text-xl md:text-2xl text-zinc-500">인프런 라이브 · 2025.12</p>
        </div>
      </div>
    </div>
  );
}
