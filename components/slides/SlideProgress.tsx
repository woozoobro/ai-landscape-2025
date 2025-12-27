"use client";

interface SlideProgressProps {
  current: number;
  total: number;
  onNavigate: (index: number) => void;
}

export default function SlideProgress({
  current,
  total,
  onNavigate,
}: SlideProgressProps) {
  return (
    <div className="flex justify-center items-center gap-2 py-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${
              i === current
                ? "bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                : "bg-zinc-700 hover:bg-zinc-500"
            }
          `}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
