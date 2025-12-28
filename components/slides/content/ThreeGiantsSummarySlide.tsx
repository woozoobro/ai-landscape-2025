"use client";

import { motion } from "framer-motion";
import type { SlideProps } from "../types";

const companies = [
  { name: "Anthropic", keyword: "깊이", color: "text-orange-400" },
  { name: "OpenAI", keyword: "넓이", color: "text-emerald-400" },
  { name: "Google", keyword: "크기", color: "text-blue-400" },
];

export default function ThreeGiantsSummarySlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 gap-12">
      {/* 3사 키워드 */}
      <div className="flex items-center gap-8 md:gap-12">
        {companies.map((company, i) => (
          <motion.div
            key={company.name}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
          >
            <span className="text-xl md:text-2xl text-zinc-500">{company.name}</span>
            <span className={`text-5xl md:text-6xl lg:text-7xl font-bold ${company.color}`}>
              {company.keyword}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 구분선 */}
      <motion.div
        className="w-32 h-px bg-zinc-700"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      {/* 메시지 */}
      <motion.p
        className="text-2xl md:text-3xl lg:text-4xl text-zinc-300 text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        서로 다른 비전, 하나의 목표
        <br />
        <span className="text-white font-medium">새로운 AI 생태계</span>
      </motion.p>
    </div>
  );
}
