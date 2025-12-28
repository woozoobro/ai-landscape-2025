"use client";

import { motion } from "framer-motion";
import { Terminal, MessageSquare, Globe, Sheet, ChevronDown } from "lucide-react";
import type { SlideProps } from "../types";

const environments = [
  { label: "CLI", Icon: Terminal },
  { label: "Slack", Icon: MessageSquare },
  { label: "Chrome", Icon: Globe },
  { label: "Excel", Icon: Sheet },
];

export default function AnthropicSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-8">
      {/* 타이틀 */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl md:text-4xl text-zinc-500 mb-1">Anthropic</span>
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-orange-400">
          일의 깊이
        </h2>
      </motion.div>

      {/* 첫 번째 화살표 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ChevronDown className="w-8 h-8 text-orange-500/60" />
      </motion.div>

      {/* 채팅창을 넘어 */}
      <motion.p
        className="text-2xl md:text-3xl text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        채팅창을 넘어
      </motion.p>

      {/* 환경 아이콘들 - 세로 나열 */}
      <div className="flex flex-col items-center gap-3">
        {environments.map((env, i) => (
          <motion.div
            key={env.label}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-orange-400/40 flex items-center justify-center">
              <env.Icon className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-xl md:text-2xl text-zinc-300 w-20">{env.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 두 번째 화살표 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <ChevronDown className="w-8 h-8 text-orange-500/60" />
      </motion.div>

      {/* 최종 메시지 */}
      <motion.p
        className="text-2xl md:text-3xl text-white font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        일하는 모든 현장으로
      </motion.p>
    </div>
  );
}
