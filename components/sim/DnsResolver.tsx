"use client";

import { motion } from "motion/react";
import type { Stage } from "./journeyStore";
import { POS } from "./positions";

export function DnsResolver({ stage }: { stage: Stage }) {
  const isActive = stage === "dns-query" || stage === "dns-response";

  return (
    <div
      className="absolute"
      style={{
        left: `${POS.dns.x}%`,
        top: `${POS.dns.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.9, repeat: isActive ? Infinity : 0 }}
        className="rounded-xl border border-border bg-surface shadow-md px-4 py-2.5 flex flex-col items-center gap-0.5"
      >
        <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
          phonebook
        </div>
        <div className="text-sm font-semibold">DNS</div>
      </motion.div>
      <div className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
        Address lookup
      </div>
    </div>
  );
}
