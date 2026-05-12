"use client";

import { useEffect, useState } from "react";
import { useCafe, CAFE_ORDER } from "./cafeStore";
import { Cafe } from "./Cafe";
import { CafeControls } from "./CafeControls";
import { KeyboardHints, type Shortcut } from "../KeyboardHints";
import { DemoHeader } from "../DemoHeader";
import { cn } from "@/lib/cn";

const SHORTCUTS: Shortcut[] = [
  { keys: "Space", label: "Play / pause" },
  { keys: "R", label: "Reset" },
  { keys: "1 / 2 / 3", label: "Speed" },
  { keys: "F", label: "Fullscreen" },
];

const SKIP_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);

export function CafeDemo() {
  const [expanded, setExpanded] = useState(false);
  const tick = useCafe((s) => s.tick);
  const isPlaying = useCafe((s) => s.isPlaying);

  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(80, now - last);
      last = now;
      tick(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      if (target && SKIP_TAGS.has(target.tagName)) return;
      const tag = target?.tagName;
      const store = useCafe.getState();

      switch (e.key) {
        case " ":
        case "k":
        case "K":
          if (tag === "BUTTON" || tag === "A") return;
          e.preventDefault();
          store.isPlaying ? store.pause() : store.play();
          break;
        case "r":
        case "R":
          if (tag === "BUTTON" || tag === "A") return;
          e.preventDefault();
          store.reset();
          break;
        case "1":
          store.setSpeed(0.5);
          break;
        case "2":
          store.setSpeed(1);
          break;
        case "3":
          store.setSpeed(2);
          break;
        case "f":
        case "F":
          if (tag === "BUTTON" || tag === "A") return;
          e.preventDefault();
          setExpanded((v) => !v);
          break;
        case "Escape":
          if (expanded) {
            e.preventDefault();
            setExpanded(false);
          }
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

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
          "fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-8 overflow-auto"
      )}
    >
      <div
        className={cn("space-y-4", expanded ? "w-full max-w-5xl" : "w-full")}
      >
        <DemoHeader
          label="Lesson 2 · Demo"
          tagline="Same arrivals · three different kitchens"
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />
        <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-background p-3 sm:p-4">
          <div className="space-y-3">
            {CAFE_ORDER.map((id) => (
              <Cafe key={id} id={id} />
            ))}
          </div>
        </div>
        <CafeControls />
        <KeyboardHints shortcuts={SHORTCUTS} />
      </div>
    </div>
  );
}
