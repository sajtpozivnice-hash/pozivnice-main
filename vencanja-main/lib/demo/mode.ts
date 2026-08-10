/**
 * Demo mode flag + in-memory session store.
 * Enabled only while /demo is mounted. Never persists.
 */

import type { DemoSnapshot } from "./types";

let enabled = false;
let snapshot: DemoSnapshot | null = null;
let working: DemoSnapshot | null = null;

export function isDemoMode(): boolean {
  return enabled && working !== null;
}

export function enableDemoMode(initial: DemoSnapshot): void {
  enabled = true;
  snapshot = structuredClone(initial);
  working = structuredClone(initial);
}

export function disableDemoMode(): void {
  enabled = false;
  snapshot = null;
  working = null;
}

export function resetDemoMode(): DemoSnapshot {
  if (!snapshot) {
    throw new Error("Demo mode is not initialized");
  }
  working = structuredClone(snapshot);
  return structuredClone(working);
}

export function getDemoStore(): DemoSnapshot {
  if (!working) {
    throw new Error("Demo store is not available");
  }
  return working;
}

export function replaceDemoStore(next: DemoSnapshot): void {
  working = next;
}
