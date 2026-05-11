"use client";

import { create } from "zustand";

export type Stage =
  | "idle"
  | "dns-query"
  | "dns-response"
  | "request"
  | "processing"
  | "response"
  | "rendering"
  | "done";

export const STAGE_ORDER: Stage[] = [
  "idle",
  "dns-query",
  "dns-response",
  "request",
  "processing",
  "response",
  "rendering",
  "done",
];

export const STAGE_DURATION_MS: Record<Stage, number> = {
  idle: 0,
  "dns-query": 1400,
  "dns-response": 1400,
  request: 1400,
  processing: 1000,
  response: 1400,
  rendering: 900,
  done: 0,
};

export const STAGE_CAPTIONS: Record<Stage, { title: string; detail: string }> = {
  idle: {
    title: "Ready",
    detail: "Press Play to send a request to google.com.",
  },
  "dns-query": {
    title: "1. Looking up the address",
    detail: 'The browser asks DNS: "What\'s the IP address of google.com?"',
  },
  "dns-response": {
    title: "2. Got the address",
    detail: "DNS replies with the server's IP, e.g. 142.250.190.78.",
  },
  request: {
    title: "3. Sending the request",
    detail: "The browser sends an HTTP request (GET /) to that IP.",
  },
  processing: {
    title: "4. Server is working",
    detail: "The server reads the request and prepares a response.",
  },
  response: {
    title: "5. Response coming back",
    detail: "The server sends the HTML back with a 200 OK status.",
  },
  rendering: {
    title: "6. Page appears",
    detail: "The browser receives the HTML and draws the page.",
  },
  done: {
    title: "Done!",
    detail: "One request and one response. That's the whole internet, really.",
  },
};

type JourneyState = {
  stage: Stage;
  isPlaying: boolean;
  speed: number;
};

type JourneyActions = {
  play: () => void;
  pause: () => void;
  reset: () => void;
  step: () => void;
  advance: () => void;
  setSpeed: (s: number) => void;
};

export const useJourney = create<JourneyState & JourneyActions>((set, get) => ({
  stage: "idle",
  isPlaying: false,
  speed: 1,
  play: () => {
    const { stage } = get();
    if (stage === "idle" || stage === "done") {
      set({ stage: "dns-query", isPlaying: true });
    } else {
      set({ isPlaying: true });
    }
  },
  pause: () => set({ isPlaying: false }),
  reset: () => set({ stage: "idle", isPlaying: false }),
  step: () => {
    const { stage } = get();
    set({ isPlaying: false });
    if (stage === "idle") {
      set({ stage: "dns-query" });
      return;
    }
    get().advance();
  },
  advance: () => {
    const { stage } = get();
    const i = STAGE_ORDER.indexOf(stage);
    if (i < 0 || i === STAGE_ORDER.length - 1) {
      set({ isPlaying: false });
      return;
    }
    const next = STAGE_ORDER[i + 1];
    set({ stage: next });
    if (next === "done") set({ isPlaying: false });
  },
  setSpeed: (s) => set({ speed: s }),
}));
