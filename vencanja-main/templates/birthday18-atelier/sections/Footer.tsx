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
    <footer id={id} className="b18a-footer">
      <div className="b18a-shell b18a-signoff">
        <div className="b18a-stamp" aria-hidden="true">
          <span className="b18a-stamp__ring">
            <span>{subtitle.split(" · ")[0] || "ATELIER"}</span>
          </span>
          <span className="b18a-stamp__year">{year}</span>
        </div>
        <div className="b18a-signoff__text">
          <p className="b18a-signoff__signature">
            {data.title || "18. Rođendan"}
          </p>
          <p className="b18a-muted-label mt-2">{subtitle}</p>
          {data.description ? (
            <p className="mt-3 max-w-md text-sm">{data.description}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
