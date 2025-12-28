"use client";

import { motion } from "framer-motion";
import { Code, TestTube, Monitor, Hammer, Bot, Users } from "lucide-react";
import type { SlideProps } from "../types";

const agentCapabilities = [
  { icon: Code, label: "코드 작성", delay: 0.5 },
  { icon: Hammer, label: "빌드", delay: 0.65 },
  { icon: TestTube, label: "테스트", delay: 0.8 },
  { icon: Monitor, label: "브라우저 조작", delay: 0.95 },
];

export default function AgentSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl w-full space-y-6 md:space-y-8 lg:space-y-10">
        {/* 상단: 메인 타이틀 */}
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">
            Agent
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl text-zinc-400">
            혼자서 일하는 AI
          </p>
        </div>

        {/* 중단: 비교 레이아웃 */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 md:gap-6 lg:gap-10">
          {/* 좌측: 2024 어시스턴트 */}
          <motion.div
            className="flex-1 max-w-md lg:max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900/50 p-4 md:p-5 lg:p-6 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl text-zinc-500 font-mono">
                2024
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Bot className="w-12 h-12 md:w-16 md:h-16 text-zinc-500" />
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-zinc-400 font-normal">
                  Assistant
                </h3>
                <p className="text-2xl md:text-3xl text-zinc-500">
                  똑똑한 비서
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed">
              질문하면 답변하고
              <br />
              지시하면 도와주는 역할
            </p>
          </motion.div>

          {/* 중앙: 화살표 */}
          <motion.div
            className="flex items-center justify-center py-2 lg:py-0"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-4xl md:text-5xl text-amber-500 font-bold lg:rotate-0 rotate-90">
              →
            </span>
          </motion.div>

          {/* 우측: 2025 에이전트 */}
          <motion.div
            className="flex-1 max-w-md lg:max-w-lg rounded-2xl border border-amber-700/50 bg-amber-950/20 p-4 md:p-5 lg:p-6 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl text-amber-400 font-mono font-bold">
                2025
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Users className="w-12 h-12 md:w-16 md:h-16 text-amber-500" />
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                  Agent
                </h3>
                <p className="text-2xl md:text-3xl text-amber-400 font-bold">
                  우리 곁의 동료
                </p>
              </div>
            </div>

            {/* 에이전트 능력들 */}
            <div className="grid grid-cols-2 gap-2">
              {agentCapabilities.map((cap) => (
                <motion.div
                  key={cap.label}
                  className="flex items-center gap-2 bg-zinc-800/50 rounded-xl px-3 py-2 border border-zinc-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: cap.delay, duration: 0.4 }}
                >
                  <cap.icon className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                  <span className="text-lg md:text-xl text-zinc-300">
                    {cap.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
