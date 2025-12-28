"use client";

import type { SlideProps } from "../types";

const keywords = [
  "Reasoning Model",
  "Context Engineering",
  "Vibe Coding",
  "Agents",
];

export default function KeywordsSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="max-w-4xl space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          2025 Core Keywords
        </h2>

        <ul className="space-y-6">
          {keywords.map((keyword) => (
            <li
              key={keyword}
              className="text-2xl md:text-3xl text-zinc-200 flex items-start gap-4"
            >
              <span className="text-zinc-600 mt-1">●</span>
              <span>{keyword}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
