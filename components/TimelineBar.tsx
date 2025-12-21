"use client";

import { EventNode, Company } from "@/app/data/events";

// Company colors
const COLORS: Record<Company, string> = {
  Anthropic: "#d97757",
  OpenAI: "#10a37f",
  Google: "#4285f4",
};

interface TimelineBarProps {
  events: EventNode[];
  currentIndex: number;
  company: Company;
  visible: boolean;
  onEventClick?: (index: number) => void;
}

export default function TimelineBar({
  events,
  currentIndex,
  company,
  visible,
  onEventClick,
}: TimelineBarProps) {
  const color = COLORS[company];

  // Format date for tooltip (YYYY-MM-DD → MM/DD)
  const formatDate = (date: string) => {
    const parts = date.split("-");
    return `${parts[1]}/${parts[2]}`;
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[1000] transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative px-8 py-6">
        {/* Progress info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color }}
            >
              {company}
            </span>
            <span className="text-zinc-500 text-xs">
              {currentIndex + 1} / {events.length}
            </span>
          </div>
          <div className="text-zinc-500 text-xs font-mono">
            {events[currentIndex]?.date}
          </div>
        </div>

        {/* Timeline dots */}
        <div className="flex items-center justify-center gap-2">
          {events.map((event, index) => {
            const isActive = index === currentIndex;
            const isPast = index < currentIndex;

            return (
              <button
                key={event.id}
                onClick={() => onEventClick?.(index)}
                className="group relative flex items-center justify-center"
                title={`${formatDate(event.date)}: ${event.label}`}
              >
                {/* Dot */}
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-3 h-3 scale-125"
                      : isPast
                      ? "w-2 h-2"
                      : "w-2 h-2"
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? color
                      : isPast
                      ? `${color}80`
                      : "#52525b",
                    boxShadow: isActive ? `0 0 12px ${color}` : "none",
                  }}
                />

                {/* Hover indicator */}
                {!isActive && (
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-150"
                    style={{
                      backgroundColor: `${color}30`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Keyboard hint */}
        <div className="flex items-center justify-center gap-4 mt-4 text-zinc-600 text-[10px]">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">
              ←
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">
              →
            </kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 font-mono">
              Esc
            </kbd>
            Exit
          </span>
        </div>
      </div>
    </div>
  );
}
