"use client";

import { motion } from "framer-motion";
import type { SlideProps } from "../types";

const keywords = [
  { text: "추론 모델", delay: 0, duration: 4 },
  { text: "컨텍스트 엔지니어링", delay: 0.5, duration: 3.5 },
  { text: "나노바나나", delay: 1, duration: 4.2 },
  { text: "Veo", delay: 0.2, duration: 3.6 },
  { text: "바이브 코딩", delay: 0.7, duration: 3.8 },
  { text: "에이전트", delay: 0.3, duration: 4.5 },
];

export default function KeywordsSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16 overflow-hidden">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-7xl">
        {keywords.map((keyword) => (
          <motion.div
            key={keyword.text}
            className="px-8 py-4 rounded-full border border-zinc-700 bg-zinc-900/50"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: keyword.duration,
              delay: keyword.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-5xl md:text-7xl text-white font-normal whitespace-nowrap">
              {keyword.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
