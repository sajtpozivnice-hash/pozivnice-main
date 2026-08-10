/**
 * Demo mode flag + in-memory session store.
 * Enabled only while /demo is mounted. Never persists.
 */

import type { DemoSnapshot } from "./types";

let enabled = false;
let snapshot: DemoSnapshot | null = null;
let working: DemoSnapshot | null = null;

export function isDemoProjectId(projectId?: string | null): boolean {
  return typeof projectId === "string" && projectId.startsWith("demo-");
}

/**
 * Demo backend is active when the demo session is enabled,
 * or when a demo-* id is used while the in-memory store still exists
 * (covers React Strict Mode remount races after cleanup sets enabled=false).
 */
export function isDemoMode(projectId?: string | null): boolean {
  if (!working) return false;
  if (enabled) return true;
  return isDemoProjectId(projectId);
}

export function enableDemoMode(initial: DemoSnapshot): void {
  enabled = true;
  snapshot = structuredClone(initial);
  working = structuredClone(initial);
}

/**
 * Soft-disable: keep the in-memory store so in-flight / remounted
 * provider refreshes with demo-* ids do not hit Supabase.
 * The next enableDemoMode() replaces the store.
 */
export function disableDemoMode(): void {
  enabled = false;
}

export function resetDemoMode(): DemoSnapshot {
  if (!snapshot) {
    throw new Error("Demo mode is not initialized");
  }
  working = structuredClone(snapshot);
  enabled = true;
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
