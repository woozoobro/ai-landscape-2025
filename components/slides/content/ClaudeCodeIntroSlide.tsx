"use client";

import { motion } from "framer-motion";
import { Terminal, Users, Briefcase, TrendingUp, X, Check } from "lucide-react";
import type { SlideProps } from "../types";

const teams = [
  { label: "마케팅", Icon: TrendingUp },
  { label: "운영", Icon: Briefcase },
  { label: "인사", Icon: Users },
];

export default function ClaudeCodeIntroSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-6">
      {/* 타이틀 */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl md:text-3xl text-zinc-500">Anthropic의 가장 파괴적인 제품</span>
        <div className="flex items-center gap-4">
          <Terminal className="w-10 h-10 md:w-12 md:h-12 text-orange-400" />
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-orange-400">
            Claude Code
          </h2>
        </div>
      </motion.div>

      {/* 오해 섹션 */}
      <motion.div
        className="flex items-center gap-3 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <X className="w-8 h-8 text-red-500" />
        <p className="text-2xl md:text-3xl text-zinc-500 line-through">
          "코딩"이니까 개발자 도구겠지?
        </p>
      </motion.div>

      {/* 실제 사용 팀들 */}
      <motion.div
        className="flex items-center gap-3 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Check className="w-8 h-8 text-emerald-500" />
        <p className="text-2xl md:text-3xl text-white">
          Anthropic 내부에서도
        </p>
      </motion.div>

      {/* 팀 아이콘들 */}
      <div className="flex items-center gap-6 mt-4">
        {teams.map((team, i) => (
          <motion.div
            key={team.label}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15 }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900 border border-orange-400/40 flex items-center justify-center">
              <team.Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-400" />
            </div>
            <span className="text-xl md:text-2xl text-zinc-300">{team.label}</span>
          </motion.div>
        ))}
      </div>

      {/* 강조 메시지 */}
      <motion.p
        className="text-3xl md:text-4xl text-white font-medium mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        업무 효율 <span className="text-orange-400 font-bold">몇 배씩</span> 올리는 중
      </motion.p>
    </div>
  );
}
