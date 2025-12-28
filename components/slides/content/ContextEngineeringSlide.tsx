"use client";

import { motion } from "framer-motion";
import { FileText, History, Shield } from "lucide-react";
import type { SlideProps } from "../types";

const contextElements = [
  { icon: "doc", label: "문서", delay: 0.3 },
  { icon: "history", label: "히스토리", delay: 0.5 },
  { icon: "constraint", label: "제약 조건", delay: 0.7 },
];

export default function ContextEngineeringSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl w-full space-y-6 md:space-y-8 lg:space-y-12">
        {/* 상단: 메인 타이틀 */}
        <div className="text-center space-y-2 md:space-y-3">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white">
            Context Engineering
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl text-zinc-400">
            어떤 정보를, 어떤 순서로 줄까
          </p>
        </div>

        {/* 하단: 비교 레이아웃 */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 md:gap-6 lg:gap-10">
          {/* 좌측: 프롬프트 엔지니어링 */}
          <motion.div
            className="flex-1 max-w-md lg:max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900/50 p-4 md:p-5 lg:p-6 space-y-3 md:space-y-4 lg:space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-zinc-400 font-normal">
              Prompt Engineering
            </h3>

            <p className="text-2xl md:text-3xl text-zinc-500 leading-relaxed">
              질문을 어떻게
              <br />
              <span className="text-zinc-300">예쁘게 할까</span>
            </p>

            {/* 단순한 질문 박스 */}
            <div className="bg-zinc-800 rounded-xl p-3 md:p-4 border border-zinc-700">
              <p className="text-xl md:text-2xl text-zinc-400 font-mono">
                "이 코드 버그 찾아줘"
              </p>
            </div>
          </motion.div>

          {/* 중앙: 화살표 */}
          <motion.div
            className="flex items-center justify-center py-2 lg:py-0"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-4xl md:text-5xl text-emerald-500 font-bold lg:rotate-0 rotate-90">→</span>
          </motion.div>

          {/* 우측: 컨텍스트 엔지니어링 */}
          <motion.div
            className="flex-1 max-w-md lg:max-w-lg rounded-2xl border border-emerald-700/50 bg-emerald-950/20 p-4 md:p-5 lg:p-6 space-y-3 md:space-y-4 lg:space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
              Context Engineering
            </h3>

            <p className="text-2xl md:text-3xl text-zinc-400 leading-relaxed">
              어떤 정보를, 어떤 순서로
              <br />
              <span className="text-emerald-400 font-bold">구조화해서 줄까</span>
            </p>

            {/* 컨텍스트 요소들 */}
            <div className="space-y-2">
              {contextElements.map((el) => (
                <motion.div
                  key={el.label}
                  className="flex items-center gap-3 bg-zinc-800/50 rounded-xl px-3 md:px-4 py-2 md:py-2.5 border border-zinc-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: el.delay, duration: 0.4 }}
                >
                  <span className="text-emerald-500">
                    {el.icon === "doc" && <FileText className="w-5 h-5 md:w-6 md:h-6" />}
                    {el.icon === "history" && <History className="w-5 h-5 md:w-6 md:h-6" />}
                    {el.icon === "constraint" && <Shield className="w-5 h-5 md:w-6 md:h-6" />}
                  </span>
                  <span className="text-xl md:text-2xl text-zinc-300">{el.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
