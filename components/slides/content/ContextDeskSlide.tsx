"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, User, Send, ArrowRight, X, BookOpen, Globe } from "lucide-react";
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

const agentDetails = {
  리서처: {
    title: "리서처",
    desc: "정보 수집 전문 에이전트",
    color: "text-purple-400",
    content: [
      "# Researcher Agent",
      "",
      "## 역할",
      "정보 수집 및 조사 전담",
      "",
      "## 주요 작업",
      "- 웹 검색 및 자료 수집",
      "- 문서 분석 및 요약",
      "- 트렌드 리서치",
    ],
  },
  디자이너: {
    title: "디자이너",
    desc: "시각 디자인 전문 에이전트",
    color: "text-pink-400",
    content: [
      "# Designer Agent",
      "",
      "## 역할",
      "시각 디자인 및 UI 전담",
      "",
      "## 주요 작업",
      "- 슬라이드 디자인",
      "- UI 컴포넌트 생성",
      "- 시각 자료 제작",
    ],
  },
  분석가: {
    title: "분석가",
    desc: "데이터 분석 전문 에이전트",
    color: "text-indigo-400",
    content: [
      "# Analyst Agent",
      "",
      "## 역할",
      "데이터 분석 및 인사이트 도출",
      "",
      "## 주요 작업",
      "- 데이터 처리 및 분석",
      "- 리포트 생성",
      "- 패턴 및 트렌드 분석",
    ],
  },
};

const claudeMdContent = {
  title: "CLAUDE.md",
  desc: "프로젝트 규칙서",
  content: [
    "# AI Landscape 2025",
    "",
    "## 프로젝트 목적",
    "- 인프런 라이브 세션 보조 자료",
    "- 3사 AI 트렌드 시각화",
    "",
    "## 기술 스택",
    "- Next.js 16 + React 19",
    "- TailwindCSS v4",
    "- TypeScript",
    "",
    "## 핵심 규칙",
    "- docs/progress.md 참조 필수",
    "- 슬라이드는 registry.ts에 등록",
  ],
};

export default function ContextDeskSlide({}: SlideProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showClaudeMd, setShowClaudeMd] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

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
              {/* CLAUDE.md 규칙서 */}
              <motion.div
                className="absolute top-5 left-5 w-28 h-20 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowClaudeMd(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-7 h-7 text-emerald-500 mb-0.5" />
                <span className="text-sm font-bold text-zinc-800">
                  CLAUDE.md
                </span>
                <span className="text-[10px] text-zinc-500">규칙서 (클릭!)</span>
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
                className="flex flex-col items-center gap-3 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                onClick={() => setSelectedAgent(agent.name)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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

      {/* MCP - 모니터 + 네트워크 */}
      <motion.div
        className="flex items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {/* MCP 라벨 */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-cyan-400">MCP</span>
          <span className="text-sm text-zinc-500">외부 연동</span>
        </div>

        {/* 모니터 프레임 */}
        <div className="relative">
          {/* 모니터 */}
          <div className="bg-zinc-900 border-2 border-cyan-500/50 rounded-xl p-4 shadow-lg shadow-cyan-500/10">
            {/* 화면 안 네트워크 */}
            <div className="flex items-center gap-3">
              {/* 중앙 허브 */}
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/50">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>

              {/* 연결선 + 서비스들 */}
              <div className="flex items-center gap-2">
                {mcpServices.map((service, i) => (
                  <motion.div
                    key={service}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {/* 연결선 */}
                    <div className="w-4 h-0.5 bg-cyan-500/40" />
                    {/* 서비스 노드 */}
                    <div className="px-3 py-1.5 bg-zinc-800 rounded-lg border border-zinc-600 text-sm text-zinc-300">
                      {service}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 모니터 받침 */}
          <div className="flex justify-center">
            <div className="w-16 h-2 bg-zinc-700 rounded-b" />
          </div>
          <div className="flex justify-center">
            <div className="w-24 h-1.5 bg-zinc-700 rounded-b" />
          </div>
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

      {/* CLAUDE.md 모달 */}
      <AnimatePresence>
        {showClaudeMd && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowClaudeMd(false)}
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
                  <FileText className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-400">
                      {claudeMdContent.title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {claudeMdContent.desc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClaudeMd(false)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>

              {/* 내용 */}
              <div className="bg-zinc-800 rounded-xl p-4 font-mono text-sm space-y-1">
                {claudeMdContent.content.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={
                      line.startsWith("# ")
                        ? "text-xl font-bold text-white"
                        : line.startsWith("## ")
                        ? "text-lg font-semibold text-emerald-400 mt-3"
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
                프로젝트의 시스템 프롬프트 - 항상 Context에 로드됨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent 상세 모달 */}
      <AnimatePresence>
        {selectedAgent && agentDetails[selectedAgent as keyof typeof agentDetails] && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAgent(null)}
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
                  <User className={`w-8 h-8 ${agentDetails[selectedAgent as keyof typeof agentDetails].color}`} />
                  <div>
                    <h3 className={`text-2xl font-bold ${agentDetails[selectedAgent as keyof typeof agentDetails].color}`}>
                      {agentDetails[selectedAgent as keyof typeof agentDetails].title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {agentDetails[selectedAgent as keyof typeof agentDetails].desc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-500" />
                </button>
              </div>

              {/* 내용 */}
              <div className="bg-zinc-800 rounded-xl p-4 font-mono text-sm space-y-1">
                {agentDetails[selectedAgent as keyof typeof agentDetails].content.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={
                      line.startsWith("# ")
                        ? "text-xl font-bold text-white"
                        : line.startsWith("## ")
                        ? `text-lg font-semibold ${agentDetails[selectedAgent as keyof typeof agentDetails].color} mt-3`
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
                별도 Context에서 작업 → 결과만 전달
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
