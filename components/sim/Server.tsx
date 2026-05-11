"use client";

import { motion } from "motion/react";
import type { Stage } from "./journeyStore";
import { POS } from "./positions";

export function Server({ stage }: { stage: Stage }) {
  const isProcessing = stage === "processing";

  return (
    <div
      className="absolute"
      style={{
        left: `${POS.server.x}%`,
        top: `${POS.server.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        animate={{
          scale: isProcessing ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.7,
          repeat: isProcessing ? Infinity : 0,
        }}
        className="relative rounded-xl border border-border bg-surface shadow-md w-32 px-4 py-3 flex flex-col items-center gap-1.5"
      >
        <ServerStack pulse={isProcessing} />
        <div className="text-[10px] font-mono text-muted">142.250.190.78</div>
      </motion.div>
      <div className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
        Server
      </div>
    </div>
  );
}

function ServerStack({ pulse }: { pulse: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-16 h-2 rounded bg-foreground/15 relative flex items-center"
        >
          <span className="ml-1 w-0.5 h-1 rounded bg-foreground/40" />
          <span className="ml-0.5 w-0.5 h-1 rounded bg-foreground/40" />
          <motion.span
            animate={{ opacity: pulse ? [1, 0.3, 1] : 1 }}
            transition={{
              duration: 0.6,
              repeat: pulse ? Infinity : 0,
              delay: i * 0.15,
            }}
            className="absolute right-1 w-1.5 h-1.5 rounded-full bg-emerald-500"
          />
        </div>
      ))}
    </div>
  );
}
