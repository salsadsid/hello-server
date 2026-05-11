"use client";

import { motion, AnimatePresence } from "motion/react";
import { useJourney, STAGE_CAPTIONS } from "./journeyStore";
import { cn } from "@/lib/cn";

const SPEEDS = [0.5, 1, 2] as const;

export function Controls() {
  const stage = useJourney((s) => s.stage);
  const isPlaying = useJourney((s) => s.isPlaying);
  const speed = useJourney((s) => s.speed);
  const play = useJourney((s) => s.play);
  const pause = useJourney((s) => s.pause);
  const step = useJourney((s) => s.step);
  const reset = useJourney((s) => s.reset);
  const setSpeed = useJourney((s) => s.setSpeed);

  const caption = STAGE_CAPTIONS[stage];
  const atEnd = stage === "done";
  const playLabel = isPlaying
    ? "Pause"
    : atEnd || stage === "idle"
    ? "Play"
    : "Resume";

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-surface px-4 py-3 min-h-[68px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {caption.title}
            </div>
            <div className="text-sm mt-1">{caption.detail}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={isPlaying ? pause : play}
          className="btn-primary min-w-[88px]"
        >
          {playLabel}
        </button>
        <button onClick={step} className="btn-secondary" disabled={atEnd}>
          Step →
        </button>
        <button onClick={reset} className="btn-secondary">
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
    </div>
  );
}
