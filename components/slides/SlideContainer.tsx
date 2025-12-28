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
  const isActive = index === currentIndex;

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{
        scale: isActive ? 1 : 0.97,
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.8, 0, 0.3, 1],
      }}
      style={{
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      {children}
    </motion.div>
  );
}
