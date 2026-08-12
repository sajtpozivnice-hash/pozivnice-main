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
      <div className="ed-shell ed-colophon">
        <div className="ed-colophon__col">
          <p className="ed-colophon__label">Izdanje</p>
          <p className="ed-colophon__value">
            {data.title || "ROĐENDANSKO IZDANJE"}
          </p>
        </div>
        <div className="ed-colophon__col">
          <p className="ed-colophon__label">Godište</p>
          <p className="ed-colophon__value">{subtitle}</p>
        </div>
        <div className="ed-colophon__col">
          <p className="ed-colophon__label">Napomena</p>
          <p className="ed-colophon__value ed-colophon__value--small">
            {data.description || "Štampano povodom punoletstva."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
