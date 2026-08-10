"use client";

import { FC, useMemo } from "react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const year = useMemo(() => {
    const match = /^(\d{4})/.exec(event.date || "");
    return match?.[1] || String(new Date().getFullYear());
  }, [event.date]);

  const subtitle =
    data.subtitle ||
    `${(event.names || "").toUpperCase()} · VOL. 18 · ${year}`;

  return (
    <footer id={id} className="ed-footer">
      <div className="ed-shell">
        <p className="ed-display text-2xl tracking-[0.12em] sm:text-3xl">
          {data.title || "ROĐENDANSKO IZDANJE"}
        </p>
        <p className="ed-label mt-3">{subtitle}</p>
        {data.description ? (
          <p className="mx-auto mt-4 max-w-md text-sm text-[var(--ed-muted)]">
            {data.description}
          </p>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
