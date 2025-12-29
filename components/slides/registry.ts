import type { LazySlideDefinition, SlideMetadata } from "./types";

/**
 * Central registry of all slides.
 * Uses dynamic imports for code splitting.
 * Order determines presentation sequence.
 */
export const slideRegistry: LazySlideDefinition[] = [
  {
    meta: { id: "intro", title: "2025 AI Landscape" },
    load: () => import("./content/IntroSlide"),
  },
  {
    meta: { id: "speaker", title: "Speaker" },
    load: () => import("./content/SpeakerSlide"),
  },
  {
    meta: { id: "pace", title: "The Pace of AI" },
    load: () => import("./content/PaceSlide"),
  },
  {
    meta: { id: "keywords", title: "2025 Core Keywords" },
    load: () => import("./content/KeywordsSlide"),
  },
  {
    meta: { id: "reasoning-model", title: "Reasoning Model" },
    load: () => import("./content/ReasoningModelSlide"),
  },
  {
    meta: { id: "context-engineering", title: "Context Engineering" },
    load: () => import("./content/ContextEngineeringSlide"),
  },
  {
    meta: { id: "media-generation", title: "Media Generation AI" },
    load: () => import("./content/MediaGenerationSlide"),
  },
  {
    meta: { id: "agent", title: "Agent" },
    load: () => import("./content/AgentSlide"),
  },
  {
    meta: { id: "vibe-coding", title: "Vibe Coding" },
    load: () => import("./content/VibeCodingSlide"),
  },
  {
    meta: { id: "three-directions", title: "Three Directions" },
    load: () => import("./content/ThreeDirectionsSlide"),
  },
  {
    meta: { id: "company-strategies", title: "Company Strategies" },
    load: () => import("./content/CompanyStrategiesSlide"),
  },
  {
    meta: { id: "anthropic", title: "Anthropic - 일의 깊이" },
    load: () => import("./content/AnthropicSlide"),
  },
  {
    meta: { id: "openai", title: "OpenAI - 일상의 넓이" },
    load: () => import("./content/OpenAISlide"),
  },
  {
    meta: { id: "google", title: "Google - 판의 크기" },
    load: () => import("./content/GoogleSlide"),
  },
  {
    meta: { id: "three-giants-summary", title: "Three Giants Summary" },
    load: () => import("./content/ThreeGiantsSummarySlide"),
  },
  {
    meta: { id: "claude-code-intro", title: "Claude Code 소개" },
    load: () => import("./content/ClaudeCodeIntroSlide"),
  },
  {
    meta: { id: "claude-code-why", title: "비개발자가 왜 Claude Code를?" },
    load: () => import("./content/ClaudeCodeWhySlide"),
  },
  {
    meta: { id: "claude-code-what", title: "Claude Code가 뭔데?" },
    load: () => import("./content/ClaudeCodeWhatSlide"),
  },
  {
    meta: { id: "claude-code-principle", title: "Claude Code의 원리" },
    load: () => import("./content/ClaudeCodePrincipleSlide"),
  },
  {
    meta: { id: "tool-use", title: "Tool Use" },
    load: () => import("./content/ToolUseSlide"),
  },
  {
    meta: { id: "claude-folder", title: ".claude 폴더" },
    load: () => import("./content/ClaudeFolderSlide"),
  },
  {
    meta: { id: "context-desk", title: "Context = 책상" },
    load: () => import("./content/ContextDeskSlide"),
  },
  {
    meta: { id: "live-picks", title: "써보면 좋은 것들" },
    load: () => import("./content/LivePicksSlide"),
  },
  {
    meta: { id: "outro", title: "더 알아보기" },
    load: () => import("./content/OutroSlide"),
  },
];

/** Helper to get slide metadata without loading component */
export function getSlideMetadata(): SlideMetadata[] {
  return slideRegistry.map((s) => s.meta);
}

/** Total slide count (for progress indicators) */
export const TOTAL_SLIDES = slideRegistry.length;
