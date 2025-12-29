"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles, BookOpen, Wand2, ExternalLink } from "lucide-react";
import type { SlideProps } from "../types";

const picks = [
  {
    company: "OpenAI",
    service: "Voice Mode",
    desc: "언어 공부나 면접 연습",
    Icon: Mic,
    color: "emerald",
    url: "https://www.youtube.com/watch?v=4jBcK0cYass",
  },
  {
    company: "Google",
    service: "Antigravity",
    desc: "AI 에이전트 코딩 IDE",
    Icon: Sparkles,
    color: "blue",
    url: "https://antigravity.google/",
  },
  {
    company: "Google",
    service: "NotebookLM",
    desc: "내 자료들로만 대화",
    Icon: BookOpen,
    color: "blue",
    url: "https://notebooklm.google.com",
  },
  {
    company: "Google",
    service: "AI Studio",
    desc: "나만의 AI 앱 빌더",
    Icon: Wand2,
    color: "blue",
    url: "https://aistudio.google.com",
  },
];

const colorMap = {
  emerald: {
    border: "border-emerald-400/40",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    text: "text-emerald-400",
  },
  blue: {
    border: "border-blue-400/40",
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    text: "text-blue-400",
  },
};

export default function LivePicksSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 gap-16">
      {/* 타이틀 */}
      <motion.h2
        className="text-6xl md:text-7xl lg:text-8xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        써보면 좋은 것들
      </motion.h2>

      {/* 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {picks.map((item, i) => {
          const colors = colorMap[item.color as keyof typeof colorMap];
          return (
            <motion.a
              key={item.service}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-6 p-8 rounded-2xl ${colors.bg} ${colors.border} border hover:scale-105 transition-transform cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-zinc-900 ${colors.border} border flex items-center justify-center`}>
                <item.Icon className={`w-10 h-10 md:w-12 md:h-12 ${colors.icon}`} />
              </div>
              <div className="text-center">
                <p className={`text-2xl md:text-3xl font-medium ${colors.text}`}>
                  {item.service}
                </p>
                <p className="text-xl text-zinc-500">{item.company}</p>
              </div>
              <div className="flex items-center gap-2 text-xl text-zinc-400">
                <span>{item.desc}</span>
                <ExternalLink className="w-5 h-5" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
