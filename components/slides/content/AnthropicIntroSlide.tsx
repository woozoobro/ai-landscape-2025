"use client";

import type { SlideProps } from "../types";

export default function AnthropicIntroSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="text-center space-y-6">
        <h1
          className="text-6xl md:text-8xl font-bold text-orange-400 tracking-tight"
          style={{
            textShadow: "0 0 60px rgba(251, 146, 60, 0.4)",
          }}
        >
          Anthropic
        </h1>

        <p className="text-2xl md:text-3xl text-zinc-400 font-light">
          "Depth of Work"
        </p>
      </div>
    </div>
  );
}
