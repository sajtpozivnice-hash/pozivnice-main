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
    <footer id={id} className="b18c-footer">
      <div className="b18c-shell">
        <div className="b18c-footer__rule" />
        <div className="b18c-footer__row">
          <p className="b18c-display text-2xl">
            {data.title || "18. rođendan"}
          </p>
          <div className="b18c-footer__meta">
            <p className="text-sm font-semibold tracking-[0.14em] uppercase">
              {subtitle}
            </p>
            {data.description ? (
              <p className="mt-1 max-w-xs text-sm">{data.description}</p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
