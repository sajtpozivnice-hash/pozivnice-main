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
    `${(event.names || "").toUpperCase()} · ${year}`;

  return (
    <footer id={id} className="relative border-t border-white/10 py-14">
      <div className="b18-shell text-center">
        <p
          className="b18-metal text-2xl font-bold tracking-[0.2em] uppercase sm:text-3xl"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          {data.title || "18. ROĐENDAN"}
        </p>
        <p className="mt-3 text-sm tracking-[0.18em] text-white/45 uppercase">
          {subtitle}
        </p>
        {data.description ? (
          <p className="mx-auto mt-4 max-w-md text-sm text-white/35">
            {data.description}
          </p>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
