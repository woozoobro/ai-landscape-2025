"use client";

import { motion } from "framer-motion";
import { Terminal, MessageSquare, FileCode, FolderPlus } from "lucide-react";
import type { SlideProps } from "../types";

const steps = [
  { Icon: MessageSquare, label: "자연어로 요청" },
  { Icon: FileCode, label: "플랜 & 코드 작성" },
  { Icon: FolderPlus, label: "파일 생성" },
];

export default function ClaudeCodeWhatSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-8">
      {/* 타이틀 */}
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Claude Code가 뭔데?
      </motion.h2>

      {/* 정의 */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Terminal className="w-10 h-10 text-orange-400" />
        <p className="text-2xl md:text-3xl text-zinc-300">
          <span className="text-orange-400">CLI 기반</span> 코딩 에이전트
        </p>
      </motion.div>

      {/* 플로우 */}
      <div className="flex items-center gap-4 md:gap-6 mt-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900 border border-orange-400/40 flex items-center justify-center">
                <step.Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
              </div>
              <span className="text-lg md:text-xl text-zinc-300">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                className="text-3xl text-orange-400/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.2 }}
              >
                →
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 구분 설명 */}
      <motion.div
        className="mt-8 p-5 rounded-xl bg-zinc-900/60 border border-zinc-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-xl md:text-2xl text-zinc-400 text-center">
          Claude <span className="text-zinc-600">≠</span> Claude Code
          <span className="mx-4 text-zinc-600">|</span>
          <span className="text-white">터미널에서 쓰는 프로그램</span>
        </p>
      </motion.div>
    </div>
  );
}
