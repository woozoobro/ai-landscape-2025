"use client";

import { motion } from "framer-motion";
import type { SlideProps } from "../types";

export default function ReasoningModelSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-9xl">
        {/* 좌측: 텍스트 */}
        <div className="flex-1 space-y-8">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">
            Reasoning Model
          </h2>

          <div className="space-y-6">
            <p className="text-5xl md:text-6xl text-zinc-400 font-normal leading-tight">
              답을 내기 전에
              <br />
              <span className="text-white font-bold">더 오래 생각한다</span>
            </p>

            <motion.div
              className="flex items-center gap-6 pt-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="text-4xl text-zinc-500 whitespace-nowrap">정답만 내는 AI</span>
              <motion.span
                className="text-3xl text-emerald-500"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
              <span className="text-4xl text-white font-bold whitespace-nowrap">
                생각하고 검산하는 AI
              </span>
            </motion.div>
          </div>
        </div>

        {/* 우측: ChatGPT-like 인터페이스 Mock */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl">
            {/* 헤더 */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <span className="text-2xl text-zinc-300">ChatGPT o1</span>
            </div>

            {/* 채팅 영역 */}
            <div className="p-5 space-y-5">
              {/* 사용자 메시지 */}
              <div className="flex justify-end">
                <div className="bg-zinc-700 rounded-2xl px-5 py-3 max-w-xs">
                  <p className="text-2xl text-white">이 코드의 버그를 찾아줘</p>
                </div>
              </div>

              {/* AI 응답 */}
              <div className="space-y-3">
                {/* Thinking 토글 (펼쳐진 상태) */}
                <motion.div
                  className="rounded-xl border border-zinc-700 bg-zinc-800/50 overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* 토글 헤더 */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-700">
                    <motion.span
                      className="text-xl text-emerald-500"
                      animate={{ rotate: 90 }}
                    >
                      ▶
                    </motion.span>
                    <span className="text-xl text-zinc-400">Thinking...</span>
                    <motion.span
                      className="text-xl text-zinc-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      12초
                    </motion.span>
                  </div>

                  {/* 사고 과정 내용 */}
                  <motion.div
                    className="px-4 py-3 text-xl text-zinc-500 space-y-2 font-mono"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <p>1. 코드 구조 분석 중...</p>
                    <p>2. 변수 스코프 확인...</p>
                    <p className="text-amber-500">3. 잠재적 문제 발견!</p>
                    <p>4. 해결책 검토 중...</p>
                  </motion.div>
                </motion.div>

                {/* 실제 답변 */}
                <motion.div
                  className="text-2xl text-zinc-200 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  버그를 찾았습니다. 15번째 줄에서...
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
