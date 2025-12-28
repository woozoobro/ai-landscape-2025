"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SlideProps } from "../types";

export default function VibeCodingSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 md:p-12">
      <div className="text-center space-y-6 md:space-y-8">
        {/* 메인 타이틀 */}
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Vibe Coding
        </motion.h2>

        {/* Andrej Karpathy 트윗 인용 */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a
            href="https://x.com/karpathy/status/1886192184808149383"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-900 border border-zinc-700 rounded-2xl p-5 md:p-6 text-left hover:border-zinc-500 hover:bg-zinc-800/50 transition-colors cursor-pointer"
          >
            {/* 프로필 영역 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative">
                <Image
                  src="/andrej.jpg"
                  alt="Andrej Karpathy"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xl md:text-2xl text-white font-bold">Andrej Karpathy</p>
                <p className="text-lg md:text-xl text-zinc-500">@karpathy</p>
              </div>
            </div>

            {/* 트윗 내용 */}
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
              "There's a new kind of coding I call{" "}
              <span className="text-amber-400 font-semibold">vibe coding</span>,
              where you fully give in to the vibes, embrace exponentials,
              and forget that the code even exists."
            </p>
          </a>
        </motion.div>

        {/* 부제목 */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl text-zinc-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          개발을 몰라도 코딩할 수 있는 시대
        </motion.p>
      </div>
    </div>
  );
}
