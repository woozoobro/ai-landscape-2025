"use client";

import { useCallback, useMemo, Suspense, lazy, useState, useRef, useEffect } from "react";
import { slideRegistry, TOTAL_SLIDES } from "./registry";
import SlideProgress from "./SlideProgress";
import SlideContainer from "./SlideContainer";
import type { SlideProps } from "./types";
import type { ComponentType } from "react";

interface SlidesViewProps {
  visible: boolean;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

/** Preload window: current slide +/- this many */
const PRELOAD_WINDOW = 1;

export default function SlidesView({
  visible,
  currentIndex,
  onNavigate,
}: SlidesViewProps) {
  // Cache for loaded components (using state to avoid ref access during render)
  const [loadedComponents] = useState<Map<number, ComponentType<SlideProps>>>(
    () => new Map()
  );

  // Track direction based on navigation
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    const newDirection = currentIndex >= prevIndexRef.current ? "forward" : "backward";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- legitimate previous value tracking pattern
    setDirection(newDirection);
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Determine which slides should be mounted
  const mountedIndices = useMemo(() => {
    const indices = new Set<number>();
    for (
      let i = Math.max(0, currentIndex - PRELOAD_WINDOW);
      i <= Math.min(TOTAL_SLIDES - 1, currentIndex + PRELOAD_WINDOW);
      i++
    ) {
      indices.add(i);
    }
    return indices;
  }, [currentIndex]);

  // Lazy load slide component with caching
  const getSlideComponent = useCallback((index: number) => {
    const cached = loadedComponents.get(index);
    if (cached) {
      return cached;
    }

    const LazyComponent = lazy(async () => {
      const slideModule = await slideRegistry[index].load();
      loadedComponents.set(index, slideModule.default);
      return slideModule;
    });

    return LazyComponent;
  }, [loadedComponents]);

  return (
    <div
      className={`fixed inset-0 bg-zinc-950 transition-opacity duration-300 z-1000 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Slide viewport */}
      <div className="absolute inset-0 overflow-hidden">
        {visible && Array.from(mountedIndices).map((index) => {
          const SlideComponent = getSlideComponent(index);
          const isActive = index === currentIndex;
          const isAdjacent = !isActive;

          return (
            <SlideContainer
              key={`${slideRegistry[index].meta.id}-${isActive}`}
              index={index}
              currentIndex={currentIndex}
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
                  </div>
                }
              >
                <SlideComponent
                  isActive={isActive}
                  isAdjacent={isAdjacent}
                  direction={direction}
                />
              </Suspense>
            </SlideContainer>
          );
        })}
      </div>

      {/* Progress indicator */}
      <SlideProgress
        current={currentIndex}
        total={TOTAL_SLIDES}
        onNavigate={onNavigate}
      />

      {/* Keyboard hints */}
      <div className="fixed bottom-6 left-6 text-zinc-600 text-xs font-mono flex items-center gap-4">
        <span>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
            Tab
          </kbd>{" "}
          Space View
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 ml-1">
            →
          </kbd>{" "}
          Navigate
        </span>
      </div>

      {/* Slide counter */}
      <div className="fixed top-6 right-6 text-zinc-500 text-sm font-mono">
        {currentIndex + 1} / {TOTAL_SLIDES}
      </div>
    </div>
  );
}
