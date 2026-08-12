"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { FooterSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: FooterSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const Footer: FC<Props> = ({ section, event, theme }) => {
  const { data, id } = section;
  const accent = theme.colors?.base?.primary?.value ?? "#C1801F";

  return (
    <section id={id} className="ksaf-section pb-10 pt-6">
      <div className="ksaf-shell max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ksaf-boarding"
        >
          <div className="ksaf-boarding-main">
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1]"
                referrerPolicy="no-referrer"
              />
            ) : null}

            <div className="relative z-10">
              <h2 className="ksaf-heading text-3xl sm:text-4xl">{data.title}</h2>
              {data.subtitle ? (
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-ksaf-ink/50">
                  {data.subtitle}
                </p>
              ) : null}
              {data.description ? (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ksaf-ink/60">
                  {data.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="ksaf-boarding-stub">
            <Plane className="h-6 w-6" style={{ color: accent }} />
            <p className="ksaf-coordinates">Putnik</p>
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-primary)", color: "var(--color-ksaf-teal)" }}
            >
              {event.names}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
