"use client";

import { motion } from "motion/react";
import type { Stage } from "./journeyStore";
import { POS } from "./positions";

export function Browser({ stage }: { stage: Stage }) {
  const isRendering = stage === "rendering" || stage === "done";

  return (
    <div
      className="absolute"
      style={{
        left: `${POS.browser.x}%`,
        top: `${POS.browser.y}%`,
        transform: "translate(-50%, -50%)",
        width: "28%",
      }}
    >
      <div className="rounded-xl border border-border bg-surface shadow-md overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-border bg-foreground/[0.04] px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <div className="ml-2 flex-1 text-[11px] font-mono text-muted truncate">
            google.com
          </div>
        </div>
        <div className="relative min-h-[70px] p-3">
          {!isRendering ? (
            <div className="text-[11px] text-muted italic">
              waiting for response…
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-2"
            >
              <div className="h-2 w-1/2 rounded bg-primary/40" />
              <div className="h-2 w-3/4 rounded bg-foreground/20" />
              <div className="h-2 w-2/3 rounded bg-foreground/20" />
              <div className="h-2 w-1/3 rounded bg-foreground/20" />
            </motion.div>
          )}
        </div>
      </div>
      <div className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
        Your browser
      </div>
    </div>
  );
}
