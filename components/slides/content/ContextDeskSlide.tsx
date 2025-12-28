"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Cloud, User, Send, ArrowRight, X, BookOpen } from "lucide-react";
import type { SlideProps } from "../types";

const mcpServices = ["Notion", "Slack", "Jira", "GitHub"];

const skillDetails = {
  pptx: {
    title: "pptx",
    desc: "PowerPoint 생성 스킬",
    content: [
      "# pptx Skill",
      "",
      "## 용도",
      "PowerPoint 프레젠테이션 생성 및 편집",
      "",
      "## 기능",
      "- 슬라이드 생성/수정",
      "- 차트, 표 삽입",
      "- 템플릿 적용",
    ],
  },
  pdf: {
    title: "pdf",
    desc: "PDF 조작 스킬",
    content: [
      "# pdf Skill",
      "",
      "## 용도",
      "PDF 문서 조작 및 데이터 추출",
      "",
      "## 기능",
      "- 텍스트/표 추출",
      "- 문서 병합/분할",
      "- 양식 채우기",
    ],
  },
  "canvas-design": {
    title: "canvas-design",
    desc: "시각 디자인 스킬",
    content: [
      "# canvas-design Skill",
      "",
      "## 용도",
      "PNG/PDF 시각 디자인 생성",
      "",
      "## 기능",
      "- 디자인 철학 기반",
      "- 브랜드 가이드 적용",
      "- 다양한 포맷 출력",
    ],
  },
};

export default function ContextDeskSlide({}: SlideProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-10 overflow-hidden relative">
      {/* 메인 레이아웃 */}
      <div className="flex items-center justify-center gap-16 w-full max-w-7xl">
        {/* 내 책상 영역 (아이소메트릭) */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl font-bold text-orange-400">
              Context Window
            </span>
            <span className="px-3 py-1 bg-orange-500 rounded-lg text-sm font-bold text-black">
              한정
            </span>
          </div>

          {/* 아이소메트릭 책상 */}
          <div className="relative">
            {/* 책상 상판 (마름모) */}
            <motion.div
              className="w-96 h-56 bg-amber-900/90 border-2 border-orange-500/60 shadow-2xl shadow-orange-500/20"
              style={{
                transform: "perspective(600px) rotateX(25deg)",
                borderRadius: "12px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* CLAUDE.md 사원증 */}
              <motion.div
                className="absolute top-5 left-5 w-28 h-20 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-400 mb-1" />
                <span className="text-sm font-bold text-zinc-800">
                  CLAUDE.md
                </span>
                <span className="text-xs text-zinc-500">사원증</span>
              </motion.div>

              {/* 작업 서류들 */}
              <motion.div
                className="absolute top-5 right-5 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-16 bg-zinc-100 rounded-lg shadow border border-zinc-300 flex items-center justify-center"
                    style={{ transform: `rotate(${(i - 1) * 4}deg)` }}
                  >
                    <FileText className="w-6 h-6 text-zinc-400" />
                  </div>
                ))}
              </motion.div>

              {/* 작업중 표시 */}
              <motion.span
                className="absolute bottom-4 left-5 text-lg text-orange-300/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                작업 중...
              </motion.span>
            </motion.div>

            {/* 책상 하단 - Skills 서랍 */}
            <motion.div
              className="mt-1 w-96 bg-zinc-800 rounded-b-xl border border-zinc-600 border-t-0 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700">
                <span className="text-xl font-bold text-blue-400">Skills</span>
                <span className="text-lg text-zinc-500">서랍 (클릭!)</span>
              </div>
              <div className="flex">
                {(["pptx", "pdf", "canvas-design"] as const).map((skill, i) => (
                  <motion.div
                    key={skill}
                    className="flex-1 py-3 px-3 border-r border-zinc-700 last:border-r-0 flex flex-col items-center gap-2 cursor-pointer hover:bg-zinc-700/50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    onClick={() => setSelectedSkill(skill)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-10 h-1.5 bg-zinc-600 rounded-full" />
                    <span className="text-sm text-zinc-400">{skill}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-center py-2 text-sm text-zinc-600">
                필요할 때 꺼냄
              </div>
            </motion.div>
          </div>

          <span className="text-2xl text-zinc-400 mt-4">= 내 책상</span>
        </motion.div>

        {/* 화살표 - 양방향 상호작용 */}
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* 일 시키기 (오른쪽) */}
          <div className="flex items-center gap-1.5">
            <Send className="w-10 h-10 text-purple-400" />
            <span className="text-lg text-zinc-400">일 시키기</span>
            <ArrowRight className="w-8 h-8 text-purple-400" />
          </div>

          {/* 결과만 받음 (왼쪽) */}
          <div className="flex items-center gap-1.5">
            <ArrowRight className="w-8 h-8 text-emerald-400 rotate-180" />
            <span className="text-lg text-zinc-400">결과만 받음</span>
          </div>
        </motion.div>

        {/* Subagents - 사람들 */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-4xl font-bold text-purple-400">Subagents</span>
          <span className="text-xl text-zinc-500">옆 팀 동료들</span>

          {/* 사람 아이콘들 */}
          <div className="flex gap-6">
            {[
              { name: "리서처", color: "bg-purple-500" },
              { name: "디자이너", color: "bg-pink-500" },
              { name: "분석가", color: "bg-indigo-500" },
            ].map((agent, i) => (
              <motion.div
                key={agent.name}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div
                  className={`w-20 h-20 ${agent.color} rounded-full flex items-center justify-center shadow-xl`}
                >
                  <User className="w-12 h-12 text-white" />
                </div>
                <span className="text-lg text-zinc-400">{agent.name}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>

      {/* MCP - 외부 서비스들 */}
      <motion.div
        className="flex items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-3">
          <Cloud className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold text-cyan-400">MCP</span>
          <span className="text-xl text-zinc-500">외부 SaaS 연동</span>
        </div>
        <div className="flex gap-3">
          {mcpServices.map((service, i) => (
            <motion.div
              key={service}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800/80 rounded-full border border-zinc-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
            >
              <Cloud className="w-4 h-4 text-cyan-400/60" />
              <span className="text-lg text-zinc-300">{service}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.p
        className="text-3xl text-zinc-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        핵심:{" "}
        <span className="text-orange-400 font-semibold">책상을 깔끔하게</span>{" "}
        유지하는 것
      </motion.p>

      {/* Skill 상세 모달 */}
      <AnimatePresence>
        {selectedSkill && skillDetails[selectedSkill as keyof typeof skillDetails] && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">
                      {skillDetails[selectedSkill as keyof typeof skillDetails].title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {skillDetails[selectedSkill as keyof typeof skillDetails].desc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>

              {/* 매뉴얼 내용 */}
              <div className="bg-zinc-800 rounded-xl p-4 font-mono text-sm space-y-1">
                {skillDetails[selectedSkill as keyof typeof skillDetails].content.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={
                      line.startsWith("# ")
                        ? "text-xl font-bold text-white"
                        : line.startsWith("## ")
                        ? "text-lg font-semibold text-blue-400 mt-3"
                        : line.startsWith("- ")
                        ? "text-zinc-400 pl-4"
                        : "text-zinc-500"
                    }
                  >
                    {line.replace(/^#+\s*/, "").replace(/^-\s*/, "• ")}
                  </motion.div>
                ))}
              </div>

              {/* 안내 */}
              <p className="text-center text-sm text-zinc-600 mt-4">
                필요할 때 서랍에서 꺼내 참고하는 매뉴얼
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
