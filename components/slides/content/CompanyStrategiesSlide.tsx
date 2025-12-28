"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SlideProps } from "../types";

export default function CompanyStrategiesSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-12">
      {/* 3사 시각적 메타포 */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-8 lg:gap-16 items-center justify-center w-full max-w-7xl">
        {/* Anthropic - 깊이 (터널/줌인 효과) */}
        <motion.div
          className="flex-1 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">깊이</p>

          {/* 터널 효과 - perspective로 안쪽으로 들어가는 사각형들 */}
          <div
            className="relative h-48 md:h-64 w-48 md:w-64 flex items-center justify-center"
            style={{ perspective: "500px" }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-orange-400 rounded"
                style={{
                  width: `${90 - i * 15}%`,
                  height: `${90 - i * 15}%`,
                }}
                initial={{ opacity: 0, z: 0 }}
                animate={{
                  opacity: 1 - i * 0.18,
                  scale: 1 - i * 0.15,
                  z: -i * 40,
                }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              />
            ))}
            {/* 중앙 포인트 */}
            <motion.div
              className="w-3 h-3 rounded-full bg-orange-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            />
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/logos/anthropic.png"
              alt="Anthropic"
              width={120}
              height={32}
              className="h-6 w-auto opacity-60"
            />
            <span className="text-xl md:text-2xl text-zinc-400 font-medium">Anthropic</span>
          </div>
        </motion.div>

        {/* OpenAI - 넓이 (수평 확장) */}
        <motion.div
          className="flex-1 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">넓이</p>

          {/* 수평으로 뻗어나가는 선 */}
          <div className="relative h-48 md:h-64 w-48 md:w-64 flex items-center justify-center">
            {/* 중앙 점 */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-emerald-400 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            />

            {/* 좌측 선 */}
            <motion.div
              className="absolute h-0.5 bg-emerald-400 right-1/2"
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            {/* 좌측 화살표 */}
            <motion.span
              className="absolute text-3xl text-emerald-400"
              style={{ left: "2%" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              ◀
            </motion.span>

            {/* 우측 선 */}
            <motion.div
              className="absolute h-0.5 bg-emerald-400 left-1/2"
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 0.6, delay: 0.7 }}
            />
            {/* 우측 화살표 */}
            <motion.span
              className="absolute text-3xl text-emerald-400"
              style={{ right: "2%" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              ▶
            </motion.span>

            {/* 수평 노드들 */}
            {[-1, 1].map((dir) =>
              [1, 2, 3].map((i) => (
                <motion.div
                  key={`${dir}-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-emerald-400/60"
                  style={{ left: `calc(50% + ${dir * i * 25}%)` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8 - i * 0.2, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                />
              ))
            )}
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/logos/openai.png"
              alt="OpenAI"
              width={100}
              height={32}
              className="h-10 w-auto opacity-60"
            />
            <span className="text-xl md:text-2xl text-zinc-400 font-medium">OpenAI</span>
          </div>
        </motion.div>

        {/* Google - 크기 (그리드 확장) */}
        <motion.div
          className="flex-1 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">크기</p>

          {/* 확장되는 그리드 */}
          <div className="relative h-48 md:h-64 w-48 md:w-64 flex items-center justify-center">
            <div className="grid grid-cols-4 grid-rows-4 gap-1.5 md:gap-2">
              {Array.from({ length: 16 }).map((_, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                const distFromCenter = Math.max(Math.abs(row - 1.5), Math.abs(col - 1.5));
                const delay = 0.8 + distFromCenter * 0.15;

                return (
                  <motion.div
                    key={i}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-md border-2 border-blue-400 bg-blue-400/10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.9 - distFromCenter * 0.15, scale: 1 }}
                    transition={{ duration: 0.3, delay }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/logos/google.png"
              alt="Google"
              width={100}
              height={32}
              className="h-6 md:h-8 w-auto opacity-60"
            />
            <span className="text-xl md:text-2xl text-zinc-400 font-medium">Google</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
