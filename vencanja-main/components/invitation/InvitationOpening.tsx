"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { UniversalProjectConfig } from "@/types/config";
import { resolveEventType, type EventType } from "@/helpers/eventType";
import styles from "./InvitationOpening.module.css";

type Props = {
  config: UniversalProjectConfig;
  /** When false, children render immediately. */
  enabled?: boolean;
  children: ReactNode;
};

type Phase = "closed" | "opening" | "done";

const OPEN_MS = 1400;

function preferReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function splitDisplayNames(names: string): string[] {
  const parts = names
    .split(/\s*(?:&|\/|\+| i )\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) return parts.slice(0, 2);
  return [names.trim()].filter(Boolean);
}

/** Prefer event.names; strip catalog suffixes like "Una — moderno krštenje". */
function resolveOpeningNames(config: UniversalProjectConfig): string {
  const fromEvent = config.event?.names?.trim();
  if (fromEvent) return fromEvent;

  const fromMeta = config.meta?.title?.trim();
  if (!fromMeta) return "";
  return fromMeta.split(/\s+[—–-]\s+/)[0]?.trim() || fromMeta;
}

function resolveAgeMark(config: UniversalProjectConfig): string | null {
  const hero = config.sections.find((section) => section.type === "hero");
  if (!hero || hero.type !== "hero") return null;
  const badge = hero.data.badge?.trim();
  const title = hero.data.title?.trim();
  if (badge && /^\d{1,2}$/.test(badge)) return badge;
  if (title && /^\d{1,2}$/.test(title)) return title;
  return null;
}

function toneForEvent(eventType: EventType): string {
  switch (eventType) {
    case "comingOfAge":
      return "bold";
    case "kidsBirthday":
      return "soft";
    case "baptism":
      return "soft";
    case "wedding":
    default:
      return "refined";
  }
}

function eyebrowForEvent(eventType: EventType): string {
  switch (eventType) {
    case "comingOfAge":
      return "Punoletstvo";
    case "kidsBirthday":
      return "Rođendan";
    case "baptism":
      return "Krštenje";
    case "wedding":
    default:
      return "Venčanje";
  }
}

function parseHexColor(value?: string): [number, number, number] | null {
  if (!value) return null;
  const hex = value.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Relative luminance 0–1 (sRGB). */
function relativeLuminance(hex?: string): number {
  const rgb = parseHexColor(hex);
  if (!rgb) return 0.5;
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = rgb.map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a?: string, b?: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Opening envelope must stay readable on every template.
 * Theme `secondary` is often light (navy ivory) — never use it as ink on a light paper.
 */
function resolveOpeningPalette(config: UniversalProjectConfig) {
  const normalize = (value: string) => value.trim().toLowerCase();
  const primary = normalize(
    config.theme.colors?.base?.primary?.value || "#C4A574",
  );
  const secondary = normalize(
    config.theme.colors?.base?.secondary?.value || "#1A1816",
  );
  const background = normalize(
    config.theme.colors?.background?.value || "#F7F3EE",
  );

  const FALLBACK_PAPER = "#f4f0ea";
  const FALLBACK_INK = "#1a1816";

  const paperCandidates = [background, secondary, FALLBACK_PAPER];
  const paper =
    paperCandidates.find((c) => relativeLuminance(c) >= 0.72) ?? FALLBACK_PAPER;

  const inkCandidates = [secondary, background, FALLBACK_INK];
  let ink =
    inkCandidates.find((c) => contrastRatio(c, paper) >= 4.5) ?? FALLBACK_INK;

  if (contrastRatio(ink, paper) < 4.5) {
    ink = FALLBACK_INK;
  }

  const accent =
    contrastRatio(primary, paper) >= 2.2 ? primary : FALLBACK_INK;

  return { paper, ink, accent };
}

export function InvitationOpening({
  config,
  enabled = true,
  children,
}: Props) {
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>(enabled ? "closed" : "done");
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isBlocking = phase === "closed" || phase === "opening";
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // `inert` can serialize differently during SSR vs client — apply after hydrate.
  const inertProps =
    isBlocking && hydrated ? ({ inert: true } as const) : {};

  const eventType = resolveEventType(config);
  const tone = toneForEvent(eventType);
  const names = resolveOpeningNames(config);
  const nameParts = useMemo(
    () => splitDisplayNames(names || "Pozivnica"),
    [names],
  );
  const ageMark =
    eventType === "comingOfAge" ? resolveAgeMark(config) || "18" : null;
  const palette = useMemo(() => resolveOpeningPalette(config), [
    config.theme.colors?.base?.primary?.value,
    config.theme.colors?.base?.secondary?.value,
    config.theme.colors?.background?.value,
  ]);

  useEffect(() => {
    if (!enabled) {
      setPhase("done");
      return;
    }
    setPhase("closed");
  }, [enabled, config.template]);

  useEffect(() => {
    if (!isBlocking) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyTouchAction = body.style.touchAction;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.touchAction = "none";

    const scrollParents: Array<{ el: HTMLElement; overflow: string }> = [];
    let node = rootRef.current?.parentElement ?? null;
    while (node && node !== body && node !== html) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      if (
        overflowY === "auto" ||
        overflowY === "scroll" ||
        overflowY === "overlay" ||
        style.overflow === "auto" ||
        style.overflow === "scroll"
      ) {
        scrollParents.push({ el: node, overflow: node.style.overflow });
        node.style.overflow = "hidden";
      }
      node = node.parentElement;
    }

    const preventWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", preventWheel, { passive: false });

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.touchAction = prevBodyTouchAction;

      for (const parent of scrollParents) {
        parent.el.style.overflow = parent.overflow;
      }

      window.removeEventListener("wheel", preventWheel);
      window.scrollTo(0, scrollY);
    };
  }, [isBlocking]);

  useEffect(() => {
    return () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    };
  }, []);

  const openInvitation = useCallback(() => {
    if (phase !== "closed") return;

    if (preferReducedMotion()) {
      setPhase("done");
      return;
    }

    setPhase("opening");
    unlockTimer.current = setTimeout(() => {
      setPhase("done");
    }, OPEN_MS);
  }, [phase]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInvitation();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${isBlocking ? styles.rootLocked : ""}`}
    >
      <div
        className={`${styles.content} ${
          phase === "opening" ? styles.contentReveal : ""
        } ${phase === "closed" ? styles.contentHidden : ""}`}
        aria-hidden={isBlocking || undefined}
        suppressHydrationWarning
        {...inertProps}
      >
        {children}
      </div>

      {isBlocking ? (
        <div
          className={`${styles.overlay} ${
            phase === "opening" ? styles.isOpening : ""
          }`}
          data-tone={tone}
          data-phase={phase}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          suppressHydrationWarning
          style={
            {
              ["--io-paper" as string]: palette.paper,
              ["--io-ink" as string]: palette.ink,
              ["--io-accent" as string]: palette.accent,
            } as CSSProperties
          }
        >
          <div className={styles.atmosphere} aria-hidden />
          <div className={`${styles.panel} ${styles.panelLeft}`} aria-hidden />
          <div className={`${styles.panel} ${styles.panelRight}`} aria-hidden />
          <div className={styles.veil} aria-hidden />

          <button
            type="button"
            className={styles.trigger}
            onClick={openInvitation}
            onKeyDown={onKeyDown}
            aria-label="Otvorite pozivnicu"
            disabled={phase === "opening"}
          >
            <span className={styles.eyebrow}>{eyebrowForEvent(eventType)}</span>

            {ageMark ? (
              <span className={styles.ageMark} aria-hidden>
                {ageMark}
              </span>
            ) : null}

            <span id={titleId} className={styles.display}>
              {nameParts.length >= 2 ? (
                <>
                  <span
                    className={styles.displayLine}
                    style={{ ["--io-delay" as string]: "80ms" }}
                  >
                    {nameParts[0]}
                  </span>
                  <span
                    className={styles.displayAmp}
                    aria-hidden
                    style={{ ["--io-delay" as string]: "160ms" }}
                  >
                    &
                  </span>
                  <span
                    className={styles.displayLine}
                    style={{ ["--io-delay" as string]: "240ms" }}
                  >
                    {nameParts[1]}
                  </span>
                </>
              ) : (
                <span
                  className={styles.displayLine}
                  style={{ ["--io-delay" as string]: "80ms" }}
                >
                  {nameParts[0] || "Pozivnica"}
                </span>
              )}
            </span>

            <span className={styles.rule} aria-hidden />

            <span className={styles.cta}>
              <span className={styles.ctaLabel}>Otvorite pozivnicu</span>
              <span className={styles.ctaHint} aria-hidden>
                <span className={styles.ctaLine} />
                <span className={styles.ctaArrow} />
              </span>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
