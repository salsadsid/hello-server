"use client";

import type { Stage } from "./journeyStore";
import { POS } from "./positions";
import { cn } from "@/lib/cn";

export function SceneLines({ stage }: { stage: Stage }) {
  const activeDns = stage === "dns-query" || stage === "dns-response";
  const activeServer = stage === "request" || stage === "response";

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <line
        x1={POS.browser.x}
        y1={POS.browser.y}
        x2={POS.dns.x}
        y2={POS.dns.y}
        stroke="currentColor"
        strokeWidth="0.25"
        strokeDasharray="1 1"
        className={cn(
          "transition-colors duration-300",
          activeDns ? "text-amber-400" : "text-foreground/15"
        )}
      />
      <line
        x1={POS.browser.x}
        y1={POS.browser.y}
        x2={POS.server.x}
        y2={POS.server.y}
        stroke="currentColor"
        strokeWidth="0.25"
        strokeDasharray="1 1"
        className={cn(
          "transition-colors duration-300",
          activeServer
            ? stage === "request"
              ? "text-indigo-400"
              : "text-emerald-400"
            : "text-foreground/15"
        )}
      />
    </svg>
  );
}
