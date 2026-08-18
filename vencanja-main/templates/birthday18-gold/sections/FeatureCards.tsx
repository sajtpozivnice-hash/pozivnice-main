"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { FeatureCardsSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";
import { resolveFeatureIcon } from "../iconMap";

type Props = {
  section: FeatureCardsSection;
  event: EventConfig;
  theme: ThemeConfig;
};

/** Gala foyer dress code: cloakroom-ticket stub with a perforated divider, not the bright dress-panel split. */
const FeatureCards: FC<Props> = ({ section, theme }) => {
  const { data, id } = section;
  const card = data.cards?.[0];
  const Icon = resolveFeatureIcon(card?.icon);
  const accent =
    card?.accent ||
    theme.colors?.base?.primary?.value ||
    "var(--gala-gold)";

  return (
    <section id={id} className="gala-section gala-dress overflow-hidden">
      <div className="gala-shell relative z-10">
        <div className="mb-10 text-center">
          <p className="gala-kicker mb-3">{data.subtitle || "Kodeks odevanja"}</p>
          <h2 className="gala-display text-4xl sm:text-5xl">{data.title}</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gala-ticket mx-auto max-w-2xl"
        >
          <div className="gala-ticket__stub">
            <div
              className="gala-ticket__icon"
              style={{ color: accent, borderColor: accent }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="gala-ticket__vertical">Dress code</span>
          </div>
          <div className="gala-ticket__perf" aria-hidden />
          <div className="gala-ticket__body">
            {card?.image ? (
              <div className="mb-5 overflow-hidden border border-[var(--gala-gold)]/35">
                <img
                  src={card.image}
                  alt=""
                  className="aspect-[16/9] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}
            <h3
              className="gala-display text-2xl sm:text-3xl"
              style={{ color: accent }}
            >
              {card?.title || data.subtitle || "ŠARENO"}
            </h3>
            <p className="mt-3 text-[var(--gala-muted)]">
              {card?.description || data.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
