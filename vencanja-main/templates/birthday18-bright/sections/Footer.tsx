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
    data.subtitle || `${(event.names || "").toUpperCase()} · ${year}`;

  return (
    <footer id={id} className="b18b-footer">
      <div className="b18b-shell">
        <p
          className="text-2xl font-extrabold tracking-[0.18em] uppercase sm:text-3xl"
          style={{
            fontFamily: "var(--font-primary)",
            background:
              "linear-gradient(135deg, var(--b18b-coral), var(--b18b-lilac))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {data.title || "18. ROĐENDAN"}
        </p>
        <p className="mt-3 text-sm font-semibold tracking-[0.16em] text-[var(--b18b-muted)] uppercase">
          {subtitle}
        </p>
        {data.description ? (
          <p className="mx-auto mt-4 max-w-md text-sm text-[var(--b18b-muted)]">
            {data.description}
          </p>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
