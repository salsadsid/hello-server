"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type { ReactNode } from "react";
import { entries } from "@/lib/glossary/entries";
import { cn } from "@/lib/cn";

type TermProps = {
  name: string;
  children?: ReactNode;
};

export function Term({ name, children }: TermProps) {
  const entry = entries[name];

  if (!entry) {
    return (
      <span
        className="underline decoration-red-500 decoration-wavy"
        title={`Missing glossary entry: ${name}`}
      >
        {children ?? name}
      </span>
    );
  }

  return (
    <HoverCardPrimitive.Root openDelay={120} closeDelay={120}>
      <HoverCardPrimitive.Trigger asChild>
        <button type="button" className="term-link">
          {children ?? entry.label}
        </button>
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          sideOffset={6}
          collisionPadding={12}
          className={cn(
            "z-50 w-80 max-w-[calc(100vw-1.5rem)] rounded-xl border border-border bg-surface p-4 shadow-xl",
            "text-sm leading-relaxed text-foreground"
          )}
        >
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              term
            </span>
            <span className="font-semibold text-foreground">{entry.label}</span>
          </div>
          <p className="font-medium">{entry.short}</p>
          <div className="mt-2 text-[13px] text-foreground/75">{entry.body}</div>
          <HoverCardPrimitive.Arrow className="fill-[var(--surface)]" />
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
