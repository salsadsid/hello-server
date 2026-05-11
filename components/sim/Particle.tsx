"use client";

import { motion, AnimatePresence } from "motion/react";
import type { Stage } from "./journeyStore";
import { POS } from "./positions";
import { cn } from "@/lib/cn";

type ParticleConfig = {
  visible: boolean;
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  color?: string;
  label?: string;
};

const CONFIG: Record<Stage, ParticleConfig> = {
  idle: { visible: false },
  "dns-query": {
    visible: true,
    from: POS.browser,
    to: POS.dns,
    color: "bg-amber-400",
    label: "where is google.com?",
  },
  "dns-response": {
    visible: true,
    from: POS.dns,
    to: POS.browser,
    color: "bg-amber-400",
    label: "142.250.190.78",
  },
  request: {
    visible: true,
    from: POS.browser,
    to: POS.server,
    color: "bg-indigo-500",
    label: "GET /",
  },
  processing: { visible: false },
  response: {
    visible: true,
    from: POS.server,
    to: POS.browser,
    color: "bg-emerald-500",
    label: "200 OK + HTML",
  },
  rendering: { visible: false },
  done: { visible: false },
};

export function Particle({
  stage,
  duration,
}: {
  stage: Stage;
  duration: number;
}) {
  const cfg = CONFIG[stage];

  return (
    <AnimatePresence>
      {cfg.visible && cfg.from && cfg.to && (
        <motion.div
          key={stage}
          className="absolute pointer-events-none"
          initial={{
            left: `${cfg.from.x}%`,
            top: `${cfg.from.y}%`,
            x: "-50%",
            y: "-50%",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            left: `${cfg.to.x}%`,
            top: `${cfg.to.y}%`,
            x: "-50%",
            y: "-50%",
            opacity: 1,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            left: { duration: duration / 1000, ease: "easeInOut" },
            top: { duration: duration / 1000, ease: "easeInOut" },
            opacity: { duration: 0.25 },
            scale: { duration: 0.25 },
          }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "rounded-full w-4 h-4 ring-2 ring-white/60 shadow-lg",
                cfg.color
              )}
            />
            <div className="whitespace-nowrap rounded-md bg-foreground text-background px-2 py-0.5 text-[10px] font-mono shadow-md">
              {cfg.label}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
