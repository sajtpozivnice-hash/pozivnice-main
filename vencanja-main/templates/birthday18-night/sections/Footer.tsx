"use client";

import { FC, useMemo } from "react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Full-bleed endcard: huge year bleeding off the frame behind the closing line, not a centered text stack. */
const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const year = useMemo(() => {
    const match = /^(\d{4})/.exec(event.date || "");
    return match?.[1] || String(new Date().getFullYear());
  }, [event.date]);

  return (
    <footer id={id} className="bn-footer">
      <span className="bn-footer__year" aria-hidden="true">
        {year}
      </span>
      <div className="bn-shell bn-footer__content">
        <p className="bn-display text-2xl sm:text-3xl">{data.title}</p>
        {data.subtitle ? (
          <p className="mt-3 text-xs font-bold tracking-[0.32em] uppercase text-[color:var(--bn-muted)]">
            {data.subtitle}
          </p>
        ) : null}
        {data.description ? (
          <p className="mt-3 text-sm text-[color:var(--bn-muted)]">
            {data.description}
          </p>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
