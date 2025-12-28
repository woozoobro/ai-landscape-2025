"use client";

import { motion } from "framer-motion";
import {
  Laptop,
  IdCard,
  BookMarked,
  Users2,
  Cable,
  FileStack,
  MoveRight,
  MoveLeft,
} from "lucide-react";
import type { SlideProps } from "../types";

const mcpServices = ["Notion", "Slack", "Jira", "GitHub"];

export default function ContextDeskSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8 gap-6">
      {/* 타이틀 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-white">
          Claude = 스타트업 <span className="text-orange-400">신입</span>
        </h2>
      </motion.div>

      {/* 메인 레이아웃: Skills - Context - Subagents */}
      <div className="flex items-stretch justify-center gap-6 w-full max-w-6xl">
        {/* Skills - 왼쪽 */}
        <motion.div
          className="flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700 min-w-[160px]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <BookMarked className="w-12 h-12 text-blue-400" />
          <span className="text-2xl font-bold text-blue-400">Skills</span>
          <span className="text-lg text-zinc-500 text-center">
            서랍 속<br />매뉴얼
          </span>
          <div className="flex items-center gap-2 mt-2 text-zinc-600">
            <span className="text-sm">필요할 때</span>
            <MoveRight className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Context Window - 중앙 (책상) */}
        <motion.div
          className="relative flex-1 max-w-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl border-2 border-orange-500 p-6 shadow-lg shadow-orange-500/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* 한정됨 뱃지 */}
          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-orange-500 rounded-full text-sm font-bold text-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            한정된 공간
          </motion.div>

          {/* 헤더 */}
          <div className="flex items-center gap-3 mb-6">
            <Laptop className="w-8 h-8 text-orange-400" />
            <div>
              <span className="text-3xl font-bold text-orange-400">
                Context Window
              </span>
              <span className="text-xl text-zinc-500 ml-3">= 내 책상</span>
            </div>
          </div>

          {/* CLAUDE.md 사원증 */}
          <motion.div
            className="flex items-center gap-4 bg-zinc-800/80 rounded-xl p-5 mb-4 border border-emerald-500/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <IdCard className="w-10 h-10 text-emerald-400" />
            <div>
              <span className="text-2xl font-semibold text-emerald-400">
                CLAUDE.md
              </span>
              <span className="text-lg text-zinc-400 ml-3">
                사원증 (항상 책상 위)
              </span>
            </div>
          </motion.div>

          {/* 작업 서류들 */}
          <motion.div
            className="flex items-center gap-3 text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6 }}
          >
            <FileStack className="w-6 h-6" />
            <span className="text-lg">현재 작업 중인 서류들...</span>
          </motion.div>
        </motion.div>

        {/* Subagents - 오른쪽 */}
        <motion.div
          className="flex flex-col items-center justify-center gap-3 p-5 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700 min-w-[160px]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <Users2 className="w-12 h-12 text-purple-400" />
          <span className="text-2xl font-bold text-purple-400">Subagents</span>
          <span className="text-lg text-zinc-500 text-center">
            옆 팀<br />동료
          </span>
          <div className="flex items-center gap-2 mt-2 text-zinc-600">
            <MoveLeft className="w-4 h-4" />
            <span className="text-sm">결과만</span>
          </div>
        </motion.div>
      </div>

      {/* MCP - 하단 */}
      <motion.div
        className="flex items-center gap-5 px-6 py-4 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <Cable className="w-7 h-7 text-cyan-400" />
          <span className="text-xl font-bold text-cyan-400">MCP</span>
        </div>
        <span className="text-lg text-zinc-600">=</span>
        <span className="text-lg text-zinc-400">회사 외부 SaaS</span>
        <div className="flex gap-2 ml-2">
          {mcpServices.map((service) => (
            <span
              key={service}
              className="px-3 py-1 bg-zinc-700/50 rounded-lg text-lg text-zinc-400"
            >
              {service}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 핵심 메시지 */}
      <motion.p
        className="text-2xl md:text-3xl text-zinc-300 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        핵심은{" "}
        <span className="text-orange-400 font-semibold">책상을 깔끔하게</span>{" "}
        유지하는 것
      </motion.p>
    </div>
  );
}
