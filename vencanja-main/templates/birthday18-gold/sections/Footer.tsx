"use client";

import { FC, useMemo } from "react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Gala programme back cover: rule + credit columns, not the bright gradient 3-line stack. */
const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const year = useMemo(() => {
    const match = /^(\d{4})/.exec(event.date || "");
    return match?.[1] || String(new Date().getFullYear());
  }, [event.date]);

  const subtitle =
    data.subtitle || `${(event.names || "").toUpperCase()} · ${year}`;

  return (
    <footer id={id} className="gala-section gala-programme">
      <div className="gala-shell">
        <div className="gala-curtain__rule mx-auto mb-8" />
        <div className="gala-programme__cols">
          <div className="gala-programme__col">
            <p className="gala-loc-col__label">Naslov</p>
            <p className="gala-programme__value">
              {data.title || "18. ROĐENDAN"}
            </p>
          </div>
          <div className="gala-programme__col">
            <p className="gala-loc-col__label">Slavljenik</p>
            <p className="gala-programme__value">{subtitle}</p>
          </div>
          {data.description ? (
            <div className="gala-programme__col">
              <p className="gala-loc-col__label">Poruka</p>
              <p className="gala-programme__note">{data.description}</p>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
