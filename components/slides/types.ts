import type { ComponentType } from "react";

/** Company type (shared with events.ts) */
export type Company = "Anthropic" | "OpenAI" | "Google";

/** Props injected into every slide component */
export interface SlideProps {
  /** Currently visible slide */
  isActive: boolean;
  /** Within preload window (mounted but not visible) */
  isAdjacent: boolean;
  /** Navigation direction for animations */
  direction: "forward" | "backward";
}

/** Slide metadata for registry */
export interface SlideMetadata {
  id: string;
  title?: string;
  company?: Company;
}

/** Lazy-loadable slide definition */
export interface LazySlideDefinition {
  meta: SlideMetadata;
  load: () => Promise<{ default: ComponentType<SlideProps> }>;
}
