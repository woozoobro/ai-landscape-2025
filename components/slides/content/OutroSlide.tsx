"use client";

import { motion } from "framer-motion";
import {
  Brain,
  GraduationCap,
  MessageSquareOff,
  FileCode,
  Bot,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import type { SlideProps } from "../types";

const resources = [
  {
    title: "Thinking about Thinking",
    desc: "DeepMind CEO 데미스 허사비스의 AGI 여정 다큐. 1시간인데 벌써 2억뷰",
    Icon: Brain,
    url: "https://www.youtube.com/watch?v=d95J8yzvjbQ&t=4901s",
    color: "red",
    span: "col-span-2",
    size: "large",
  },
  {
    title: "고졸 OpenAI Engineer 공부법",
    desc: "AI를 튜터 삼아 탑다운 학습. 학력 아닌 결과물로 증명하는 시대",
    Icon: GraduationCap,
    url: "https://www.youtube.com/watch?v=vq5WhoPCWQ8",
    color: "orange",
    span: "col-span-1",
    size: "medium",
  },
  {
    title: "Anthropic Academy",
    desc: "Anthropic의 AI 교육 무료 코스들",
    Icon: BookOpen,
    url: "https://www.anthropic.com/learn",
    color: "amber",
    span: "col-span-1",
    size: "small",
  },
  {
    title: "Context Engineering",
    desc: "Anthropic 공식 가이드",
    Icon: FileCode,
    url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    color: "emerald",
    span: "col-span-1",
    size: "small",
  },
  {
    title: "AGENTS.md",
    desc: "README는 사람용, AGENTS.md는 에이전트용",
    Icon: Bot,
    url: "https://agents.md/",
    color: "sky",
    span: "col-span-1",
    size: "small",
  },
  {
    title: "Stanford LLM 강의",
    desc: "스탠포드 대학의 LLM 강의 시리즈 (무료)",
    Icon: GraduationCap,
    url: "https://youtube.com/playlist?list=PLoROMvodv4rOCXd21gf0CF4xr35yINeOy",
    color: "indigo",
    span: "col-span-1",
    size: "small",
  },
  {
    title: 'LLM한테 "어떻게 생각해?"라고 묻지 마세요',
    desc: "LLM은 의견이 아닌 시뮬레이션. 사고 실험 도구로 쓰는 법",
    Icon: MessageSquareOff,
    url: "https://x.com/karpathy/status/1997731268969304070",
    color: "violet",
    span: "col-span-2",
    size: "medium",
  },
];

// 아이콘 컬러만 무지개색 (빨주노초파남보)
const iconColors: Record<string, string> = {
  red: "text-red-400",
  orange: "text-orange-400",
  amber: "text-amber-400",
  emerald: "text-emerald-400",
  sky: "text-sky-400",
  indigo: "text-indigo-400",
  violet: "text-violet-400",
};

export default function OutroSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      {/* Bento 그리드 */}
      <div className="grid grid-cols-3 gap-5 md:gap-6 max-w-5xl w-full">
        {resources.map((item, i) => {
          const iconColor = iconColors[item.color];
          const isLarge = item.size === "large";
          const isWide = item.size === "wide";

          return (
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${item.span}
                relative overflow-hidden
                flex ${isWide ? "flex-row items-center gap-6" : "flex-col"}
                ${isLarge ? "p-8" : isWide ? "p-6" : "p-5"}
                rounded-2xl md:rounded-3xl
                bg-zinc-700/70 backdrop-blur-sm
                border border-zinc-600/50
                hover:bg-zinc-600/70 hover:scale-[1.02]
                transition-all duration-300 cursor-pointer group
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              {/* 아이콘 */}
              <div
                className={`
                  ${isLarge ? "w-16 h-16 mb-6" : isWide ? "w-14 h-14" : "w-12 h-12 mb-4"}
                  rounded-2xl bg-white/10
                  flex items-center justify-center
                  shrink-0
                `}
              >
                <item.Icon
                  className={`
                    ${isLarge ? "w-8 h-8" : isWide ? "w-7 h-7" : "w-6 h-6"}
                    ${iconColor}
                  `}
                />
              </div>

              {/* 텍스트 */}
              <div className={isWide ? "flex-1" : ""}>
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`
                      font-semibold leading-tight text-white
                      ${isLarge ? "text-2xl md:text-3xl" : isWide ? "text-xl md:text-2xl" : "text-lg md:text-xl"}
                    `}
                  >
                    {item.title}
                  </h3>
                  <ExternalLink
                    className={`
                      ${isLarge ? "w-5 h-5" : "w-4 h-4"}
                      text-white/40 group-hover:text-white/80 transition-opacity shrink-0 mt-1
                    `}
                  />
                </div>
                <p
                  className={`
                    mt-2 leading-relaxed text-white/60
                    ${isLarge ? "text-lg md:text-xl" : "text-base md:text-lg"}
                  `}
                >
                  {item.desc}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
