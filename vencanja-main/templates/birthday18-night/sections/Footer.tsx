"use client";

import { FC } from "react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section }) => {
  const { data, id } = section;

  return (
    <footer id={id} className="bn-footer">
      <div className="bn-shell">
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
