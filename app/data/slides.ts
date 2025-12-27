export type SlideType = "title" | "content" | "bullets" | "image" | "comparison";

export interface Slide {
  id: string;
  type: SlideType;
  title?: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  image?: string;
  company?: "Anthropic" | "OpenAI" | "Google";
}

// 샘플 슬라이드 (나중에 실제 콘텐츠로 교체)
export const slides: Slide[] = [
  {
    id: "intro",
    type: "title",
    title: "2025 AI Landscape",
    subtitle: "Anthropic · OpenAI · Google",
  },
  {
    id: "keywords",
    type: "bullets",
    title: "2025 핵심 키워드",
    bullets: [
      "Reasoning Model",
      "컨텍스트 엔지니어링",
      "바이브 코딩",
      "에이전트",
    ],
  },
  {
    id: "anthropic-intro",
    type: "title",
    title: "Anthropic",
    subtitle: '"일의 깊이"',
    company: "Anthropic",
  },
  {
    id: "openai-intro",
    type: "title",
    title: "OpenAI",
    subtitle: '"일상의 넓이"',
    company: "OpenAI",
  },
  {
    id: "google-intro",
    type: "title",
    title: "Google",
    subtitle: '"판의 크기"',
    company: "Google",
  },
];
