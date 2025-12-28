"use client";

import { motion } from "framer-motion";
import { Package, Sparkles, ArrowRight } from "lucide-react";
import type { SlideProps } from "../types";

export default function ClaudeCodeWhySlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-8">
      {/* 타이틀 */}
      <motion.h2
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        비개발자가 왜 Claude Code를?
      </motion.h2>

      {/* 비교 섹션 */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-4">
        {/* 기존 툴 */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-600 flex items-center justify-center">
            <Package className="w-10 h-10 text-zinc-400" />
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-zinc-400">노션, 엑셀, 피그마</p>
            <p className="text-xl md:text-2xl text-zinc-600 mt-1">박제된 프로그램</p>
          </div>
        </motion.div>

        {/* 화살표 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
        </motion.div>

        {/* Claude Code */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-orange-500/20 border border-orange-400 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-orange-400" />
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-white">Claude Code</p>
            <p className="text-xl md:text-2xl text-orange-400 mt-1">즉석에서 만드는 맞춤 툴</p>
          </div>
        </motion.div>
      </div>

      {/* 핵심 메시지 */}
      <motion.div
        className="mt-6 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-700 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-xl md:text-2xl text-zinc-300 text-center leading-relaxed">
          "지난달 지출 내역 읽어서 카테고리별 대시보드로 구워줘"
        </p>
      </motion.div>

      {/* 강조 문구 */}
      <motion.p
        className="text-2xl md:text-3xl text-white font-medium text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        내 컴퓨터 안에서 <span className="text-orange-400">실제로 움직이는 손과 발</span>
      </motion.p>
    </div>
  );
}
