"use client";

import type { SlideProps } from "../types";

export default function OpenAIIntroSlide({}: SlideProps) {
  return (
    <div className="text-center space-y-6">
      <h1
        className="text-6xl md:text-8xl font-bold text-emerald-400 tracking-tight"
        style={{
          textShadow: "0 0 60px rgba(52, 211, 153, 0.4)",
        }}
      >
        OpenAI
      </h1>

      <p className="text-2xl md:text-3xl text-zinc-400 font-light">
        "Breadth of Daily Life"
      </p>
    </div>
  );
}
