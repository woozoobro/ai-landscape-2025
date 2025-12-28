"use client";

import { motion } from "framer-motion";
import { Search, Briefcase, Cloud, ExternalLink } from "lucide-react";
import type { SlideProps } from "../types";

const innerRing = [
  { label: "Search", Icon: Search, angle: -90 },
  { label: "Workspace", Icon: Briefcase, angle: 30 },
  { label: "Cloud", Icon: Cloud, angle: 150 },
];

const outerRing = [
  { label: "TPU", angle: -30 },
  { label: "Veo", angle: 30 },
  { label: "NotebookLM", angle: 90 },
  { label: "Antigravity", angle: 150 },
  { label: "NanoBanana", angle: 210 },
  { label: "GenUI", angle: 270 },
];

export default function GoogleSlide({}: SlideProps) {
  const innerDistance = 125;
  const outerDistance = 210;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-4">
      {/* 타이틀 */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-3xl md:text-4xl text-zinc-500 mb-1">Google</span>
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-blue-400">
          판의 크기
        </h2>
      </motion.div>

      {/* 동심원 */}
      <div className="relative w-[480px] h-[480px]">
        {/* 외곽 원 */}
        <motion.div
          className="absolute inset-0 rounded-full border border-blue-400/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* 중간 원 */}
        <motion.div
          className="absolute inset-[90px] rounded-full border border-blue-400/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* 중심 - Gemini */}
        <div
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <motion.div
            className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center"
            style={{ boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <span className="text-xl font-bold text-white">Gemini</span>
          </motion.div>
        </div>

        {/* 내부 링 - Search, Workspace, Cloud */}
        {innerRing.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.cos(rad) * innerDistance;
          const y = Math.sin(rad) * innerDistance;

          return (
            <div
              key={item.label}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-blue-400/50 flex items-center justify-center">
                  <item.Icon className="w-7 h-7 text-blue-400" />
                </div>
                <span className="text-sm text-zinc-400">{item.label}</span>
              </motion.div>
            </div>
          );
        })}

        {/* 외부 링 - 서비스들 */}
        {outerRing.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.cos(rad) * outerDistance;
          const y = Math.sin(rad) * outerDistance;

          return (
            <motion.div
              key={item.label}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.08 }}
            >
              <span className="text-base text-blue-300/80 whitespace-nowrap">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* 하단 메시지 */}
      <motion.p
        className="text-2xl md:text-3xl text-white font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        빈틈없는 생태계
      </motion.p>

      {/* Google Labs 링크 */}
      <motion.a
        href="https://labs.google"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-blue-400/30 text-blue-300 hover:bg-zinc-700/80 hover:border-blue-400/50 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-sm">Google Labs 둘러보기</span>
        <ExternalLink className="w-4 h-4" />
      </motion.a>
    </div>
  );
}
