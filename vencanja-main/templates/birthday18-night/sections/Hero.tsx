"use client";

import { FC, useMemo } from "react";
import { HeroSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { formatDate } from "@/helpers/formatDate";

type Props = {
  section: HeroSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Hero: FC<Props> = ({ section, event }) => {
  const { data, id } = section;
  const age = (data.title || data.badge || "18").replace(/^VOL\.\s*/i, "").trim() || "18";
  const name = (event.names || "Marko").trim().toUpperCase();
  const tagline = (data.subtitle || "NOĆ\nPOČINJE SADA").trim();
  const edition = (data.description || "ROĐENDANSKO IZDANJE").trim();
  const badge = (data.badge || "VOL. 18").trim();
  const photo = data.backgroundImage || data.image;

  const dateLabel = useMemo(() => {
    const formatted = formatDate(event.date, "DD_DOT_MM_DOT_YYYY");
    return formatted || event.date;
  }, [event.date]);

  const city =
    event.location?.address || event.location?.name || "BEOGRAD";

  const birthYear = useMemo(() => {
    const match = /^(\d{4})/.exec(event.date || "");
    const eventYear = match ? Number(match[1]) : 2026;
    return String(eventYear - 18);
  }, [event.date]);

  return (
    <section id={id} className="bn-hero">
      <div className="bn-grain" aria-hidden />
      <div className="bn-hero__media" aria-hidden={!photo}>
        {photo ? (
          <img src={photo} alt="" referrerPolicy="no-referrer" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 40% 30%, color-mix(in srgb, var(--bn-accent) 22%, transparent), transparent 55%), var(--bn-surface)`,
            }}
          />
        )}
      </div>

      <div className="bn-hero__content">
        <div className="bn-hero__badge-row">
          <span className="bn-chip bn-chip--accent">{badge}</span>
          <span className="bn-chip">{edition}</span>
          <span className="bn-chip">OD {birthYear}</span>
        </div>

        <p className="bn-hero__age" aria-hidden>
          {age}
        </p>
        <h1 className="bn-hero__name">{name}</h1>
        <p className="bn-hero__tagline">{tagline}</p>

        <div className="bn-hero__meta">
          <div className="bn-hero__meta-item">
            <p className="bn-label">Datum</p>
            <p className="bn-hero__meta-val">{dateLabel}</p>
          </div>
          <div className="bn-hero__meta-item">
            <p className="bn-label">Vreme</p>
            <p className="bn-hero__meta-val">20:00</p>
          </div>
          <div className="bn-hero__meta-item">
            <p className="bn-label">Grad</p>
            <p className="bn-hero__meta-val">{city}</p>
          </div>
        </div>

        {data.ctaText ? (
          <div className="mt-8">
            <a href={data.ctaHref || "#rsvp"} className="bn-btn">
              {data.ctaText}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
