"use client";

import { create } from "zustand";

export type CafeId = "solo" | "crew" | "speedy";
export type AccentKey = "amber" | "primary" | "accent";

export type Customer = {
  id: number;
  arrivedAt: number;
  servedAt?: number;
  doneAt?: number;
  baristaIdx?: number;
};

export type CafeConfig = {
  id: CafeId;
  label: string;
  tagline: string;
  baristas: number;
  prepMs: number;
  accent: AccentKey;
};

export type CafeRuntime = {
  config: CafeConfig;
  customers: Customer[];
  nextId: number;
  servedCount: number;
  totalWaitMs: number;
  recentServed: number[];
};

export const ARRIVAL_INTERVAL_MS = 1000;
const EXIT_DELAY_MS = 600;
const THROUGHPUT_WINDOW_MS = 10_000;

const CONFIGS: Record<CafeId, CafeConfig> = {
  solo: {
    id: "solo",
    label: "Cafe Solo",
    tagline: "1 barista · 3.0s per drink",
    baristas: 1,
    prepMs: 3000,
    accent: "amber",
  },
  crew: {
    id: "crew",
    label: "Cafe Crew",
    tagline: "4 baristas · 3.0s per drink",
    baristas: 4,
    prepMs: 3000,
    accent: "primary",
  },
  speedy: {
    id: "speedy",
    label: "Cafe Speedy",
    tagline: "1 barista · 0.75s per drink",
    baristas: 1,
    prepMs: 750,
    accent: "accent",
  },
};

export const CAFE_ORDER: CafeId[] = ["solo", "crew", "speedy"];

function freshCafe(id: CafeId): CafeRuntime {
  return {
    config: CONFIGS[id],
    customers: [],
    nextId: 1,
    servedCount: 0,
    totalWaitMs: 0,
    recentServed: [],
  };
}

function freshAllCafes(): Record<CafeId, CafeRuntime> {
  return {
    solo: freshCafe("solo"),
    crew: freshCafe("crew"),
    speedy: freshCafe("speedy"),
  };
}

type State = {
  demoMs: number;
  isPlaying: boolean;
  speed: number;
  lastArrivalAt: number;
  cafes: Record<CafeId, CafeRuntime>;
};

type Actions = {
  tick: (dtMs: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (s: number) => void;
};

export const useCafe = create<State & Actions>((set, get) => ({
  demoMs: 0,
  isPlaying: false,
  speed: 1,
  lastArrivalAt: 0,
  cafes: freshAllCafes(),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () =>
    set({
      demoMs: 0,
      isPlaying: false,
      lastArrivalAt: 0,
      cafes: freshAllCafes(),
    }),
  setSpeed: (s) => set({ speed: s }),

  tick: (dtMs) => {
    const state = get();
    if (!state.isPlaying) return;

    const advanceMs = dtMs * state.speed;
    const nowMs = state.demoMs + advanceMs;

    let lastArrivalAt = state.lastArrivalAt;
    const arrivalsAt: number[] = [];
    while (nowMs - lastArrivalAt >= ARRIVAL_INTERVAL_MS) {
      lastArrivalAt += ARRIVAL_INTERVAL_MS;
      arrivalsAt.push(lastArrivalAt);
    }

    const next: Record<CafeId, CafeRuntime> = {
      solo: stepCafe(state.cafes.solo, arrivalsAt, nowMs),
      crew: stepCafe(state.cafes.crew, arrivalsAt, nowMs),
      speedy: stepCafe(state.cafes.speedy, arrivalsAt, nowMs),
    };

    set({ demoMs: nowMs, lastArrivalAt, cafes: next });
  },
}));

function stepCafe(
  cafe: CafeRuntime,
  arrivalsAt: number[],
  nowMs: number
): CafeRuntime {
  const { baristas, prepMs } = cafe.config;
  let customers = cafe.customers;
  let nextId = cafe.nextId;
  let servedCount = cafe.servedCount;
  let totalWaitMs = cafe.totalWaitMs;
  let recentServed = cafe.recentServed;

  if (arrivalsAt.length > 0) {
    const arrivals: Customer[] = arrivalsAt.map((t) => ({
      id: nextId++,
      arrivedAt: t,
    }));
    customers = customers.concat(arrivals);
  }

  if (customers.length > 0) {
    const finished: Customer[] = [];
    customers = customers.map((c) => {
      if (
        c.servedAt !== undefined &&
        c.doneAt === undefined &&
        c.servedAt + prepMs <= nowMs
      ) {
        const doneAt = c.servedAt + prepMs;
        const next = { ...c, doneAt };
        finished.push(next);
        return next;
      }
      return c;
    });
    if (finished.length > 0) {
      let added = recentServed;
      for (const c of finished) {
        servedCount += 1;
        totalWaitMs += c.doneAt! - c.arrivedAt;
        if (added === recentServed) added = recentServed.slice();
        added.push(c.doneAt!);
      }
      recentServed = added;
    }
  }

  if (customers.length > 0) {
    customers = customers.filter(
      (c) => c.doneAt === undefined || c.doneAt + EXIT_DELAY_MS > nowMs
    );
  }

  const busy = new Set<number>();
  for (const c of customers) {
    if (
      c.servedAt !== undefined &&
      c.doneAt === undefined &&
      c.baristaIdx !== undefined
    ) {
      busy.add(c.baristaIdx);
    }
  }
  if (busy.size < baristas) {
    const waiters = customers
      .filter((c) => c.servedAt === undefined)
      .sort((a, b) => a.arrivedAt - b.arrivedAt);
    if (waiters.length > 0) {
      const assignments = new Map<number, number>();
      for (const w of waiters) {
        if (busy.size >= baristas) break;
        let slot = -1;
        for (let i = 0; i < baristas; i++) {
          if (!busy.has(i)) {
            slot = i;
            break;
          }
        }
        if (slot === -1) break;
        busy.add(slot);
        assignments.set(w.id, slot);
      }
      if (assignments.size > 0) {
        customers = customers.map((c) =>
          assignments.has(c.id)
            ? { ...c, servedAt: nowMs, baristaIdx: assignments.get(c.id)! }
            : c
        );
      }
    }
  }

  if (
    recentServed.length > 0 &&
    recentServed[0] < nowMs - THROUGHPUT_WINDOW_MS
  ) {
    recentServed = recentServed.filter((t) => t > nowMs - THROUGHPUT_WINDOW_MS);
  }

  return {
    ...cafe,
    customers,
    nextId,
    servedCount,
    totalWaitMs,
    recentServed,
  };
}

export type CafeStats = {
  queueLen: number;
  inProgress: Customer[];
  avgLatencyMs: number | null;
  throughputPerSec: number;
  servedCount: number;
};

export function getCafeStats(cafe: CafeRuntime, nowMs: number): CafeStats {
  const queueCustomers = cafe.customers.filter(
    (c) => c.servedAt === undefined
  );
  const inProgress = cafe.customers.filter(
    (c) => c.servedAt !== undefined && c.doneAt === undefined
  );
  const avgLatencyMs =
    cafe.servedCount > 0 ? cafe.totalWaitMs / cafe.servedCount : null;
  const recentInWindow = cafe.recentServed.filter(
    (t) => t > nowMs - THROUGHPUT_WINDOW_MS
  );
  const windowSec = Math.max(0.001, Math.min(THROUGHPUT_WINDOW_MS, nowMs) / 1000);
  const throughputPerSec = recentInWindow.length / windowSec;
  return {
    queueLen: queueCustomers.length,
    inProgress,
    avgLatencyMs,
    throughputPerSec,
    servedCount: cafe.servedCount,
  };
}
