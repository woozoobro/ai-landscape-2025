"use client";

import type { SlideProps } from "../types";

export default function IntroSlide({}: SlideProps) {
  return (
    <div className="text-center space-y-6">
      <h1
        className="text-6xl md:text-8xl font-bold text-white tracking-tight"
        style={{
          textShadow: "0 0 60px rgba(255,255,255,0.2)",
        }}
      >
        2025 AI Landscape
      </h1>

      <p className="text-2xl md:text-3xl text-zinc-400 font-light">
        Anthropic · OpenAI · Google
      </p>
    </div>
  );
}
