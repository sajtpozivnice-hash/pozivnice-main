"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { CountdownSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: CountdownSection;
  event: EventConfig;
  theme: ThemeConfig;
};

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const EMPTY: Parts = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getParts(target: Date): Parts {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const Countdown: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const target = useMemo(() => new Date(event.date), [event.date]);
  // Start empty on SSR + first client paint to avoid Date.now() hydration mismatch
  const [parts, setParts] = useState<Parts>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setParts(getParts(target));
    setReady(true);
    const timer = window.setInterval(() => setParts(getParts(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const cells = [
    { label: "Dani", value: pad(parts.days) },
    { label: "Sati", value: pad(parts.hours) },
    { label: "Min", value: pad(parts.minutes) },
    { label: "Sek", value: pad(parts.seconds) },
  ];

  return (
    <section id={id} className="bn-section overflow-hidden">
      <div className="bn-shell relative z-10 text-center">
        <p className="bn-label mb-4">{data.description || "ODBROJAVANJE"}</p>
        <h2 className="bn-display text-3xl sm:text-4xl lg:text-5xl">
          {data.title || "DO POČETKA NOĆI"}
        </h2>

        <div
          className="bn-count bn-mono"
          aria-live="polite"
          aria-busy={!ready}
        >
          {cells.map((cell, index) => (
            <div key={cell.label} className="contents">
              {index > 0 ? <span className="bn-count__sep">:</span> : null}
              <div className="bn-count__cell">
                <span className="bn-count__num">{cell.value}</span>
                <span className="bn-count__label">{cell.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
