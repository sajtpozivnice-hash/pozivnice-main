"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const BARS = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1];

const Footer: FC<Props> = ({ section, event }) => {
  const { data, id } = section;

  return (
    <section id={id} className="kcan-section pb-10 pt-6">
      <div className="kcan-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kcan-receipt"
        >
          {data.imageUrl ? (
            <div className="kcan-receipt-thumb">
              <img src={data.imageUrl} alt="" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <Sparkles className="mx-auto mb-4 h-7 w-7" style={{ color: "var(--color-kcan-pink)" }} />
          )}

          <h2 className="kcan-heading text-4xl sm:text-5xl">{data.title}</h2>
          {data.subtitle ? (
            <p className="mt-3 text-sm font-semibold text-kcan-ink/60">
              {data.subtitle}
            </p>
          ) : null}
          {data.description ? (
            <p className="mx-auto mt-4 max-w-sm text-sm text-kcan-ink/55">
              {data.description}
            </p>
          ) : null}

          <div className="kcan-receipt-barcode" aria-hidden="true">
            {BARS.map((weight, index) => (
              <span key={index} style={{ width: `${weight}px` }} />
            ))}
          </div>
          <p className="kcan-receipt-code">{event.names}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
