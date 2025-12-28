"use client";

import { motion } from "framer-motion";
import { Video, Compass, Smartphone, Users, ChevronRight } from "lucide-react";
import type { SlideProps } from "../types";

const touchpoints = [
  { label: "Sora", Icon: Video },
  { label: "Atlas", Icon: Compass },
  { label: "Device", Icon: Smartphone },
  { label: "Group", Icon: Users },
];

export default function OpenAISlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-12">
      <div className="flex items-center gap-6 md:gap-8">
        {/* 타이틀 */}
        <motion.div
          className="flex flex-col items-end"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl md:text-3xl text-zinc-500">OpenAI</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 whitespace-nowrap">
            일상의 넓이
          </h2>
        </motion.div>

        {/* 화살표 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ChevronRight className="w-8 h-8 text-emerald-500/60" />
        </motion.div>

        {/* 채팅창을 넘어 */}
        <motion.p
          className="text-xl md:text-2xl text-zinc-400 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          채팅창을 넘어
        </motion.p>

        {/* 화살표 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ChevronRight className="w-6 h-6 text-emerald-500/40" />
        </motion.div>

        {/* 터치포인트들 */}
        {touchpoints.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-4 md:gap-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-emerald-400/40 flex items-center justify-center">
                <item.Icon className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-lg md:text-xl text-zinc-400">{item.label}</span>
            </div>
            {i < touchpoints.length - 1 && (
              <ChevronRight className="w-5 h-5 text-emerald-500/30" />
            )}
          </motion.div>
        ))}

        {/* 화살표 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <ChevronRight className="w-6 h-6 text-emerald-500/40" />
        </motion.div>

        {/* 최종 메시지 */}
        <motion.p
          className="text-xl md:text-2xl text-white font-medium whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          삶의 모든 순간으로
        </motion.p>
      </div>
    </div>
  );
}
