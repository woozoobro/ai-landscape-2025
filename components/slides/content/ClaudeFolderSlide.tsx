"use client";

import { motion } from "framer-motion";
import { Folder, FileText, FolderOpen } from "lucide-react";
import type { SlideProps } from "../types";

const folderStructure = [
  { type: "folder", name: ".claude", depth: 0, open: true },
  { type: "file", name: "CLAUDE.md", depth: 1, highlight: true, desc: "프로젝트 컨텍스트" },
  { type: "folder", name: "agents", depth: 1, open: true },
  { type: "file", name: "slide-designer.md", depth: 2, desc: "슬라이드 디자이너" },
  { type: "file", name: "onboarding-manager.md", depth: 2, desc: "온보딩 매니저" },
  { type: "folder", name: "skills", depth: 1, open: true },
  { type: "folder", name: "pptx", depth: 2, desc: "PowerPoint 생성 스킬" },
  { type: "folder", name: "slide-design", depth: 2, open: true, desc: "발표자료 디자인 스킬" },
  { type: "file", name: "SKILL.md", depth: 3, desc: "스킬 정의 & 규칙" },
  { type: "file", name: "tokens.md", depth: 3, desc: "참조 문서" },
];

export default function ClaudeFolderSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-8">
      {/* 타이틀 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
          <span className="text-orange-400">.claude</span> 폴더
        </h2>
        <p className="text-2xl md:text-3xl text-zinc-400">
          AI 동료를 위한 인수인계 문서
        </p>
      </motion.div>

      {/* 폴더 구조 시각화 */}
      <motion.div
        className="bg-zinc-900 rounded-2xl border border-zinc-700 p-6 md:p-8 font-mono"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="space-y-1.5">
          {folderStructure.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              style={{ paddingLeft: `${item.depth * 20}px` }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
            >
              {item.type === "folder" ? (
                item.open ? (
                  <FolderOpen className="w-5 h-5 text-orange-400 shrink-0" />
                ) : (
                  <Folder className="w-5 h-5 text-orange-400 shrink-0" />
                )
              ) : (
                <FileText className="w-5 h-5 text-zinc-500 shrink-0" />
              )}
              <span
                className={`text-lg ${
                  item.type === "folder"
                    ? "text-orange-400 font-semibold"
                    : item.highlight
                    ? "text-emerald-400"
                    : "text-zinc-300"
                }`}
              >
                {item.name}
              </span>
              {item.desc && (
                <span className="text-zinc-600 text-sm ml-2">← {item.desc}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.p
        className="text-2xl md:text-3xl text-zinc-300 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        마크다운으로 명세하면 그게 곧{" "}
        <span className="text-orange-400 font-medium">LLM의 컨텍스트</span>
      </motion.p>
    </div>
  );
}
