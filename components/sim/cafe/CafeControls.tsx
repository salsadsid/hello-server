"use client";

import { useCafe } from "./cafeStore";
import { cn } from "@/lib/cn";

const SPEEDS = [0.5, 1, 2] as const;

export function CafeControls() {
  const isPlaying = useCafe((s) => s.isPlaying);
  const speed = useCafe((s) => s.speed);
  const demoMs = useCafe((s) => s.demoMs);
  const play = useCafe((s) => s.play);
  const pause = useCafe((s) => s.pause);
  const reset = useCafe((s) => s.reset);
  const setSpeed = useCafe((s) => s.setSpeed);

  const started = demoMs > 0;
  const playLabel = isPlaying ? "Pause" : started ? "Resume" : "Play";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={isPlaying ? pause : play}
        className="btn-primary min-w-[88px]"
      >
        {playLabel}
      </button>
      <button onClick={reset} className="btn-secondary" disabled={!started}>
        Reset
      </button>
      <div className="ml-auto flex items-center gap-1 text-xs text-muted">
        <span className="mr-1">Speed</span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={cn(
              "px-2 py-1 rounded font-mono text-xs transition",
              speed === s
                ? "bg-primary text-primary-fg"
                : "hover:bg-foreground/5 text-foreground"
            )}
          >
            {s}×
          </button>
        ))}
      </div>
    </div>
  );
}
