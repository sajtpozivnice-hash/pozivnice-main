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
    <footer id={id} className="relative border-t border-white/10 py-12">
      <div className="b18-shell">
        <div className="b18-footer__row">
          <div className="b18-footer__lockup">
            <p
              className="b18-metal text-xl font-bold tracking-tight uppercase sm:text-2xl"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {data.title || "18. ROĐENDAN"}
            </p>
            <p className="b18-footer__sub">{subtitle}</p>
          </div>
          {data.description ? (
            <p className="b18-footer__note">{data.description}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
