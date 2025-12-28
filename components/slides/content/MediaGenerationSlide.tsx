"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SlideProps } from "../types";

export default function MediaGenerationSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl w-full space-y-8 md:space-y-10">
        {/* 상단: 메인 타이틀 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            이미지와 비디오 생성
          </h2>
        </motion.div>

        {/* 하단: 가로로 넓은 2단 레이아웃 */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-8 lg:gap-12">
          {/* 좌측: 이미지 생성 - 나노바나나 */}
          <motion.div
            className="flex-1 space-y-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl text-zinc-400 text-center">
              <span className="text-emerald-400 font-bold">nano banana</span>
            </h3>

            {/* 나노바나나 이미지 - 가로로 넓게 */}
            <motion.div
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Image
                src="/nano-banana-pro.webp"
                alt="Nano Banana - AI Generated Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* 우측: 영상 생성 - Veo3 */}
          <motion.div
            className="flex-1 space-y-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl text-zinc-400 text-center">
              <span className="text-blue-400 font-bold">Veo3</span>
            </h3>

            {/* Veo3 비디오 - 가로로 넓게 */}
            <motion.div
              className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-700"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <video
                src="/veo3.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
