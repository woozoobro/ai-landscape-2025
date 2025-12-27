"use client";

import type { SlideProps } from "../types";

export default function GoogleIntroSlide({}: SlideProps) {
  return (
    <div className="text-center space-y-6">
      <h1
        className="text-6xl md:text-8xl font-bold text-blue-400 tracking-tight"
        style={{
          textShadow: "0 0 60px rgba(96, 165, 250, 0.4)",
        }}
      >
        Google
      </h1>

      <p className="text-2xl md:text-3xl text-zinc-400 font-light">
        "Scale of the Platform"
      </p>
    </div>
  );
}
