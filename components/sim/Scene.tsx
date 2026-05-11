"use client";

import { useEffect } from "react";
import { useJourney, STAGE_DURATION_MS } from "./journeyStore";
import { Browser } from "./Browser";
import { Server } from "./Server";
import { DnsResolver } from "./DnsResolver";
import { Particle } from "./Particle";
import { SceneLines } from "./SceneLines";
import { cn } from "@/lib/cn";

export function Scene({ expanded = false }: { expanded?: boolean }) {
  const stage = useJourney((s) => s.stage);
  const isPlaying = useJourney((s) => s.isPlaying);
  const speed = useJourney((s) => s.speed);
  const advance = useJourney((s) => s.advance);

  useEffect(() => {
    if (!isPlaying) return;
    if (stage === "done" || stage === "idle") return;
    const duration = STAGE_DURATION_MS[stage] / speed;
    const t = setTimeout(advance, duration);
    return () => clearTimeout(t);
  }, [stage, isPlaying, speed, advance]);

  const duration = STAGE_DURATION_MS[stage] / speed;

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full rounded-2xl border border-border bg-gradient-to-br from-surface to-background overflow-hidden",
        expanded ? "max-h-[70vh]" : "max-h-[520px]"
      )}
    >
      <SceneLines stage={stage} />
      <Browser stage={stage} />
      <DnsResolver stage={stage} />
      <Server stage={stage} />
      <Particle stage={stage} duration={duration} />
    </div>
  );
}
