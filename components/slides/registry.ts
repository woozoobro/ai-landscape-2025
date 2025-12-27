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
    meta: { id: "keywords", title: "2025 Core Keywords" },
    load: () => import("./content/KeywordsSlide"),
  },
  {
    meta: { id: "anthropic-intro", title: "Anthropic", company: "Anthropic" },
    load: () => import("./content/AnthropicIntroSlide"),
  },
  {
    meta: { id: "openai-intro", title: "OpenAI", company: "OpenAI" },
    load: () => import("./content/OpenAIIntroSlide"),
  },
  {
    meta: { id: "google-intro", title: "Google", company: "Google" },
    load: () => import("./content/GoogleIntroSlide"),
  },
];

/** Helper to get slide metadata without loading component */
export function getSlideMetadata(): SlideMetadata[] {
  return slideRegistry.map((s) => s.meta);
}

/** Total slide count (for progress indicators) */
export const TOTAL_SLIDES = slideRegistry.length;
