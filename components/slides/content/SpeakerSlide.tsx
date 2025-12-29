"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SlideProps } from "../types";

export default function SpeakerSlide({}: SlideProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-12 md:p-20">
      <div className="flex flex-col gap-12">
        {/* 타이틀 */}
        <h2 className="text-6xl md:text-8xl font-bold text-white">About Me</h2>

        {/* 메인 컨텐츠 */}
        <div className="flex items-center gap-24 md:gap-32">
          {/* 좌측: 불릿 정보 */}
          <ul className="space-y-6 text-4xl text-zinc-300">
            <li className="flex items-start gap-4">
              <span className="text-zinc-500 mt-1">■</span>
              <span>팀 모노리스 · AI 에반젤리스트</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-zinc-500 mt-1">■</span>
              <span>요즘IT 작가</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-zinc-500 mt-1">■</span>
              <a
                href="https://yozm.wishket.com/magazine/detail/3162/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                클로드 코드 아티클
                <span className="text-emerald-500 ml-1">10만뷰</span>
                <ArrowUpRight className="w-5 h-5 text-zinc-500" />
              </a>
            </li>
          </ul>

          {/* 우측: 사진 + QR + 이름 */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-8">
              {/* 프로필 사진 */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-4 ring-zinc-700">
                <Image
                  src="/woozoobro.png"
                  alt="우주형"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* LinkedIn QR */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl p-2">
                  <Image
                    src="/linkedin-qr-woozoobro.png"
                    alt="LinkedIn QR"
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm text-zinc-500">LinkedIn</span>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-5xl font-bold text-white">우주형</h3>
              <a
                href="https://www.linkedin.com/in/woozoobro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn →
              </a>
              <p className="text-lg text-zinc-500 pt-2">
                find me with <span className="text-zinc-400">@woozoobro</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
