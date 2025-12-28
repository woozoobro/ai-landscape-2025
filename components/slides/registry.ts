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
];

/** Helper to get slide metadata without loading component */
export function getSlideMetadata(): SlideMetadata[] {
  return slideRegistry.map((s) => s.meta);
}

/** Total slide count (for progress indicators) */
export const TOTAL_SLIDES = slideRegistry.length;
