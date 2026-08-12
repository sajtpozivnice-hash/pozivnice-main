"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Footprints } from "lucide-react";
import { InviteTextSection } from "@/types/sections";
import { EventConfig, ThemeConfig } from "@/types/config";

type Props = {
  section: InviteTextSection;
  event: EventConfig;
  theme: ThemeConfig;
};

const InviteText: FC<Props> = ({ section }) => {
  const { data, id, name } = section;

  return (
    <section id={id} className="ksaf-section">
      <div className="ksaf-shell">
        <div className="ksaf-rail">
          <div className="ksaf-rail-item items-start">
            <span className="ksaf-waypoint">
              <Footprints className="h-4 w-4" />
            </span>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="ksaf-card-strong grid w-full gap-0 overflow-hidden sm:grid-cols-[0.85fr_1.15fr]"
            >
              {data.imageUrl ? (
                <div className="relative min-h-[220px] sm:min-h-[280px]">
                  <img
                    src={data.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="ksaf-eyebrow mb-5">{name}</p>
                <p
                  className="text-xl leading-relaxed text-ksaf-ink/85 sm:text-2xl"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {data.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteText;
