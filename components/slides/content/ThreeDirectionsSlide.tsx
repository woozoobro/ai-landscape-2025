"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { SlideProps } from "../types";

const companies = [
  {
    name: "Anthropic",
    direction: "개발자의 손",
    color: "text-orange-400",
    borderColor: "border-orange-400/30",
    bgGlow: "rgba(251, 146, 60, 0.15)",
    logo: "/logos/anthropic.svg",
    logoClass: "invert", // 어두운 로고라 invert 필요
    delay: 0.2,
  },
  {
    name: "OpenAI",
    direction: "우리의 일상",
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
    bgGlow: "rgba(52, 211, 153, 0.15)",
    logo: "/logos/openai.svg",
    logoClass: "",
    delay: 0.4,
  },
  {
    name: "Google",
    direction: "세상의 모든 인프라",
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    bgGlow: "rgba(96, 165, 250, 0.15)",
    logo: "/logos/google.svg",
    logoClass: "",
    delay: 0.6,
  },
];

export default function ThreeDirectionsSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16">
      {/* 타이틀 */}
      <motion.h2
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-16 md:mb-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Three Giants, Three Visions
      </motion.h2>

      {/* 3사 비교 카드 */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 max-w-7xl w-full justify-center items-stretch">
        {companies.map((company) => (
          <motion.div
            key={company.name}
            className={`flex-1 flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl border ${company.borderColor} bg-zinc-900/50`}
            style={{
              boxShadow: `0 0 40px ${company.bgGlow}`,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: company.delay }}
          >
            {/* 로고 */}
            <div className="h-12 md:h-16 mb-6 flex items-center">
              <Image
                src={company.logo}
                alt={company.name}
                width={160}
                height={64}
                className={`h-10 md:h-14 w-auto ${company.logoClass}`}
              />
            </div>

            {/* 방향성 */}
            <p className={`text-2xl md:text-3xl ${company.color} text-center font-bold`}>
              {company.direction}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
