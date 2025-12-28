"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { SlideProps } from "../types";

export default function ToolUseSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col p-8 md:p-12 relative">
      {/* 타이틀 - 좌상단 */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl md:text-3xl text-zinc-400">비밀은</span>
        <h2 className="text-4xl md:text-5xl font-bold text-orange-400">
          Tool Use
        </h2>
      </motion.div>

      {/* SVG 다이어그램 - 크게 */}
      <motion.div
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img
          src="/claude-code-flow.svg"
          alt="Claude Code Tool Use Flow"
          className="w-full h-full max-h-[75vh] object-contain"
        />
      </motion.div>

      {/* 가이드 링크 버튼 - 우하단 */}
      <motion.a
        href="https://ai-landscape-2025.vercel.app/claude-code"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-300 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-lg">Claude Code 가이드</span>
        <ExternalLink className="w-4 h-4" />
      </motion.a>
    </div>
  );
}
