"use client";

import type { SlideProps } from "../types";

export default function IntroSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
            2025 생성형 AI 트렌드
          </h1>

          <p className="text-2xl md:text-3xl text-zinc-400 font-light">
            Anthropic · OpenAI · Google
          </p>
        </div>

        <div className="pt-8 border-t border-zinc-800 inline-block">
          <p className="text-lg text-zinc-500">인프런 라이브 · 2025.12</p>
        </div>
      </div>
    </div>
  );
}
