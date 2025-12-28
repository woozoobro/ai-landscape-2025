"use client";

import { motion } from "framer-motion";
import type { SlideProps } from "../types";

const keywords = [
  { text: "Reasoning Model", delay: 0, duration: 4 },
  { text: "Context Engineering", delay: 0.5, duration: 3.5 },
  { text: "Veo", delay: 1, duration: 4.2 },
  { text: "Vibe Coding", delay: 0.7, duration: 3.8 },
  { text: "Agents", delay: 0.3, duration: 4.5 },
];

export default function KeywordsSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16 overflow-hidden">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-6xl">
        {keywords.map((keyword) => (
          <motion.div
            key={keyword.text}
            className="px-8 py-4 rounded-full border border-zinc-700 bg-zinc-900/50"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: keyword.duration,
              delay: keyword.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-5xl md:text-6xl text-white font-normal whitespace-nowrap">
              {keyword.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
