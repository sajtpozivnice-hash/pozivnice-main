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
    <footer id={id} className="b18i-footer">
      <div className="b18i-shell">
        <div className="b18i-masthead-close">
          <div className="b18i-masthead-close__rule b18i-masthead-close__rule--thick" />
          <div className="b18i-masthead-close__row">
            <span className="b18i-masthead-close__meta">Br. 18</span>
            <p className="b18i-masthead-close__title">
              {data.title || "18. izdanje"}
            </p>
            <span className="b18i-masthead-close__meta">{year}</span>
          </div>
          <div className="b18i-masthead-close__rule" />
          <p className="b18i-masthead-close__sub">{subtitle}</p>
          {data.description ? (
            <p className="b18i-masthead-close__desc">{data.description}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
