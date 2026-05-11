import type { ReactNode } from "react";

export type GlossaryEntry = {
  name: string;
  label: string;
  short: string;
  body: ReactNode;
  related?: string[];
};

export type GlossaryRegistry = Record<string, GlossaryEntry>;
