"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HelpCircle } from "lucide-react";
import type { SlideProps } from "../types";

const initialText = "오늘 날씨가";
const tokenSteps = [
  {
    selected: " 정말",
    candidates: [
      { text: " 정말", prob: 0.82 },
      { text: " 매우", prob: 0.65 },
      { text: " 완전", prob: 0.31 },
      { text: " 진짜", prob: 0.18 },
    ],
  },
  {
    selected: " 좋네요",
    candidates: [
      { text: " 좋네요", prob: 0.88 },
      { text: " 좋아요", prob: 0.72 },
      { text: " 맑네요", prob: 0.45 },
      { text: " 덥네요", prob: 0.22 },
    ],
  },
  {
    selected: ".",
    candidates: [
      { text: ".", prob: 0.91 },
      { text: "!", prob: 0.68 },
      { text: "~", prob: 0.35 },
      { text: "?", prob: 0.12 },
    ],
  },
];

export default function ClaudeCodePrincipleSlide({}: SlideProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const candidatesRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [cursorLeft, setCursorLeft] = useState(0);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current || !candidatesRef.current) return;

    // 커서 깜빡임 - 별도 무한 루프
    const cursorBlink = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    // 초기화
    tl.set(textRef.current, { innerHTML: "" });
    tl.set(candidatesRef.current, { opacity: 0, scale: 0.9 });
    tl.call(() => setCursorLeft(0));

    // 초기 텍스트 타이핑 (더 빠르게)
    const chars = initialText.split("");
    chars.forEach((char) => {
      tl.call(() => {
        if (textRef.current) {
          textRef.current.innerHTML += char;
          setCursorLeft(textRef.current.offsetWidth);
        }
      });
      tl.to({}, { duration: 0.06 });
    });

    // 타이핑 후 잠시 대기
    tl.to({}, { duration: 0.5 });

    // 각 토큰 단계
    tokenSteps.forEach((step, stepIndex) => {
      // 후보 표시
      tl.call(() => {
        setCurrentStep(stepIndex);
        if (textRef.current) {
          setCursorLeft(textRef.current.offsetWidth);
        }
      });
      tl.to(candidatesRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(1.5)" });

      // 후보 선택 대기
      tl.to({}, { duration: 0.8 });

      // 후보 사라지고 선택된 토큰 추가
      tl.to(candidatesRef.current, { opacity: 0, scale: 0.9, duration: 0.15 });
      tl.call(() => {
        if (textRef.current) {
          textRef.current.innerHTML += step.selected;
          setCursorLeft(textRef.current.offsetWidth);
        }
        setCurrentStep(-1);
      });

      // 다음 단계 전 대기
      tl.to({}, { duration: 0.25 });
    });

    // 완성 후 대기
    tl.to({}, { duration: 1.5 });

    // 페이드 아웃
    tl.to([textRef.current, cursorRef.current], { opacity: 0, duration: 0.6 });
    tl.to({}, { duration: 0.4 });

    // 리셋
    tl.call(() => {
      if (textRef.current) {
        textRef.current.innerHTML = "";
        gsap.set(textRef.current, { opacity: 1 });
      }
      if (cursorRef.current) {
        gsap.set(cursorRef.current, { opacity: 1 });
      }
      setCursorLeft(0);
    });

    return () => {
      tl.kill();
      cursorBlink.kill();
    };
  }, []);

  const currentCandidates = currentStep >= 0 ? tokenSteps[currentStep].candidates : [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 gap-6">
      {/* 타이틀 */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        LLM은 <span className="text-orange-400">텍스트</span>를 생성한다
      </h2>

      {/* 텍스트 생성 시각화 영역 */}
      <div className="relative w-full max-w-4xl">
        {/* 메인 텍스트 박스 */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-8 md:p-10 overflow-visible">
          <div className="flex items-center min-h-[60px] relative">
            <span
              ref={textRef}
              className="text-3xl md:text-4xl font-mono text-white"
            />
            <span
              ref={cursorRef}
              className="inline-block w-1 h-10 bg-orange-400 ml-1"
            />

            {/* 토큰 후보 패널 - 커서 위치 따라감 */}
            <div
              ref={candidatesRef}
              className="absolute top-full mt-3 bg-zinc-800 rounded-xl border border-zinc-600 p-3 min-w-[200px] z-10 shadow-xl shadow-black/50"
              style={{
                opacity: 0,
                left: `${cursorLeft}px`,
                transformOrigin: "top left"
              }}
            >
              <p className="text-xs text-zinc-500 mb-2">다음 토큰</p>
              <div className="space-y-1.5">
                {currentCandidates.map((candidate, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg ${
                      i === 0
                        ? "bg-orange-500/20 border border-orange-400/50"
                        : "bg-zinc-700/50"
                    }`}
                  >
                    <span
                      className={`text-lg font-mono ${
                        i === 0 ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {candidate.text}
                    </span>
                    <span
                      className={`text-sm font-bold ml-4 ${
                        candidate.prob > 0.7
                          ? "text-emerald-400"
                          : candidate.prob > 0.4
                          ? "text-amber-400"
                          : "text-red-400"
                      }`}
                    >
                      {(candidate.prob * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 질문 */}
      <div className="flex items-center gap-3 mt-8">
        <HelpCircle className="w-8 h-8 text-orange-400" />
        <p className="text-2xl md:text-3xl text-zinc-300">
          그런데 어떻게 <span className="text-orange-400">파일을 읽고 수정</span>할 수 있지?
        </p>
      </div>
    </div>
  );
}
