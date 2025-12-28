"use client";

import { motion } from "framer-motion";
import { MessageSquare, FileEdit, HelpCircle, X, Check } from "lucide-react";
import type { SlideProps } from "../types";

export default function ClaudeCodePrincipleSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-8">
      {/* 타이틀 */}
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Claude Code의 원리
      </motion.h2>

      {/* 비교 섹션 */}
      <div className="flex flex-col gap-6 mt-4">
        {/* LLM 한계 */}
        <motion.div
          className="flex items-center gap-4 p-5 rounded-xl bg-zinc-900/60 border border-zinc-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MessageSquare className="w-10 h-10 text-zinc-400 shrink-0" />
          <div className="flex-1">
            <p className="text-xl md:text-2xl text-zinc-400">순수한 LLM</p>
            <p className="text-lg md:text-xl text-zinc-500 mt-1">텍스트 생성만 가능</p>
          </div>
          <X className="w-8 h-8 text-red-500 shrink-0" />
        </motion.div>

        {/* Claude Code 능력 */}
        <motion.div
          className="flex items-center gap-4 p-5 rounded-xl bg-orange-500/10 border border-orange-400/40"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FileEdit className="w-10 h-10 text-orange-400 shrink-0" />
          <div className="flex-1">
            <p className="text-xl md:text-2xl text-white">Claude Code</p>
            <p className="text-lg md:text-xl text-orange-400 mt-1">파일 읽기, 수정, 생성까지</p>
          </div>
          <Check className="w-8 h-8 text-emerald-500 shrink-0" />
        </motion.div>
      </div>

      {/* 질문 */}
      <motion.div
        className="flex items-center gap-4 mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <HelpCircle className="w-10 h-10 text-orange-400" />
        <p className="text-2xl md:text-3xl text-white">
          어떻게 <span className="text-orange-400">외부 세상</span>과 소통할 수 있는 걸까?
        </p>
      </motion.div>
    </div>
  );
}
