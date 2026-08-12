"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { LocationsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: LocationsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Locations: FC<Props> = ({ section, theme }) => {
  const { data, id, name } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#5EEAD4";
  const card = data.cards?.[0];
  const image = card?.image || data.imageUrl;

  return (
    <section id={id} className="kspc-section">
      <div className="kspc-shell">
        <div className="mb-10 text-center">
          <p className="kspc-eyebrow mx-auto mb-4 justify-center">{name}</p>
          <h2 className="kspc-heading">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-3 text-white/55">{data.subtitle}</p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kspc-telemetry"
        >
          <div className="kspc-coord-panel">
            <span className="kspc-coord-label">Koordinate misije</span>
            <p className="kspc-coord-value">{card?.title || "—"}</p>
            {card?.subtitle ? (
              <p className="kspc-coord-sub">{card.subtitle}</p>
            ) : null}
            {image ? (
              <div className="kspc-coord-thumb">
                <img src={image} alt="" referrerPolicy="no-referrer" />
              </div>
            ) : null}
          </div>

          <dl className="kspc-telemetry-list">
            {card?.location ? (
              <div className="kspc-telemetry-row">
                <dt>
                  <MapPin className="h-3.5 w-3.5" style={{ color: accent }} />
                  Lokacija
                </dt>
                <dd>{card.location}</dd>
              </div>
            ) : null}
            {card?.time ? (
              <div className="kspc-telemetry-row">
                <dt>Vreme</dt>
                <dd>{card.time}</dd>
              </div>
            ) : null}
            {card?.text || data.description ? (
              <div className="kspc-telemetry-row kspc-telemetry-row--wide">
                <dt>Napomena</dt>
                <dd>{card?.text || data.description}</dd>
              </div>
            ) : null}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Locations;
