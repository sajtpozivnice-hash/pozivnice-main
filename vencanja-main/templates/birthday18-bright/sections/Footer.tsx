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
  const marqueeText = `${data.title || "18. ROĐENDAN"} · ${subtitle} · `;

  return (
    <footer id={id} className="b18b-footer">
      <div className="b18b-marquee" aria-hidden="true">
        <div className="b18b-marquee__track">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} className="b18b-marquee__item">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
      <div className="b18b-shell mt-6 text-center">
        {data.description ? (
          <p className="mx-auto max-w-md text-sm text-[var(--b18b-muted)]">
            {data.description}
          </p>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
