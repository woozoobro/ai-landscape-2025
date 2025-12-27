"use client";

import { Slide } from "@/app/data/slides";

interface SlideRendererProps {
  slide: Slide;
}

// 회사별 색상 매핑
const companyColors: Record<string, { primary: string; glow: string }> = {
  Anthropic: { primary: "text-orange-400", glow: "shadow-orange-500/30" },
  OpenAI: { primary: "text-emerald-400", glow: "shadow-emerald-500/30" },
  Google: { primary: "text-blue-400", glow: "shadow-blue-500/30" },
};

function TitleSlide({ slide }: { slide: Slide }) {
  const colors = slide.company ? companyColors[slide.company] : null;

  return (
    <div className="text-center space-y-6">
      <h1
        className={`text-6xl md:text-8xl font-bold tracking-tight ${
          colors ? colors.primary : "text-white"
        }`}
        style={{
          textShadow: colors
            ? `0 0 60px var(--tw-shadow-color)`
            : "0 0 60px rgba(255,255,255,0.2)",
        }}
      >
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="text-2xl md:text-3xl text-zinc-400 font-light">
          {slide.subtitle}
        </p>
      )}
    </div>
  );
}

function ContentSlide({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-4xl space-y-8">
      {slide.title && (
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          {slide.title}
        </h2>
      )}
      {slide.content && (
        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
          {slide.content}
        </p>
      )}
    </div>
  );
}

function BulletsSlide({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-4xl space-y-8">
      {slide.title && (
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          {slide.title}
        </h2>
      )}
      {slide.bullets && (
        <ul className="space-y-6">
          {slide.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-2xl md:text-3xl text-zinc-200 flex items-start gap-4"
            >
              <span className="text-zinc-600 mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ImageSlide({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-5xl space-y-6">
      {slide.title && (
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          {slide.title}
        </h2>
      )}
      {slide.image && (
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img
            src={slide.image}
            alt={slide.title || "Slide image"}
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}

function ComparisonSlide({ slide }: { slide: Slide }) {
  return (
    <div className="max-w-6xl space-y-8">
      {slide.title && (
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
          {slide.title}
        </h2>
      )}
      {/* 비교 슬라이드는 나중에 확장 */}
      {slide.content && (
        <p className="text-xl text-zinc-300 text-center">{slide.content}</p>
      )}
    </div>
  );
}

export default function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.type) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "content":
      return <ContentSlide slide={slide} />;
    case "bullets":
      return <BulletsSlide slide={slide} />;
    case "image":
      return <ImageSlide slide={slide} />;
    case "comparison":
      return <ComparisonSlide slide={slide} />;
    default:
      return null;
  }
}
