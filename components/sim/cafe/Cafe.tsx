"use client";

import { motion, AnimatePresence } from "motion/react";
import { useCafe, getCafeStats, type CafeId, type AccentKey } from "./cafeStore";
import { cn } from "@/lib/cn";

const ACCENT: Record<AccentKey, {
  text: string;
  dot: string;
  bar: string;
  ring: string;
  soft: string;
}> = {
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    ring: "ring-amber-500/30",
    soft: "bg-amber-500/10",
  },
  primary: {
    text: "text-primary",
    dot: "bg-primary",
    bar: "bg-primary",
    ring: "ring-primary/30",
    soft: "bg-primary/10",
  },
  accent: {
    text: "text-accent",
    dot: "bg-accent",
    bar: "bg-accent",
    ring: "ring-accent/30",
    soft: "bg-accent/10",
  },
};

const MAX_QUEUE_DOTS = 14;

export function Cafe({ id }: { id: CafeId }) {
  const cafe = useCafe((s) => s.cafes[id]);
  const demoMs = useCafe((s) => s.demoMs);
  const { queueLen, inProgress, avgLatencyMs, throughputPerSec, servedCount } =
    getCafeStats(cafe, demoMs);
  const accent = ACCENT[cafe.config.accent];

  const queueCustomers = cafe.customers
    .filter((c) => c.servedAt === undefined)
    .sort((x, y) => x.arrivedAt - y.arrivedAt)
    .slice(0, MAX_QUEUE_DOTS);
  const overflow = Math.max(0, queueLen - MAX_QUEUE_DOTS);

  const baristaSlots = Array.from({ length: cafe.config.baristas }, (_, i) => {
    const c = inProgress.find((x) => x.baristaIdx === i);
    const progress = c
      ? Math.min(1, (demoMs - (c.servedAt ?? demoMs)) / cafe.config.prepMs)
      : 0;
    return { idx: i, customerId: c?.id, progress };
  });

  return (
    <div className="rounded-xl border border-border bg-surface p-3 sm:p-4 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className={cn("font-semibold text-sm sm:text-base", accent.text)}>
            {cafe.config.label}
          </div>
          <div className="font-mono text-[11px] text-muted">
            {cafe.config.tagline}
          </div>
        </div>
        <div className="flex items-end gap-3 sm:gap-4 shrink-0">
          <Stat
            value={
              avgLatencyMs === null
                ? "—"
                : `${(avgLatencyMs / 1000).toFixed(1)}s`
            }
            label="avg wait"
            accent={accent.text}
          />
          <Stat
            value={throughputPerSec.toFixed(1)}
            unit="/s"
            label="drinks/s"
            accent={accent.text}
          />
          <Stat
            value={String(servedCount)}
            label="served"
          />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)] gap-2 sm:gap-3">
        <div className={cn("relative rounded-lg p-2 sm:p-3", accent.soft)}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Queue
            </span>
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {queueLen}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 content-start min-h-[40px]">
            <AnimatePresence initial={false}>
              {queueCustomers.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.22 }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full ring-2 ring-offset-0",
                    accent.dot,
                    accent.ring
                  )}
                />
              ))}
            </AnimatePresence>
            {overflow > 0 && (
              <span className="self-center font-mono text-[10px] text-muted">
                +{overflow}
              </span>
            )}
          </div>
        </div>

        <Arrow />

        <div className="rounded-lg bg-foreground/[0.03] p-2 sm:p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Baristas
            </span>
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {cafe.config.baristas}
            </span>
          </div>
          <div className="space-y-1.5">
            {baristaSlots.map((slot) => (
              <BaristaRow
                key={slot.idx}
                progress={slot.progress}
                active={slot.customerId !== undefined}
                customerId={slot.customerId}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  unit,
  accent,
}: {
  value: string;
  label: string;
  unit?: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col items-end leading-none">
      <div className="flex items-baseline gap-0.5">
        <span
          className={cn(
            "font-mono text-base sm:text-lg font-semibold tabular-nums",
            accent ?? "text-foreground"
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[10px] text-muted">{unit}</span>
        )}
      </div>
      <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="self-center text-muted">
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 8h10m0 0L9 4m4 4l-4 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function BaristaRow({
  progress,
  active,
  customerId,
  accent,
}: {
  progress: number;
  active: boolean;
  customerId?: number;
  accent: (typeof ACCENT)[AccentKey];
}) {
  return (
    <div className="flex items-center gap-2 h-4">
      <div className="w-1 h-3 rounded-sm bg-foreground/30" aria-hidden />
      <div className="flex-1 relative h-2 rounded-full bg-foreground/10 overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            active ? accent.bar : "bg-transparent"
          )}
          style={{ width: active ? `${progress * 100}%` : "0%" }}
        />
      </div>
      <div className="w-3 h-3 relative flex items-center justify-center">
        <AnimatePresence>
          {active && customerId !== undefined && (
            <motion.div
              key={customerId}
              initial={{ opacity: 0, scale: 0.4, x: -4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 16 }}
              transition={{ duration: 0.28 }}
              className={cn("w-2.5 h-2.5 rounded-full", accent.dot)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
