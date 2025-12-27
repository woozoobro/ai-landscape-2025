"use client";

import { motion } from "framer-motion";

interface SlideContainerProps {
  children: React.ReactNode;
  index: number;
  currentIndex: number;
}

export default function SlideContainer({
  children,
  index,
  currentIndex,
}: SlideContainerProps) {
  // 현재 슬라이드 기준으로 위치 계산
  const offset = index - currentIndex;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
      initial={false}
      animate={{
        x: `${offset * 100}%`,
      }}
      transition={{
        x: { type: "tween", duration: 1.3, ease: [0.19, 1.06, 0.01, 1] },
      }}
      style={{
        pointerEvents: offset === 0 ? "auto" : "none",
      }}
    >
      {children}
    </motion.div>
  );
}
