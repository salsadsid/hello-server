"use client";

import { useEffect, useState } from "react";
import { Scene } from "./Scene";
import { Controls } from "./Controls";
import { useJourney } from "./journeyStore";
import { cn } from "@/lib/cn";

const SHORTCUTS: { keys: string; label: string }[] = [
  { keys: "Space", label: "Play / pause" },
  { keys: "R", label: "Reset" },
  { keys: "→", label: "Step" },
  { keys: "F", label: "Fullscreen" },
];

const SKIP_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function RequestJourneyDemo() {
  const [expanded, setExpanded] = useState(false);
  const isPlaying = useJourney((s) => s.isPlaying);
  const play = useJourney((s) => s.play);
  const pause = useJourney((s) => s.pause);
  const reset = useJourney((s) => s.reset);
  const step = useJourney((s) => s.step);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      if (target && SKIP_TAGS.has(target.tagName)) return;

      switch (e.key) {
        case " ":
        case "k": {
          if (target?.tagName === "BUTTON" || target?.tagName === "A") return;
          e.preventDefault();
          if (isPlaying) pause();
          else play();
          break;
        }
        case "r":
        case "R": {
          if (target?.tagName === "BUTTON" || target?.tagName === "A") return;
          e.preventDefault();
          reset();
          break;
        }
        case "n":
        case "N":
        case "ArrowRight": {
          if (target?.tagName === "BUTTON" || target?.tagName === "A") return;
          e.preventDefault();
          step();
          break;
        }
        case "f":
        case "F": {
          if (target?.tagName === "BUTTON" || target?.tagName === "A") return;
          e.preventDefault();
          setExpanded((v) => !v);
          break;
        }
        case "Escape": {
          if (expanded) {
            e.preventDefault();
            setExpanded(false);
          }
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPlaying, play, pause, reset, step, expanded]);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [expanded]);

  return (
    <div
      className={cn(
        "w-full",
        expanded &&
          "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-8"
      )}
    >
      <div
        className={cn("space-y-4", expanded ? "w-full max-w-5xl" : "w-full")}
      >
        <DemoHeader
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />
        <Scene expanded={expanded} />
        <Controls />
        <KeyboardHints />
      </div>
    </div>
  );
}

function DemoHeader({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-muted">
      <span className="font-mono uppercase tracking-wider">
        Lesson 1 · Demo
      </span>
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-foreground/5 hover:text-foreground transition"
        aria-label={expanded ? "Exit fullscreen (Esc)" : "Enter fullscreen (F)"}
      >
        {expanded ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        <span>{expanded ? "Exit (Esc)" : "Fullscreen"}</span>
      </button>
    </div>
  );
}

function KeyboardHints() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted pt-1">
      <span className="font-mono uppercase tracking-wider text-[10px]">
        Keyboard
      </span>
      {SHORTCUTS.map((s) => (
        <span key={s.keys} className="inline-flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface font-mono text-[10px] shadow-sm text-foreground/80">
            {s.keys}
          </kbd>
          <span>{s.label}</span>
        </span>
      ))}
    </div>
  );
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExitFullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
