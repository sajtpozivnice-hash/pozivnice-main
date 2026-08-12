"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const ink = theme.colors?.base?.secondary?.value;

  return (
    <section id={id} className="ks-section bg-ks-ivory">
      <div className="ks-wash top-0 left-1/2 h-72 w-72 -translate-x-1/2 bg-ks-champagne-soft/25" />

      <div className="ks-container-narrow relative">
        {/* Side-by-side closing note — medallion beside the farewell text, not stacked/centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ks-footer-note"
        >
          <div className="ks-medallion shrink-0">
            {data.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.imageUrl} alt={event.names} />
            ) : (
              <Heart className="h-7 w-7" />
            )}
          </div>

          <div className="text-left">
            <p className="ks-script text-2xl sm:text-3xl">{event.names}</p>
            <h2
              className="mt-2 text-xl leading-snug sm:text-2xl"
              style={{ fontFamily: "var(--font-primary)", color: ink }}
            >
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-2 text-sm text-ks-muted">{data.description}</p>
            ) : null}
          </div>
        </motion.div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-ks-champagne">
          Sa ljubavlju
        </p>
      </div>
    </section>
  );
};

export default Footer;
